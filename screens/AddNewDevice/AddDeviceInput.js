import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'; 
import { COLORS, SIZES } from '../../constants';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import { format } from 'date-fns';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../FirebaseConfig';
import { useQuery } from '@tanstack/react-query';
import { Divider } from '@rneui/base';
import { Controller, useForm } from 'react-hook-form';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons  } from '@expo/vector-icons';


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
    const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {deviceNote: ""},});

   const showAlert = () => {
    setZeroTokenAlert(true)
    };
  
   const hideAlert = () => {
    setZeroTokenAlert(false)
    };
    const toggleCheckbox = () => {setChecked(!checked);};
    const { data: devciePreview = []} = useQuery({ 
        queryKey: ['devciePreview', user?.userEmail], 
        queryFn: async () => {
          const res = await axios.get(`http://192.168.0.127:5000/checkDeviceImeiNum/${deviceImeiInput}`);
          return res.data;
        } 
    })

    const {isLoading, data: itemQuantity = [], refetch: fetchToken } = useQuery({ 
        queryKey: ['itemQuantity', user?.userEmail], 
        queryFn: async () => {
          const res = await axios.get(`http://192.168.0.127:5000/useritemQuantity/${user?.userEmail}`);
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
      setLoading(true);
    try {
        const uploadPromises = deviceIamge.map(async (uri) => {
          return await uploadImageAsync(uri);
        });

        const newFirebaseImages = await Promise.all(uploadPromises);
        setFirebaseIamge([...newFirebaseImages]);
        const deviceNote = data.deviceNote;
        // Now that all images are uploaded to Firebase, proceed to transferToDeviceDattaBase
        await addDeviceInDatabase(deviceNote, [...newFirebaseImages]);

      } catch (error) {
        console.error('Error during addDevice:', error);
      } finally {
        setLoading(false);
      }


    };

    const addDeviceInDatabase = async (deviceNotes, deviceImgList) => {
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
        ownerPhoto: ownerPhoto,
        ownerEmail: ownerEmail,
        deviceImei: deviceImei,
        deviceNote: deviceNotes,
        thisIsCurrentOwner: true,
        ownerName: user?.userName,
        deviceLostNoteMessage: "",
        thisIsPreviousOwner: false,
        deviceOrigin: dropDownValue,
        deviceListingDate: todyDate,
        ownerId: user?.userAccountId,
        deviceTransferDate: todyDate,
        thisIsUnAuthorizeOwner: false,
        devcieOwnerSecretOTP: devcieOwnerSecretOTP,
      }
    ];   
    
    const deviceInfos = {
      deviceOwnerList, 
      someonefoundthisdevice, newOwnerClaim, 
      isDeviceSell, ownerPhoto, secretCode, 
      devcieOrigin, deviceStatus, listingAddress, 
      listingDate, daysUsed, deviceImei, haveBoxde, 
      ownerEmail, deviceTransferStatus, 
      deviceSellingStatus, deviceLostStatus, 
      unauthorizeOwnerQuantity, deviceIamges,
    };

    try {
        const response = await axios.post('http://192.168.0.127:5000/addNewDevice', {deviceInfos})
        if (response.data.isDeviceisExist) {
            alert('This Devcie is Alredy Added');
            navigation.navigate('Home');
        } else if (response.data.acknowledged) {
            alert('Check your email');
            navigation.navigate('Home');
        } else {
            alert('Device Add Failed');
        }
    } catch (err) {
        console.error('Error during Add Device To Database:', err);
        alert('Device Added Feild');
    } finally {
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
            <Text style={{color: COLORS.slate500}}>Device IMEI *</Text>
            <TextInput
                style={styles.inputBox}
                placeholder="Enter Device imei"
                autoCapitalize='none' 
                value={deviceImeiInput}
            />
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
            <View>
            <Text style={{color: COLORS.slate500}}>Listing Date *</Text>
            <TextInput style={styles.inputBox} placeholder="Device Listing Date" value={format(new Date(todyDate), 'yyyy-MM-dd')} />
            </View>
            
            {/* <View>
            <Text style={{color: COLORS.slate500}}>Reference</Text>
            <View style={styles.referenceInputBox}>
            <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: 10}}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 10}}>
            <Image source={{uri: "https://scontent.fdac24-3.fna.fbcdn.net/v/t39.30808-6/329413355_1127951397871370_7922564190006557504_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF-UePABmkG1uQtAUJt3yEZpOGY48SGGvik4ZjjxIYa-Olrwqvc4ftFWpiMcK0D65YSo6ZG_uGEwwsjlMR4zWDK&_nc_ohc=TNbreiFkDnkAX-Qbw4S&_nc_ht=scontent.fdac24-3.fna&oh=00_AfC5hu5CX7Gcnl6dDWlyNs07qy8cG3RvTfS3kBOntsk8qA&oe=64C65E62"}} style={{borderRadius: 6, width: 35, height: 35}}/>
            <Text>Din islam</Text>
            </View>
            <Ionicons name="close-outline" size={20} color={COLORS.slate300} />
            </View>
            <View style={{width: "100%"}}>
            <Divider />
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 10}}>
            <Image source={{uri: "https://scontent.fdac24-4.fna.fbcdn.net/v/t39.30808-6/355132375_947562279835069_1334785686561488687_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHHtN1wxZ7Qoqh8vwhkbkCKhM1o-7zlIv6EzWj7vOUi_oWf04NR1LLxwF1Bz-DSWyezZDB1uQ_iKoULtJ9eLu6-&_nc_ohc=OaLd5JqEld8AX93-voz&_nc_ht=scontent.fdac24-4.fna&oh=00_AfAufPcPO0Go9QPCrrkmsZikzlYoXF0SjSqmT7uldEPaGw&oe=64C70281"}} style={{borderRadius: 6, width: 35, height: 35}}/>
            <Text>Ahasan Habib</Text>
            </View>
            <Ionicons name="close-outline" size={20} color={COLORS.slate300} />
            </View>
            <View style={{width: "100%"}}>
            <Divider />
            </View>
            <View style={{width: "100%"}}>
            <Pressable style={{backgroundColor: COLORS.slate100, width: "100%", paddingVertical: SIZES.small, paddingHorizontal: SIZES.large, borderRadius: SIZES.small, alignItems: "center", justifyContent: "center", borderColor: COLORS.slate200, borderWidth: 1,}} >
            <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: COLORS.slate500 }}>Add Reference +</Text>
            </Pressable>
            </View>
            </View>
            </View>
            </View> */}
            {
              (dropDownValue === "mynewDevice" || dropDownValue === null) &&
              <View>
              <Text style={{color: COLORS.slate500, marginBottom: 6}}>Device Transfer Fee</Text>
              <View style={{backgroundColor:  COLORS.slate100,  borderRadius: SIZES.small}}>
              <View style={styles.tokenItem}>
              <Text style={{color: COLORS.slate500}}>Total Token</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>{itemQuantity?.tokenQuantity} Token</Text>
              </View>
              <Divider />
              <View style={styles.tokenItem}>
              <Text style={{color: COLORS.slate500}}>Transfer Fee</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>1 Token</Text>
              </View>
              <Divider />
              <View style={styles.tokenItem}>
              <Text style={{color: COLORS.slate500}}>Available Token</Text>
              <Text style={{color: COLORS.slate500, fontWeight: 700}}>{itemQuantity?.tokenQuantity && itemQuantity?.tokenQuantity - 1} Token</Text>
              </View>
              </View>
              </View>
            }
            
            <View>
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
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm to ADD</Text>
        </TouchableOpacity> : loading ?
        <TouchableOpacity style={styles.loginBtn}> 
        <ActivityIndicator color={COLORS.white500}/> 
        </TouchableOpacity> :
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn} >
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm to ADD</Text>
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
