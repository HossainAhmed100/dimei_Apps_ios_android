import React, { useCallback, useContext, useRef, useState } from 'react';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import DropDownPicker from 'react-native-dropdown-picker';
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'; 
import { Divider } from '@rneui/base';
import { storage } from '../../FirebaseConfig';
import { COLORS, SIZES } from '../../constants';
import { ActivityIndicator } from "react-native";
import { useQuery } from '@tanstack/react-query';
import { MaterialIcons  } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const AddDeviceInput = ({navigation, route}) => {
  const deviceIamge = route.params.deviceIamges;
  const deviceImeiInput = route.params.deviceImeiInput;
  const [checked, setChecked] = useState(false);
  const todyDate = new Date().toISOString();
  const [firebaseIamge, setFirebaseIamge] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropDownValue, setDropDownValue] = useState(null);
  const [items, setItems] = useState([]);
  const { user } = useContext(AuthContext);
  const firstTimeRef = useRef(true);
  const [zeroTokenAlert, setZeroTokenAlert] = useState(false);
  const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {deviceNote: "", deviceimei2: ""},});

  const showAlert = () => {setZeroTokenAlert(true)};
  const hideAlert = () => {setZeroTokenAlert(false)};
  const toggleCheckbox = () => {setChecked(!checked);};

  const { data: devciePreview = []} = useQuery({ 
    queryKey: ['devciePreview', deviceImeiInput], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.163:5000/checkDeviceImeiNum/${deviceImeiInput}`);
      return res.data;
    } 
  })

  const {isLoading, data: itemQuantity = [], refetch: fetchToken } = useQuery({ 
    queryKey: ['itemQuantity', user?.userEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.163:5000/useritemQuantity/${user?.userEmail}`);
      return res.data;
    } 
  })

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
          firstTimeRef.current = false;
          return;
      }
      fetchToken()
    }, [fetchToken])
  )

  const onSubmit = async (data) => {
    const deviceNote = data?.deviceNote;
    const deviceimei2 = data?.deviceimei2;
    setLoading(true);
    try {
      const uploadPromises = deviceIamge.map(async (uri) => {
        return await uploadImageAsync(uri);
      });
      const newFirebaseImages = await Promise.all(uploadPromises);
      setFirebaseIamge([...newFirebaseImages]);
      const deviceInfo = {deviceNote, deviceimei2};
      // Now that all images are uploaded to Firebase, proceed to transferToDeviceDattaBase
      await addDeviceInDatabase(deviceInfo, [...newFirebaseImages]);
    } catch (error) {
      console.error('Error during addDevice:', error);
    } finally {
      setLoading(false);
    }
  };

  const addDeviceInDatabase = async (deviceInfo, deviceImgList) => {
  setLoading(true);
  const secretCode = "";
  const haveBoxde = false;
  const daysUsed = todyDate;
  const isDeviceSell = false;
  const deviceStatus = "Good";
  const newOwnerClaim = false;
  const listingDate = todyDate;
  const deviceLostStatus = false;
  const deviceSellingStatus = false;
  const unauthorizeOwnerQuantity = 0;
  const deviceImei = deviceImeiInput;
  const deviceimei2 = deviceInfo?.deviceimei2;
  const deviceTransferStatus = false;
  const someonefoundthisdevice = false;
  const ownerEmail = user?.userEmail;
  const devcieOrigin = dropDownValue;
  const ownerPhoto = user?.userProfilePic;
  const listingAddress = "Dhaka, Bangladesh";
  const deviceIamges = [{deviceImgList, ownerEmail}];
  const devcieOwnerSecretOTP = Math.floor(100000 + Math.random() * 900000);
  const deviceOwnerList = [
    {
      ownarStatus: "",
      ownerEmail: ownerEmail,
      deviceImei: deviceImei,
      ownerPhoto: ownerPhoto,
      inVoiceDownloadURL: "",
      ownerHaveAInvoice: false,
      thisIsCurrentOwner: true,
      deviceLostNoteMessage: "",
      ownerName: user?.userName,
      thisIsPreviousOwner: false,
      deviceOrigin: dropDownValue,
      deviceListingDate: todyDate,
      deviceTransferDate: todyDate,
      ownerId: user?.userAccountId,
      thisIsUnAuthorizeOwner: false,
      deviceNote: deviceInfo?.deviceNote,
      devcieOwnerSecretOTP: devcieOwnerSecretOTP,
    }
  ];   
  
  const deviceInfos = {
    deviceOwnerList, deviceimei2,
    someonefoundthisdevice, newOwnerClaim, 
    isDeviceSell, ownerPhoto, secretCode, 
    devcieOrigin, deviceStatus, listingAddress, 
    listingDate, daysUsed, deviceImei, haveBoxde, 
    ownerEmail, deviceTransferStatus, 
    deviceSellingStatus, deviceLostStatus, 
    unauthorizeOwnerQuantity, deviceIamges,
  };

  try {
      const response = await axios.post('http://192.168.0.163:5000/addNewDevice', {deviceInfos})
      if (response.data.isDeviceisExist) {
          alert('This Devcie is Alredy Added');
          navigation.navigate('Home');
      } else if (response.data.acknowledged) {
          updateDeviceActivity(ownerEmail, ownerPhoto, response.data?.insertedId)
          // navigation.navigate('Home');
      } else {
          setLoading(false)
          alert('Device Add Failed');
      }
    } catch (err) {
      setLoading(false)
      console.error('Error during Add Device To Database:', err);
      alert('Device Added Feild');
    } finally {
      setLoading(false);
    }

  };

  const updateDeviceActivity = async (ownerEmail, ownerPhoto, deviceId) => {
    setLoading(true)
    const deviceActivityInfo = {
      deviceImei: devciePreview?.deviceImei,
      ownerEmail,
      ownerPhoto,
      listingDate: todyDate,
      activityList: [
        {
          userId: user?._id,
          deviceId: deviceId,
          activityTime: todyDate,
          deviceModel: devciePreview?.modelName,
          message: "New Device Addes Successfully",
          devicePicture: devciePreview?.devicePicture,
        }
      ]
    };
    try{
      setLoading(true)
      await axios.put("http://192.168.0.163:5000/insertDevcieActivity/", {deviceActivityInfo})
      .then((res) => {
        if (res.data.modifiedCount === 1){
          alert('Token Added Successfully!');
          navigation.goBack();
        }else if(res.data.insertedId){
          alert('Token Added Successfully!');
          navigation.goBack();
        }else{
          setLoading(false)
          alert('Somthing is wrong!');
        }
      })
    }catch{
      setLoading(false)
    }
  }

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

  const itemsSelect = [
      {label: "আমি এই ডিভাইসটি নতুন কিনেছি", value: "mynewDevice"},
      {label: "আমি এই ডিভাইসটি খুজে পেয়েছি", value: "ifoundthisdevice"},
      {label: "আমি এই ডিভাইসটি হারিয়ে ফেলেছি", value: "ilostthisdevice"},
  ]
  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
        <View style={{padding: SIZES.small}}>
          <View style={styles.cardContainer}>
          {devciePreview?.devicePicture ?
          <Image source={{uri: devciePreview?.devicePicture}} resizeMode="contain" style={{ borderRadius: 4, marginRight: 10, width: 100, height: 100}}/> :
          <ActivityIndicator />
          }  
          <View>
              <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>{devciePreview?.modelName}</Text>
              <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Ram : {devciePreview?.ram}</Text>
              <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Storage : {devciePreview?.storage}</Text>
              <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Brand : {devciePreview?.brand}</Text>
              <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Color : {devciePreview?.colorVarient}</Text>
          </View>
          </View>
        <View style={{ justifyContent: "space-between", flexDirection: "column" }}>
        <View style={{ gap: SIZES.small }}>
            <View>
            <Text style={{color: COLORS.slate500}}>Device IMEI 1 *</Text>
            <TextInput style={styles.inputBox} placeholder="Enter Device imei" autoCapitalize='none'  value={deviceImeiInput} />
            </View>
            <View>
              <Text style={styles.inputTextLabel}>Device IMEI 2 *</Text>
              <Controller control={control} rules={{required: true,}}
                render={({ field: { onChange, onBlur, value } }) => (
                 <TextInput style={styles.noteInputBox} placeholder="Enter Device imei 2" onBlur={onBlur} onChangeText={onChange} value={value}/>
                )}
                name="deviceimei2"
              />
            {errors.deviceimei2 && <Text style={{color: COLORS.red500}}>Please Enter Device imei 2</Text>}
            </View>
            <View style={{zIndex: 100}}>
            <Text style={{color: COLORS.slate500, marginBottom: 6}}>Device origin *</Text>
            <DropDownPicker
            open={open}
            value={dropDownValue}
            items={itemsSelect}
            setOpen={setOpen}
            setValue={setDropDownValue}
            setItems={setItems}
            placeholder='Select Device origin'
            bottomOffset={20}
            style={{borderColor: COLORS.slate200}}
            dropDownDirection='BOTTOM'
            mode='BADGE'
            />
            </View>
            {
              (dropDownValue === "ifoundthisdevice" ||  dropDownValue === "ilostthisdevice") &&
            <View>
              <Text style={styles.inputTextLabel}>Note *</Text>
              <Controller control={control} rules={{required: true,}}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput style={styles.noteInputBox} multiline={true} numberOfLines={3} 
                  placeholder={"Write About Your Devcie "} onBlur={onBlur} onChangeText={onChange} value={value} />
                )}
                name="deviceNote"
              />
            {errors.deviceNote && <Text style={{color: COLORS.red500}}>Write Some Message Please</Text>}
            </View>
            }
            {
            (dropDownValue === "mynewDevice" || dropDownValue === null) &&
            <View>
            <Text style={{color: COLORS.slate500, marginBottom: 6}}>Device Transfer Fee</Text>
            <View style={{backgroundColor:  COLORS.slate100,  borderRadius: SIZES.small}}>
            <View style={styles.tokenItem}>
            <Text style={{color: COLORS.slate500}}>Total Token</Text>
            <Text style={{color: COLORS.slate500, fontWeight: 700}}>{itemQuantity?.tokenQuantity} Token</Text>
            </View>
            <Divider />
            <View style={styles.tokenItem}>
            <Text style={{color: COLORS.slate500}}>Transfer Fee</Text>
            <Text style={{color: COLORS.slate500, fontWeight: 700}}>1 Token</Text>
            </View>
            <Divider />
            <View style={styles.tokenItem}>
            <Text style={{color: COLORS.slate500}}>Available Token</Text>
            <Text style={{color: COLORS.slate500, fontWeight: 700}}>{itemQuantity?.tokenQuantity && itemQuantity?.tokenQuantity - 1} Token</Text>
            </View>
            </View>
            </View>
            }
            
            <View style={{marginBottom: 30}}>
              <TouchableOpacity onPress={toggleCheckbox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {checked ?  <MaterialIcons name="check-box" size={24} color={COLORS.blue500} /> : 
                  <MaterialIcons name="check-box-outline-blank" size={24} color={COLORS.slate400} />}
                  <Text style={{marginLeft: 4}}>I aggre with <Text style={{color: COLORS.blue500, fontWeight: 500}}>terms</Text> and  
                  <Text style={{color: COLORS.blue500, fontWeight: 500}}>condition</Text></Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
        <View>
        {
        isLoading ? <TouchableOpacity style={styles.loginBtn}> 
        <ActivityIndicator color={COLORS.white500}/> 
        </TouchableOpacity> :
        itemQuantity?.tokenQuantity === 0 ? 
        <TouchableOpacity onPress={() => showAlert()} style={[styles.loginBtn, {opacity: 0.5}]} >
        <Text style={{fontSize: SIZES.medium, fontWeight: 600, color: "#fff"}}> Confirm to ADD</Text>
        </TouchableOpacity> : loading ?
        <TouchableOpacity style={styles.loginBtn}> 
        <ActivityIndicator color={COLORS.white500}/> 
        </TouchableOpacity> :
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn} >
        <Text style={{fontSize: SIZES.medium, fontWeight: 600, color: "#fff"}}> Confirm to ADD</Text>
        </TouchableOpacity> 
        }
        <AwesomeAlert
          show={zeroTokenAlert}
          showProgress={false}
          title="Token Alert"
          message="You don't have any Token. Please Buy some Token to continue."
          closeOnTouchOutside={false}
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
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    tokenItem:{
        paddingHorizontal: SIZES.small, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        paddingVertical: SIZES.xSmall
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
    inputBox: {
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.xSmall,
        marginTop: 6,
        width: "100%",
        borderWidth: 1,
        borderColor: COLORS.slate200,
    },
    noteInputBox: {
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.xSmall,
        marginTop: 6,
        width: "100%",
        borderWidth: 1,
        borderColor: COLORS.slate200,
    },
    referenceInputBox: {
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.xSmall,
        marginTop: 6,
        width: 300,
        borderWidth: 1,
        borderColor: COLORS.slate200,
    },
    loginBtn: {
        backgroundColor: COLORS.blue500,
        width: "100%",
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.small,
        alignItems: "center",
        justifyContent: "center",
        borderColor: COLORS.blue500,
        borderWidth: 1,
    },
    googleLoginBtn: {
        backgroundColor: COLORS.white500,
        width: 300,
        paddingVertical: SIZES.small,
        borderRadius: SIZES.xSmall,
        flexDirection: "row",
        gap: SIZES.small,
        alignItems: "center",
        justifyContent: "center",
        borderColor: COLORS.slate200,
        borderWidth: 1,
    }
});

export default AddDeviceInput
