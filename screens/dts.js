import { FlatList, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import { COLORS, SIZES } from '../constants';
import { Entypo,Feather  } from '@expo/vector-icons';
import { format, formatDistanceToNow } from 'date-fns';
import { AuthContext } from '../context/AuthProvider';
import { ActivityIndicator } from 'react-native';
import { useForm, Controller } from "react-hook-form";

const ViewDeviceOwnerInfo =  ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const paramsInfo = route.params.paramsInfo;
  const ownerInfo = paramsInfo?.ownerInfo;
  const deviceId = paramsInfo?.deviceId;
  const deviceOwnerEmail = paramsInfo?.ownerEmail;
  const {width} = useWindowDimensions();
  const [showUnauthorizedCode, setShowUnauthorizedCode] = useState(false);
  const [removeOwnerBtnLoading, setRemoveOwnerBtnLoading] = useState(false);
  const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {secretCodeForRemoveOwner: ""},})

  const { isLoading: devciePhotoLoading , data: devciePhotos = [] } = useQuery({ 
    queryKey: ['devciePhotos', deviceId, ownerInfo?.ownerEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.154:5000/getDevicePhotoList/`,{params: {deviceId: deviceId, userEmail: ownerInfo?.ownerEmail}});
      return res.data;
    } 
  })
  
  const onSubmit = async (data) => {
    const {ownerEmail, deviceImei, thisIsUnAuthorizeOwner} = ownerInfo;
    const devcieOwnerSecretOTP = data.secretCodeForRemoveOwner;
    const ownerDetails = {ownerEmail, deviceImei, thisIsUnAuthorizeOwner, devcieOwnerSecretOTP};
    setRemoveOwnerBtnLoading(true)
    console.log("🚀 ~ file: ViewDeviceOwnerInfo.js:45 ~ onSubmit ~ ownerDetails:", ownerDetails)
    try {
      const res = await axios.delete(`http://192.168.0.154:5000/deleteUnauthorizedOwner`, {params: { ownerDetails }});
      if(res.data.ownerDeletedSuccess){
        alert("Unauthorized Owner Remove Successfully")
        navigation.popToTop();
      }else if(res.data.unauthorizeOwnerQuantityIsZero){
        alert("Unauthorized Quantity is 0")
      }else if(res.data.secretCodeisWrong){
        alert("Unauthorized Owner OTP is Wrong")
      }else if(res.data.thisIsNotUnauthorizedOwner){
        alert("Unauthorized Owner OTP is Wrong")
      }else if(res.data.ownerRemoveFeilds){
        alert("Somthing is Wrong!")
      }else{
        console.log(res.data);
      }
      setRemoveOwnerBtnLoading(false)
    } catch (error) {
      setRemoveOwnerBtnLoading(false)
      console.error(error);
    }
  }

  const viewProfile = (email) => {
    navigation.navigate('ViewUserProfile', {userEmail: email})
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
        <View style={{backgroundColor: COLORS.slate100}}>
            {devciePhotos && <ImageSilderShow devciePhotos={devciePhotos} width={width}/>}
            <Divider />
        </View>
        <View style={{padding: 10, gap: 10}}>
          <View>
          <OwnerCard ownerInfo={ownerInfo} viewProfile={viewProfile}/>
          </View>


          { 
          ownerInfo?.thisIsUnAuthorizeOwner && 
          user?.userEmail === deviceOwnerEmail ? 
          ownerInfo?.thisIsCurrentOwner ? <View></View> :
          <KeyboardAvoidingView>
          <View style={{backgroundColor: COLORS.red100, borderRadius: 4, borderWidth:2, borderColor: COLORS.red200}}>
            <View style={{paddingVertical: 15, paddingHorizontal: 10}}>
              <Text style={{fontSize: 14, fontWeight: 600, color: "#CB4242"}}>Denger Zone</Text>
            </View>
            <Divider />
            <View style={{paddingVertical: 15, paddingHorizontal: 10, flexDirection: "column", gap: 5}}>
              <View>
                <Text>Remove Unauthorized Owner</Text>
                <Controller control={control} rules={{required: true,}}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput style={styles.inputBox} placeholder='Type Unauthorized Owner OTP' onBlur={onBlur} onChangeText={onChange} value={value} />
                  )}
                  name="secretCodeForRemoveOwner"
                />
                {errors.secretCodeForRemoveOwner && <Text style={{color: COLORS.red500}}>Unauthorized Owner OTP required.</Text>}
              </View>
              {removeOwnerBtnLoading ? 
                <TouchableOpacity style={styles.ownerRemoveBtn}>
                  <ActivityIndicator size="small" color="#ffffff"/>
                </TouchableOpacity> :
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.ownerRemoveBtn}>
                  <Text style={{color: COLORS.white500, fontWeight: 500}}>Remove</Text>
                </TouchableOpacity>
              }
            </View> 
          </View>
          </KeyboardAvoidingView>   : 
          (user?.userEmail === ownerInfo?.ownerEmail && ownerInfo?.thisIsUnAuthorizeOwner) ?
          <View style={{backgroundColor: COLORS.red200, borderRadius: 4}}>
            <View style={{paddingVertical: 15, paddingHorizontal: 10}}>
              <Text Text style={{fontSize: 14, fontWeight: 600, color: "#CB4242"}}>Denger Zone</Text>
            </View>
            <Divider />
            <View style={{paddingVertical: 15, paddingHorizontal: 10, alignItems: "center", justifyContent: "space-between", flexDirection: "row"}}>
              <Text style={{fontSize: 14, fontWeight: 600, color: COLORS.slate300}}>Unauthorized Owner OTP</Text>
              <View style={{ paddingHorizontal: 10, alignItems: "center", gap: 5, flexDirection: "row"}}>
                <Text style={{fontSize: 14, fontWeight: 600, color: COLORS.slate300}}>
                  {showUnauthorizedCode ? ownerInfo?.devcieOwnerSecretOTP : "******"}
                </Text>
                <TouchableOpacity onPress={() => setShowUnauthorizedCode(!showUnauthorizedCode)} style={{padding: 5}}>
                  {showUnauthorizedCode ? <Feather name="eye" size={16} color={COLORS.slate300} /> :
                  <Feather name="eye-off" size={16} color={COLORS.slate300} />}
                </TouchableOpacity>
              </View> 
            </View> 
          </View>  :
          <View></View>
          }
        </View>   
    </ScrollView>
  )
}

