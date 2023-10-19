import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react';
import { COLORS, SIZES, icons, images } from '../../constants';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { Divider } from '@rneui/base';

const AddNewDevice = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showExistingDevice, setshowExistingDevice] = useState(false);
  const [deviceImageNum, setdeviceImageNum] = useState("")
  const [existingDeviceData, setexistingDeviceData] = useState([]);
  const [currentOwner, setcurrentOwner] = useState([]);
  const {control, handleSubmit, formState: { errors }, reset} = useForm({defaultValues: {inputdeviceimei: ""},});
  const closeExistingDevice = () => {
    setshowExistingDevice(false)
    setexistingDeviceData([])
    reset()
  };
  const handleHidePress = () => {
    setShowText(false);
    setLoading(false);
  };
  const onSubmit = async (data) => {
    setLoading(true);
    const deviceimeiNum = data.inputdeviceimei;
    try{

      const response = await axios.get(`http://192.168.1.8:5000/checkDeviceImeiNum/${deviceimeiNum}`);
      if(response.data.checkDevcie === "nodevicefound"){
        setcurrentOwner([])
        setshowExistingDevice(false)
        setdeviceImageNum(deviceimeiNum)
        setShowText(true);
        setLoading(false);
      }else if(response.data.checkDevcie === "devicealredyExist"){
        setexistingDeviceData(response.data.devicedata)
        const currentOwner = response.data.devicedata.deviceOwnerList.find(owner => owner.thisIsCurrentOwner === true);
        setcurrentOwner(currentOwner)
        setshowExistingDevice(true)
        setdeviceImageNum(deviceimeiNum)
        setLoading(false);
      }else if(response.data.checkDevcie === "thisisloastDevice"){
        setcurrentOwner([])
        setshowExistingDevice(false)
        setShowText(true);
        setLoading(false);
        setdeviceImageNum(deviceimeiNum)
      }
      
    }
    catch{
      setLoading(false);
    }
  };

  const viewProvile = (email) => {
    navigation.navigate('ViewUserProfile', {userEmail: email})
  }

  const nextAction = () => {
    navigation.navigate("AddPhotoForNewDevice", {deviceImeiInput: deviceImageNum})
  };

  return (
    <ScrollView style={{backgroundColor: COLORS.white500, minHeight: "100%"}} showsVerticalScrollIndicator={false}>
    <View style={{paddingHorizontal: SIZES.large}}>
      <View>
      <View style={{flexDirection: "row", gap: 10, paddingVertical: 10}}>
      <Controller control={control} rules={{required: true,}}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={styles.inputBox} placeholder="Enter IMEI e.g 12345678912" onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="inputdeviceimei"
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.inputBoxBtn}>
      <Image source={icons.search} style={{resizeMode: "contain", width: 20, height: 20, tintColor: COLORS.white500}}/>
      </TouchableOpacity>
      </View>
      {errors.inputdeviceimei && <Text style={{color: COLORS.red500}}>Please Enter your Device IMEI number</Text>}
      
      {loading && <ActivityIndicator />}
      {showExistingDevice &&
     <View>
       <View style={{padding: 10, backgroundColor: COLORS.red100, borderRadius: 6}}>
        <Text style={{color: COLORS.red500}}>This Device is Alredy Exist !</Text>
      </View>
      <View style={styles.cardContainer}>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: SIZES.medium}}>
      <Image source={{uri: existingDeviceData?.devicePicture}} style={{width: 120, height: 140, borderRadius: 4, marginRight: 10, resizeMode: "cover"}}/>
      </View>
      <Divider color={COLORS.slate200}/>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", paddingVertical: 10, paddingHorizontal: SIZES.xSmall}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 10}}>
        <Image source={{uri: existingDeviceData?.ownerPhoto}} style={{borderRadius: 6, width: 35, height: 35}}/>
        <Text style={{fontSize: 16, fontWeight: 500, color: COLORS.slate300}}>{currentOwner?.ownerName}</Text>
        </View>
        <TouchableOpacity onPress={() => viewProvile(currentOwner?.ownerEmail)} style={{flexDirection: "row"}}>
        <Text style={{fontSize: 12, fontWeight: 500, color: COLORS.blue500}}>View Profile</Text>
         <Entypo name="chevron-small-right" size={20} color={COLORS.blue500} />
        </TouchableOpacity>
      </View>
      <View>
      <Divider color={COLORS.slate200}/>
      <Text style={styles.dText}>Model : {existingDeviceData?.modelName}</Text>
      <Divider color={COLORS.slate200}/>
      <Text style={styles.dText}>Brand : {existingDeviceData?.brand}</Text>
      <Divider color={COLORS.slate200}/>
      <Text style={styles.dText}>Colors : {existingDeviceData?.colorVarient}</Text>
      <Divider color={COLORS.slate200}/>
      <Text style={styles.dText}>Internal Ram : {existingDeviceData?.ram}</Text>
      <Divider color={COLORS.slate200}/>
      <Text style={styles.dText}>Internal Storage : {existingDeviceData?.storage}</Text>
      <Divider color={COLORS.slate200}/>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", paddingVertical: 10, paddingHorizontal: SIZES.xSmall}}>
        <TouchableOpacity onPress={() => closeExistingDevice()} style={[styles.actionBtn, {backgroundColor: COLORS.red500}]}>
        <Text style={styles.actionBtnTitle}>Cancel</Text>
        <Ionicons name="close" size={20} color={COLORS.white500} />
        </TouchableOpacity>
      </View>
      </View>
      </View>
     </View>
    }

      {showText &&  
      <View style={{borderWidth: 1, borderColor: COLORS.slate200, borderRadius: SIZES.small, marginVertical: SIZES.medium}}>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: SIZES.medium}}>
        <Image source={images.iphone13pro} style={{width: 120, height: 140, borderRadius: 4, marginRight: 10, resizeMode: "cover"}}/>
        </View>
        <View>
        <Text style={styles.dText}>Model : iPhone 13 Pro</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>3.5mm jack : No</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Colors : Silver</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>MISC Model : A2638</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Internal Ram : 6GB</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Battery Helth : 85%</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Weight : 204 g (7.20 oz)</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Internal Storage : 128GB</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Announced : 2021, September 14</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Chipset : Apple A15 Bionic (5 nm)</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>GPU : Apple GPU (5-core graphics)</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>SIM : Nano-SIM and eSIM or Dual SIM</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Battery : 128GBLi-Ion 3095 mAh, non-removable</Text>
        <Divider color={COLORS.slate200}/>
        </View>

        <View style={styles.actionButtonContainer}>
        <TouchableOpacity onPress={() => handleHidePress()} style={[styles.actionBtn, {backgroundColor: COLORS.red500}]}>
        <Ionicons name="close-outline" size={20} color={COLORS.white500} />
            <Text style={styles.actionBtnTitle}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nextAction()} style={[styles.actionBtn, {backgroundColor: COLORS.blue500}]}>
            <Text style={styles.actionBtnTitle}>Add now</Text>
        <Ionicons name="add" size={20} color={COLORS.white500} />
        </TouchableOpacity>
        </View>
      </View>
      }
      
     
      </View>
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  cardContainer:{
    borderWidth: 1, borderColor: COLORS.slate200, borderRadius: SIZES.small, marginVertical: SIZES.medium
  },
  deviceCardContainer:{
    // borderWidth: 1, 
    borderColor: COLORS.slate100, 
    borderRadius: SIZES.xSmall, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "flex-start", 
    marginBottom: SIZES.xSmall, 
    padding: 10,
  },
  actionButtonContainer:{
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: SIZES.medium, 
    padding: SIZES.medium
  },
  actionBtn:{
    alignItems: "center", 
    justifyContent: "center", 
    padding: SIZES.xSmall, 
    borderRadius: SIZES.small, 
    flex: 1, flexDirection: "row"
  },
  actionBtnTitle:{
    color: COLORS.white500, fontSize: SIZES.medium
  },
  inputBox: {
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.xSmall,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    flex: 1
  },
  inputBoxBtn: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.xSmall,
    backgroundColor: COLORS.blue500,
    alignItems: "center", justifyContent: "center"
  },
  dText: {
    padding: SIZES.xSmall
  }
})


export default AddNewDevice