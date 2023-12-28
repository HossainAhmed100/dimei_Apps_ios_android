import React, { useCallback, useContext, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Image, Alert } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import { Divider } from '@rneui/themed';
import * as FileSystem from 'expo-file-system';
import { storage } from '../../FirebaseConfig';
import { COLORS, SIZES } from '../../constants';
import { useQuery } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from "react-hook-form";
import AwesomeAlert from 'react-native-awesome-alerts';
import { AuthContext } from '../../context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import SignatureScreen from "react-native-signature-canvas";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { MaterialIcons, AntDesign, Entypo  } from '@expo/vector-icons';
import { OwnerTransferInvoice } from '../../components/PDFCode/OwnerTransferInvoice';
import * as Print from 'expo-print';


const VerifyDeviceAcceft = ({navigation, route})  => {
  const signatureRef = useRef();
  const firstTimeRef = useRef(true);
  const { user } = useContext(AuthContext);
  const todyDate = new Date().toISOString();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptStatus, setAcceptStatus] = useState("");
  const [firebaseIamge, setFirebaseIamge] = useState([]);
  const transferDeviceId = route.params.transferDeviceId;
  const [selectedImages, setSelectedImages] = useState([]);
  const [signatureSign, setSignatureSign] = useState(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [zeroTokenAlert, setZeroTokenAlert] = useState(false);
  const [pdfuploadCompleted, isPdfUploadCompleted] = useState(false);
  const [accepetDevcieProcesing, isAccepetDevcieProcesing] = useState(false);
  const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {deviceSecrentCode: "", transferDate: format(new Date(todyDate), 'yyyy-MM-dd')}})
  const handleDragEvent = () => {setScrollEnabled(false)};
  const handleEndDragEvent = () => {setScrollEnabled(true)};
  const showAlert = () => {setZeroTokenAlert(true)};
  const hideAlert = () => {setZeroTokenAlert(false)};
  const toggleCheckbox = () => {setChecked(!checked)};

  const { data: itemQuantity = [], refetch } = useQuery({ 
    queryKey: ['itemQuantity', user?.userEmail], 
    queryFn: async () => {
    const res = await axios.get(`http://192.168.0.154:5000/useritemQuantity/${user?.userEmail}`);
    return res.data;
    } 
  })

  const { isLoading, data: acceptDevice = [], refetch: refetchAcceptDevice } = useQuery({ 
    queryKey: ['acceptDevice', transferDeviceId], 
    queryFn: async () => {
    const res = await axios.get(`http://192.168.0.154:5000/getTransferDeviceDetails/${transferDeviceId}`);
    return res.data;
    } 
  })

  const {data: reciverOwnerData = [], refetchReciverOwnerData } = useQuery({ 
    queryKey: ['reciverOwnerData', user?.userEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.154:5000/getUserNidInfo/${user?.userEmail}`);
      return res.data;
    } 
  })

  const {data: deviceOwnerData = [], refetchDeviceOwner } = useQuery({ 
    queryKey: ['deviceOwnerData', acceptDevice?.ownerEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.154:5000/getUserNidInfo/${acceptDevice?.ownerEmail}`);
      return res.data;
    } 
  })

  
  const onSubmit = async (data) => {
    setLoading(true)
    const secretCode = data.deviceSecrentCode;
    const secretCodetCheckInfo = {secretCode, transferDeviceId};
    try{
      const response = await axios.put(`http://192.168.0.154:5000/verifydevicesecretCode/`, {secretCodetCheckInfo})
      if(response.data.secretCodeStatus){
        setLoading(true)
        const uploadPromises = selectedImages.map(async (uri) => {
          return await uploadImageAsync(uri);
        });
        const newFirebaseImages = await Promise.all(uploadPromises);
        const deviceImgList = [...newFirebaseImages];
        const deviceIamges = [{deviceImgList, ownerEmail: user?.userEmail}];
        setFirebaseIamge(deviceIamges);
        await signatureRef.current.readSignature();
      }else if(response.data.secretCodeStatus){
        setLoading(false)
        alert("Secret Code is wrong!")
        setAcceptStatus("Secret Code is wrong!")
        isAccepetDevcieProcesing(false)
      }
    }
    catch (error) {
      console.log("Status Faild During Secret Code Check", error);
      isAccepetDevcieProcesing(false)
    }
    finally{
      setLoading(false)
      isAccepetDevcieProcesing(false)
    }
  } 
  
  const handleOK = (signature) => {
    isAccepetDevcieProcesing(true);
    setSignatureSign(signature); 
    if(signature){
    const path = FileSystem.cacheDirectory + "sign.png";
    FileSystem.writeAsStringAsync(
        path,
        signature.replace("data:image/png;base64,", ""),
        { encoding: FileSystem.EncodingType.Base64 }
    )
    .then(() => FileSystem.getInfoAsync(path))
    .then(async (datas) => {
        const {uri} = datas;
        const ownerSign = uri;   
        const ownerSignUrl = await uploadImageAsync(ownerSign);
        if(ownerSignUrl){
          const reciverOwnerSign = ownerSignUrl;
          const {brand, ram, storage, deviceModelName, deviceImei} = acceptDevice;
          // Get the current date components
          const today = new Date();
          const year = today.getFullYear();
          const month = today.getMonth() + 1; // Months are zero-based, so add 1
          const day = today.getDate();
          const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
          
          const formatTime = (date) => {
            const hours = date.getHours();
            const minutes = date.getMinutes();

            const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour format
            const period = hours < 12 ? 'AM' : 'PM';

            return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
          }

          const getDayName = (date) => {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days[date.getDay()];
          }
          const formattedDayTime = `${getDayName(today)} ${formatTime(today)}`;
          const address = "Dhaka, Bangladesh";
          const transDevcieInfo = {brand, ram, storage, deviceModelName, deviceImei, formattedDate, address, formattedDayTime};
          createAPdf(reciverOwnerSign, transDevcieInfo)
        }
    })
    .catch(console.error);
    }
  }

  
  const createAPdf = async (reciverOwnerSign, transDevcieInfo) => {
    isAccepetDevcieProcesing(true)
    const invoiceId = Math.floor(100000 + Math.random() * 900000);
    const deviceOwnerSign = acceptDevice?.ownerSignUrl;
    let html = OwnerTransferInvoice(deviceOwnerData, reciverOwnerSign, reciverOwnerData, deviceOwnerSign, transDevcieInfo, invoiceId);
    try{
      const {uri} = await Print.printToFileAsync({html});
      console.log('File has been saved to:', uri);
      const pdfUri = await fetch(uri);
      const pdfUriBlob = await pdfUri.blob();
      const pdfName = acceptDevice?._id + acceptDevice?.deviceImei;
      uploadPdfFile(pdfUriBlob, pdfName, isPdfUploadCompleted)
    }catch(err){
      console.log(err)
      Alert.alert("Make shure You have Internet Connection");
    }
  }

  const uploadPdfFile = async (pdfUriBlob, pdfName, isPdfUploadCompleted) => {
    isAccepetDevcieProcesing(true)
    if (pdfUriBlob) {
      console.log('Uploading Pdf File....')
      const sotrageRef = ref(storage, `ownerShipTransferInvoice/${pdfName}`);
      const uploadTask = uploadBytesResumable(sotrageRef, pdfUriBlob);
      uploadTask.on(
        "state_changed", null ,
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then((inVoiceDownloadURL) => {
            if(inVoiceDownloadURL){
                devcieAccepetRequist(inVoiceDownloadURL)
                isPdfUploadCompleted(true)
              }
          });
        }
      );

    }
  }

  const devcieAccepetRequist = async (inVoiceDownloadURL) => {
    setLoading(true);
    isAccepetDevcieProcesing(true)
    const deviceId = acceptDevice?.deviceId;
    const devicereciverEmail = user?.userEmail;
    const previusDeviceOwner = acceptDevice?.ownerEmail;
    const devcieOwnerSecretOTP = Math.floor(100000 + Math.random() * 900000);
    const newDeviceOwner = {
      deviceNote: "",
      ownarStatus: "",
      ownerHaveAInvoice: true,
      thisIsCurrentOwner: true,
      ownerName: user?.userName,
      deviceLostNoteMessage: "",
      thisIsPreviousOwner: false,
      deviceListingDate: todyDate,
      ownerEmail: user?.userEmail,
      ownerId: user?.userAccountId,
      deviceTransferDate: todyDate,
      thisIsUnAuthorizeOwner: false,
      ownerPhoto: user?.userProfilePic,
      deviceImei: acceptDevice?.deviceImei,
      deviceOrigin: "ibugthtThisSecondHand",
      inVoiceDownloadURL: inVoiceDownloadURL,
      devcieOwnerSecretOTP: devcieOwnerSecretOTP,
    };
    const acceptDeviceInfo = {deviceId, devicereciverEmail, transferDeviceId, newDeviceOwner, previusDeviceOwner, inVoiceDownloadURL};
    const newArray = {acceptDeviceInfo: acceptDeviceInfo, deviceIamges: firebaseIamge};

    try {
      const deviceInfo = newArray;
      const response = await axios.post('http://192.168.0.154:5000/verifydeviceAccept', {deviceInfo});
      if (response.data.acknowledged) {
        alert('Check your email');
        navigation.navigate('Home');
      } else {
        alert('Device Add Failed');
      }
    } catch (error) {
      console.error('Error during DeviceAccept:', error);
      alert('Device Add Failed');
      isAccepetDevcieProcesing(false);
    } finally {
      setLoading(false);
      isAccepetDevcieProcesing(false);
    }
  };
  


  const handUndo = () => {signatureRef.current.undo()};
  const handleRedo = () => {signatureRef.current.redo()};
  const handleReset = () => {signatureRef.current.clearSignature();};
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.assets[0].uri]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    try{
      const fileRef = ref(storage, `image/image-${Date.now()}`);
      const result = await uploadBytes(fileRef, blob);
    
      // We're done with the blob, close and release it
      blob.close();
    
      return await getDownloadURL(fileRef);
    }catch(error) {
      console.log(error)
    }
  };
  const handleImageRemove = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };
  const imgWidth = "100%";
  const imgHeight = 200;
  const style = ` .m-signature-pad--footer {display: none; margin: 0px;}
  body,html {width: ${imgWidth}px; height: ${imgHeight}px;}`;
  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
          firstTimeRef.current = false;
          return;
      }
      refetch()
      refetchAcceptDevice()
    }, [refetch, refetchAcceptDevice])
  )

 

  

  return (
    <ScrollView scrollEnabled={scrollEnabled} style={{padding: SIZES.medium, backgroundColor: COLORS.white500, minHeight: "100%"}}>
        <View View style={styles.cardContainer}>
        {acceptDevice?.devicePicture && 
        <Image source={{uri: acceptDevice?.devicePicture}} resizeMode="contain" style={{ borderRadius: 4, marginRight: 10, width: 100, height: 100}}/>} 
        <View>
            <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>{acceptDevice?.deviceModelName}</Text>
            <Text style={styles.phoneDetailsText}>IMEI : {acceptDevice?.deviceImei}</Text>
            <Text style={styles.phoneDetailsText}>Internal : {acceptDevice?.ram} / {acceptDevice?.storage}</Text>
            <Text style={styles.phoneDetailsText}>Brand : {acceptDevice?.brand}</Text>
            <Text style={styles.phoneDetailsText}>Color : {acceptDevice?.colorVarient}</Text>
        </View>
        </View>
        <View style={{gap: 10}}>
          <View>
            <TouchableOpacity style={styles.selectPhotoBtn} onPress={pickImage}>
            <AntDesign name="pluscircle" size={24} color={COLORS.slate300} />
            <Text style={{color: COLORS.slate300}}>Add Photo</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, alignItems: "center", justifyContent: "flex-start" }}>
            {selectedImages.map((uri, index) => (
              <View key={index} style={{borderWidth: 1, borderColor: COLORS.slate200, borderRadius: 5}}>
                <TouchableOpacity onPress={() => handleImageRemove(index)} style={{position: "absolute", zIndex: 100, backgroundColor: COLORS.slate200, borderBottomRightRadius: 5, padding: 2}}><AntDesign name="close" size={16} color={COLORS.slate500} /></TouchableOpacity>
                <Image source={{ uri }} style={{ width: 103, height: 100, resizeMode: "contain" }} />
              </View>
            ))}
          </View>
          <Text>{`Selected: ${selectedImages.length}/10`}</Text>
        </View>
        <View style={{paddingVertical:10}}><Divider /></View>
        
        <View style={{gap: 10}}>
        <View>
        <Text style={{color: COLORS.slate500}}>Write Device Transfer Secret Code *</Text>
        <Controller control={control} rules={{required: true,}}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput keyboardType='number-pad'  style={styles.inputBox} onBlur={onBlur} onChangeText={onChange} value={value}  placeholder='Enter Device Secret Code'/> )}
            name="deviceSecrentCode"
        />
        {errors.deviceSecrentCode && <Text style={{color: COLORS.red500}}>Device Transfer Secret Code is required</Text>}
        {acceptStatus && <Text style={{color: COLORS.red500}}>{acceptStatus}</Text>}
        </View>
        <View>
            <Text style={{color: COLORS.slate500}}>Date</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
              <TextInput  style={styles.inputBox} onBlur={onBlur} onChangeText={onChange} value={value} /> )}
              name="transferDate"
            />
            {errors.transferDate && <Text style={{color: COLORS.red500}}>Date is required</Text>}
        </View>
        <View>
          <Text style={{color: COLORS.slate500, marginBottom: SIZES.xSmall}}>Draw Your Signature</Text>
          <View style={styles.signCanvasContainer}>
            <View style={{ height: imgHeight, width: imgWidth, paddingVertical: 20, borderWidth: 1,borderColor: COLORS.slate200,borderRadius: 4, }}>
              <SignatureScreen
              ref={signatureRef}
              webStyle={style}
              descriptionText="Sign"
              onOK={handleOK}
              onBegin={handleDragEvent}
              onEnd={handleEndDragEvent}
              />
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10}}>
              <TouchableOpacity style={styles.signBtn}  onPress={handleReset} >
                <Entypo name="eraser" size={18} color={COLORS.white500} />
                <Text style={{color: COLORS.white500}}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signBtn}  onPress={handUndo}>
                <MaterialIcons name="undo" size={18} color={COLORS.white500} />
                <Text style={{color: COLORS.white500}}>Undo</Text>
              </TouchableOpacity>
                <TouchableOpacity style={styles.signBtn}  onPress={handleRedo}>
                <MaterialIcons name="redo" size={18} color={COLORS.white500} />
              <Text style={{color: COLORS.white500}}>Redo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <Text style={{color: COLORS.slate500, marginBottom: SIZES.xSmall}}>Device Transfer Fee</Text>
          <View style={{backgroundColor:  COLORS.slate100,  borderRadius: 6}}>
          <View style={styles.tokenCardItem}>
          <Text style={{color: COLORS.slate500}}>Total Token</Text>
          <Text style={styles.tokenCardItemValue}>{itemQuantity?.tokenQuantity} Token</Text>
          </View>
          <Divider />
          <View style={styles.tokenCardItem}>
          <Text style={{color: COLORS.slate500}}>Device Accept Fee</Text>
          <Text style={styles.tokenCardItemValue}>1 Token</Text>
          </View>
          <Divider />
          <View style={styles.tokenCardItem}>
          <Text style={{color: COLORS.slate500}}>Available Token</Text>
          <Text style={styles.tokenCardItemValue}>{itemQuantity?.tokenQuantity && itemQuantity?.tokenQuantity - 1} Token</Text>
          </View>
          </View>
        </View>
        </View>
        <View style={{marginVertical: 15}}>
          <TouchableOpacity onPress={toggleCheckbox}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {checked ?  <MaterialIcons name="check-box" size={24} color={COLORS.blue500} /> : 
              <MaterialIcons name="check-box-outline-blank" size={24} color={COLORS.slate400} />}
              <Text style={{marginLeft: 4}}>I aggre with <Text style={{color: COLORS.blue500, fontWeight: 500}}>terms</Text> and  
              <Text style={{color: COLORS.blue500, fontWeight: 500}}> condition</Text></Text>
            </View>
          </TouchableOpacity>
        </View>
        { itemQuantity?.tokenQuantity === 0 && 
        <View style={{padding: 10, borderRadius: 10, backgroundColor: COLORS.red200, marginBottom: 10}}>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: 'space-between'}}>
            <Text style={{marginRight: 10, color: COLORS.red500}}>You Have 0 Token. Please Purchase Token For Accept This Device</Text> 
          </View>
        </View>
        }
       <View style={{ flexDirection: "column", gap: SIZES.small, marginBottom: 20 }}>
       {isLoading ? <TouchableOpacity style={styles.confirmBtn}> 
        <ActivityIndicator color={COLORS.white500}/> 
        </TouchableOpacity> :
        itemQuantity?.tokenQuantity === 0 ? 
        <TouchableOpacity onPress={() => showAlert()} style={[styles.confirmBtn, {opacity: 0.5}]} >
        <Text style={styles.confirmBtnText}> Confirm to Accept</Text>
        </TouchableOpacity> : loading ?
        <TouchableOpacity style={styles.confirmBtn}> 
        <ActivityIndicator color={COLORS.white500}/> 
        </TouchableOpacity> :
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.confirmBtn} >
        <Text style={styles.confirmBtnText}> Confirm to Accept</Text>
        </TouchableOpacity> 
        }
        <AwesomeAlert
          show={zeroTokenAlert}
          showProgress={false}
          title="Token Alert"
          message="You don't have any Token. Please Buy some Token to continue."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Close"
          confirmText="Buy now"
          confirmButtonColor={COLORS.blue500}
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            navigation.navigate('BuyToken');
            hideAlert();
          }}
        />
        </View>
    </ScrollView>
  )
}