const OwnerCard = ({item, viewProfile}) => {
  const formattedDate = (date) => {
    const distance = formatDistanceToNow(new Date(date));
    const formatted = format(new Date(date), "MMMM d, yyyy h:mm a"); // Adjust the format as needed
    return `${distance} - ${formatted}`;
  };
  return(
    <View style={[styles.cardContainer, {borderColor: item?.thisIsUnAuthorizeOwner ? COLORS.red200 : COLORS.slate100}]}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10}}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: 10}}>
    {item?.ownerPhoto && <Image source={{uri: item?.ownerPhoto}} style={{width: 50, height: 50, borderRadius: 6,  resizeMode: "cover"}}/>}
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>{item?.ownerName}</Text>
      <Text style={styles.dateText}>ID: {item.ownerId}</Text>
    </View>
    </View>
    {item?.thisIsPreviousOwner ? 
    <View style={[styles.ownerAlertBg, {backgroundColor: COLORS.blue100}]}>
     <Text style={[styles.ownerAlertText, {color: COLORS.blue500}]}>Previous Owner</Text>
    </View> : item?.thisIsCurrentOwner ?
     <View style={[styles.ownerAlertBg, {backgroundColor: COLORS.green100}]}>
      <Text style={[styles.ownerAlertText, {color: COLORS.green500}]}>Current Owner</Text>
    </View> :
     <View style={[styles.ownerAlertBg, {backgroundColor: COLORS.red100}]}>
      <Text style={[styles.ownerAlertText, {color: COLORS.red500}]}>Unauthorized Owner</Text>
    </View>
    }
    </View>
    {item?.deviceOrigin && <DevcieOriginText item={item?.deviceOrigin}/>}
    <Divider />
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 10}}>
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>Listing Date</Text>
      {item?.deviceTransferDate ? <Text style={styles.dateText}>{formattedDate(item?.deviceTransferDate)}</Text>: <ActivityIndicator />}
    </View>
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>
        {item?.thisIsPreviousOwner ? "Transfer Date" : item?.thisIsCurrentOwner ? "Received Date" : "Unauthorized Listing Date"}
      </Text>  
      {item?.deviceTransferDate ? <Text style={styles.dateText}>{formattedDate(item?.deviceTransferDate)}</Text>: <ActivityIndicator />}
    </View>
    </View>
    <Divider />
    <View style={{flexDirection: "row", gap: 10}}>
    <TouchableOpacity onPress={() => viewProfile(item.ownerEmail)} style={{borderRadius: 6, alignItems: "flex-end", padding: 6, justifyContent: "center"}}>
      <Text style={{color: COLORS.blue500, fontSize: 12, fontWeight: 500}}>View Details</Text>
    </TouchableOpacity>
    </View>
  </View>
  )
}

const DevcieOriginText = ({item}) => {
  return(
    <View style={styles.deviceOriginBox}>
      <Entypo name="text" size={SIZES.medium} color={COLORS.slate300} />
      <Text style={styles.deviceOriginText}>
      {
      item  === "mynewDevice" ? "আমি এই ডিভাইসটি নতুন কিনেছি" :
      item  === "ibugthtThisSecondHand" ? "আমি এই ডিভাইস টি পুরাতন কিনেছি" :
      item  === "ifoundthisdevice" ? "আমি এই ডিভাইসটি খুজে পেয়েছি" :
      item  === "ilostthisdevice" && "আমি এই ডিভাইসটি হারিয়ে ফেলেছি"
      }
      </Text>
    </View>
  )
}



const ImageSilderShow = ({devciePhotos, width}) => (
  <FlatList
    horizontal
    pagingEnabled
    bounces={false}
    data={devciePhotos}
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item, index) => `${index}`}
    renderItem={({ item }) => (
      <Image source={{ uri: item }} style={{ width: width, height: 230, resizeMode: "contain"}} />
    )}
  /> 
)

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 6,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.slate200,
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
  },
  ownerAlertBg:{
    borderRadius: 6,
    paddingVertical: 6, 
    paddingHorizontal: 12, 
  },
  ownerAlertText:{
    fontSize: 12, 
    fontWeight: 500
  },
  dateText:{
    fontSize: 14, 
    color: "#808080", 
    fontWeight: "400"
  },
  deviceOriginText: {
    fontSize: 14,
    color: COLORS.slate300, 
  },
  deviceOriginBox: {
    gap: 6,
    alignItems: "center", 
    flexDirection: "row", 
    justifyContent: "flex-start",
    padding: 10, borderRadius: 4, 
    backgroundColor: COLORS.slate100, 
  },
  ownerRemoveBtn:{
    width: 100,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.xSmall,
    backgroundColor: COLORS.red500, 
    paddingHorizontal: SIZES.medium,
  }
});
export default ViewDeviceOwnerInfo;
