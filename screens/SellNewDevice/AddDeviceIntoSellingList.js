import React, { useContext, useState } from "react";  
import { StyleSheet, Text, View,TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import 'react-native-get-random-values';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { COLORS, SIZES } from '../../constants';
import { AuthContext } from '../../context/AuthProvider';
import { MaterialIcons  } from '@expo/vector-icons';


const AddDeviceIntoSellingList = ({navigation, route}) => {
  const deviceId = route.params.deviceId ;
  const [haveABox, sethaveABox] = useState(false);
  const [checked, setChecked] = useState(false);
  const { user, userLoding } = useContext(AuthContext);
  const {control, handleSubmit, formState: { errors }} = useForm();


  const { isLoading, data: sellingDevice = [], refetch } = useQuery({ 
    queryKey: ['sellingDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.154:5000/myDeviceDetails/${deviceId}`);
      return res.data;
    } 
  })
  
  const toggleCheckbox = () => {setChecked(!checked)};
  const toggleHaveABox = () => {sethaveABox(!haveABox)};

  const onSubmit = async (data) => {
    const deviceBrand = sellingDevice?.brand;
    const deviceModelName = sellingDevice?.modelName;
    const colorVarient = sellingDevice?.colorVarient;
    const ram = sellingDevice?.ram;
    const storage = sellingDevice?.storage;
    const battery = sellingDevice?.battery;
    const batteryRemovable = sellingDevice?.batteryRemovable;
    const sim_slot = sellingDevice?.sim_slot;
    const gpu = sellingDevice?.gpu;
    const Announced = sellingDevice?.Announced;
    const haveOriginalBox = haveABox;
    const daysUsed = sellingDevice?.daysUsed;
    const deviceId = sellingDevice?._id;
    const ownerEmail = user?.userEmail;
    const listingAddress = data?.deviceAddress;
    const devciePrice = data.devicesellingPrice;
    const sellingTitle = data.sellingTitle;
    const deviceDescription = data.deviceDescription;
    const ownerName = user?.userName;
    const deviceInfo =  { 
      deviceBrand, deviceModelName, 
      sellingTitle, colorVarient, ram, 
      storage, battery, battery, batteryRemovable, 
      sim_slot, gpu, Announced, listingAddress, 
      daysUsed, deviceId, ownerEmail, ownerName,
      haveOriginalBox, devciePrice, deviceDescription };
    navigation.navigate('SellDeviceAction', {deviceInfo})
  };

  return (
    <ScrollView style={{minHeight: "100%", backgroundColor: COLORS.white500}} showsVerticalScrollIndicator={false}>
    <View style={{padding: 16}}>
    
    <View style={{ gap: SIZES.medium }}>

    <View>
      <Text style={{color: COLORS.slate500}}>Selling Post Title *</Text>
      <Controller control={control} rules={{ required: true}} name="sellingTitle"
      render={({ field: { onChange, onBlur, value } }) => (
      <TextInput  placeholder="Selling Post Title" style={styles.inputBox} onBlur={onBlur} onChangeText={onChange} value={value}/>)}/>
      {errors.sellingTitle && <Text style={{color: COLORS.red500}}>Post Title is Required</Text>}
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Description *</Text>
      <Controller control={control} rules={{ required: true}} name="deviceDescription"
      render={({ field: { onChange, onBlur, value } }) => (
      <TextInput style={styles.descriptionInputBox} multiline={true} onBlur={onBlur} onChangeText={onChange} 
      placeholder="Write Somthing" value={value}/>)}/>
      {errors.deviceDescription && <Text style={{color: COLORS.red500}}>Selling Description is required</Text>}
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Price Taka *</Text>
      <Controller control={control} rules={{ required: true}} name="devicesellingPrice"
      render={({ field: { onChange, onBlur, value } }) => (
      <TextInput style={styles.inputBox} onBlur={onBlur} onChangeText={onChange} 
      placeholder="Example 10,000" keyboardType='numeric' value={value}/>)}/>
      {errors.devicesellingPrice && <Text style={{color: COLORS.red500}}>Price is required</Text>}
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Address *</Text>
      <Controller control={control} rules={{ required: true}} name="deviceAddress"
      render={({ field: { onChange, onBlur, value } }) => (
      <TextInput placeholder="Device Pickup Address" style={styles.inputBox} onBlur={onBlur} onChangeText={onChange} value={value}/>)}/>
      {errors.deviceAddress && <Text style={{color: COLORS.red500}}>Device Pickup Address is required</Text>}
      </View>
      
      <View>
      <Text style={{color: COLORS.slate500}}>Model Name</Text>
      <TextInput  style={styles.inputBox} value={sellingDevice?.modelName} editable={false} />
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Brand</Text>
      <TextInput  style={styles.inputBox} value={sellingDevice?.brand} editable={false} />
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Ram</Text>
      <TextInput  style={styles.inputBox} value={sellingDevice?.ram} editable={false} />
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Storage</Text>
      <TextInput  style={styles.inputBox} value={sellingDevice?.storage} editable={false} />
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Battery</Text>
      <TextInput  style={styles.inputBox} value={sellingDevice?.battery} editable={false} />
      </View>
      
      <View>
        <TouchableOpacity onPress={toggleHaveABox}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {haveABox ?  <MaterialIcons name="check-box" size={24} color={COLORS.blue500} /> : 
            <MaterialIcons name="check-box-outline-blank" size={24} color={COLORS.slate400} />}
            <Text style={{marginLeft: 4}}>I Have a Original Box</Text>
          </View>
        </TouchableOpacity>
      </View>

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
    <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 30 }}>
    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn} >
    <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}>Next</Text>
    </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  selectPhotoBtn:{
    width: "100%", 
    borderWidth: 1,
    borderRadius: 6, 
    alignItems: "center", 
    flexDirection: "column",
    justifyContent: "center", 
    borderColor: COLORS.slate200, 
    paddingVertical: SIZES.xxLarge, 
  },
  cardContainer:{
    padding: 10,
    borderWidth: 1, 
    flexDirection: "row", 
    alignItems: "center", 
    borderRadius: SIZES.xSmall, 
    marginBottom: SIZES.xSmall, 
    justifyContent: "flex-start", 
    borderColor: COLORS.slate100, 
  },
  searchContainer: {
    marginTop: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.white500,
  },
  searchWrapper: {
    width: "100%",
    borderWidth: 1,
    marginRight: 10,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: SIZES.xSmall,
    borderColor: COLORS.slate200,
    paddingVertical: SIZES.xSmall,
    justifyContent: "space-between",
    paddingHorizontal: SIZES.medium,
  },
  container: {
    backgroundColor: COLORS.white500,
  },
  inputBox: {
    marginTop: 6,
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.slate200,
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
  },
  descriptionInputBox: {
    marginTop: 6,
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.slate200,
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
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
  loginBtn: {
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
  googleLoginBtn: {
    borderWidth: 1,
    width: 300,
    gap: SIZES.small,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.xSmall,
    paddingVertical: SIZES.small,
    borderColor: COLORS.slate200,
    backgroundColor: COLORS.white500,
  }
});
export default AddDeviceIntoSellingList;