const styles = StyleSheet.create({
  selectPhotoBtn:{
    width: "100%", 
    paddingVertical: SIZES.xxLarge, 
    borderColor: COLORS.slate200, 
    borderRadius: 6, 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "column",
    borderWidth: 1
  },
  signCanvasContainer:{
    gap: 10,
    flexDirection:"column",
  },
  signBtn: {
    backgroundColor: COLORS.blue500,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: SIZES.small,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.blue500,
    borderWidth: 1,
    flexDirection: "row",
    gap: 5,
  },
  tokenCardItem:{
    flexDirection: "row", 
    alignItems: "center",
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.small, 
    justifyContent: "space-between",  
  },
  tokenCardItemValue:{
    color: COLORS.slate500, 
    fontWeight: 700
  },
  phoneDetailsText:{
    marginBottom: 3, 
    color: COLORS.slate300, 
    fontSize: SIZES.small
  },
  cardContainer:{
    borderWidth: 1, 
    borderColor: COLORS.slate100, 
    borderRadius: SIZES.xSmall, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "flex-start", 
    marginBottom: SIZES.xSmall, 
    padding: 10
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.white500,
    justifyContent: "space-between",
    marginTop: 6,
  },
  searchWrapper: {
    borderWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginRight: 10,
    borderColor: COLORS.slate200,
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.xSmall,
  },
  container: {
    backgroundColor: COLORS.white500,
  },
  inputBox: {
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.xSmall,
    marginTop: 6,
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.slate200,
  },
  referenceInputBox: {
    width: 300,
    marginTop: 6,
    borderWidth: 1,
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.slate200,
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.medium,
  },
  confirmBtn: {
    width: "100%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.small,
    borderColor: COLORS.blue500,
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.large,
    backgroundColor: COLORS.blue500,
  },
  confirmBtnText:{
    fontSize: SIZES.medium, 
    fontWeight: 600, color: "#fff"
  },
  googleLoginBtn: {
    borderWidth: 1,
    width: 300,
    gap: SIZES.small,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.slate200,
    paddingVertical: SIZES.small,
    backgroundColor: COLORS.white500,
  }
});

export default VerifyDeviceAcceft;