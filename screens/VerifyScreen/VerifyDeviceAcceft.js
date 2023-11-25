import React, { useCallback, useContext, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, View, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import { useForm, Controller } from "react-hook-form";
import { COLORS, SIZES } from '../../constants';
import { format } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons, AntDesign  } from '@expo/vector-icons';
import { Divider } from '@rneui/themed';


const VerifyDeviceAcceft = ({navigation, route})  => {
  const transferDeviceId = route.params.transferDeviceId;
  const [checked, setChecked] = useState(false);
  const [acceptStatus, setAcceptStatus] = useState("");
  const [firebaseIamge, setFirebaseIamge] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const todyDate = new Date().toISOString();
  const firstTimeRef = useRef(true);
  const [zeroTokenAlert, setZeroTokenAlert] = useState(false);
  const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {deviceSecrentCode: "", transferDate: format(new Date(todyDate), 'yyyy-MM-dd')}})
  
  const toggleCheckbox = () => {setChecked(!checked)};
  const showAlert = () => {setZeroTokenAlert(true)};
  const hideAlert = () => {setZeroTokenAlert(false)};

  const { data: itemQuantity = [], refetch } = useQuery({ 
    queryKey: ['itemQuantity', user?.userEmail], 
    queryFn: async () => {
    const res = await axios.get(`http://192.168.0.127:5000/useritemQuantity/${user?.userEmail}`);
    return res.data;
    } 
  })

  const { isLoading, data: acceptDevice = [], refetch: refetchAcceptDevice } = useQuery({ 
    queryKey: ['acceptDevice', transferDeviceId], 
    queryFn: async () => {
    const res = await axios.get(`http://192.168.0.127:5000/getTransferDeviceDetails/${transferDeviceId}`);
    return res.data;
    } 
  })

  const onSubmit = async (data) => {
    setLoading(true)
    const secretCode = data.deviceSecrentCode;
    const deviceId = acceptDevice?.deviceId;
    const devicereciverEmail = user?.userEmail;
    const previusDeviceOwner = acceptDevice?.ownerEmail;
    const devcieOwnerSecretOTP = Math.floor(100000 + Math.random() * 900000);
    const newDeviceOwner = {
      ownarStatus: "",
      ownerPhoto: user?.userProfilePic,
      ownerEmail: user?.userEmail,
      deviceImei: acceptDevice?.deviceImei,
      deviceNote: "",
      thisIsCurrentOwner: true,
      ownerName: user?.userName,
      deviceLostNoteMessage: "",
      thisIsPreviousOwner: false,
      deviceOrigin: "ibugthtThisSecondHand",
      deviceListingDate: todyDate,
      ownerId: user?.userAccountId,
      deviceTransferDate: todyDate,
      thisIsUnAuthorizeOwner: false,
      devcieOwnerSecretOTP: devcieOwnerSecretOTP,
      };
    const acceptDeviceInfo = {deviceId, devicereciverEmail, transferDeviceId, newDeviceOwner, previusDeviceOwner};
    const secretCodetCheckInfo = {secretCode, transferDeviceId};

    try{
      const response = await axios.put(`http://192.168.0.127:5000/verifydevicesecretCode/`, {secretCodetCheckInfo})
      if(response.data.secretCodeStatus){
          setLoading(true)
          const uploadPromises = selectedImages.map(async (uri) => {
            return await uploadImageAsync(uri);
          });
      
          const newFirebaseImages = await Promise.all(uploadPromises);
          setFirebaseIamge([...newFirebaseImages]);
          const deviceImgList = [...newFirebaseImages];
          
          const deviceIamges = [{deviceImgList, ownerEmail: user?.userEmail}];
          await devcieAccepetRequist(acceptDeviceInfo, deviceIamges)
        }else if(response.data.secretCodeStatus){
          setLoading(false)
          alert("Secret Code is wrong!")
          setAcceptStatus("Secret Code is wrong!")
      }
    }
    catch{}
    finally{
        setLoading(false)
    }
  }    

  const devcieAccepetRequist = async (acceptDeviceInfo, deviceIamges) => {
    setLoading(true);
    const newArray = {acceptDeviceInfo: acceptDeviceInfo, deviceIamges: deviceIamges};
    try {
      const deviceInfo = newArray;
      const response = await axios.post('http://192.168.0.127:5000/verifydeviceAccept', {deviceInfo});
  
      if (response.data.acknowledged) {
        alert('Check your email');
        navigation.navigate('Home');
      } else {
        alert('Device Add Failed');
      }
  
    } catch (error) {
      console.error('Error during DeviceAccept:', error);
      alert('Device Add Failed');
    } finally {
      setLoading(false);
    }
   };


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

  return (
    <ScrollView style={{padding: SIZES.medium, backgroundColor: COLORS.white500, minHeight: "100%"}}>
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
        <Text style={{color: COLORS.slate500}}>Write Device Transfer Secret Code *</Text>
        <Controller control={control} rules={{required: true,}}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput  style={styles.inputBox} onBlur={onBlur} onChangeText={onChange} value={value}  placeholder='Enter Device Secret Code'/> )}
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
              <Text style={{color: COLORS.blue500, fontWeight: 500}}>condition</Text></Text>
            </View>
          </TouchableOpacity>
        </View>
        { itemQuantity?.tokenQuantity === 0 && 
        <View style={{padding: 10, borderRadius: 10, backgroundColor: COLORS.red200}}>
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
  tokenCardItem:{
    flexDirection: "row", 
    alignItems: "center",
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.small, 
    justifyContent: "space-between",  
  },
  phoneDetailsText:{
    marginBottom: 3, 
    color: COLORS.slate300, 
    fontSize: SIZES.small
  },
  tokenCardItemValue:{
    color: COLORS.slate500, 
    fontWeight: 700
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