import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react';
import { COLORS, SIZES, icons } from '../../constants';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { Divider } from '@rneui/base';

const AddNewDevice = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [searchData, setsearchData] = useState([]);
  const [showData, setShowData] = useState(false)
  const {control, handleSubmit, formState: { errors }, reset, watch} = useForm({defaultValues: {inputdeviceimei: ""},});
  const [inputdeviceimei] = watch(['inputdeviceimei']);

  const handleHidePress = () => {
    reset();
    setLoading(false);
    setsearchData([]);
    setShowData(false)
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const deviceimeiNum = data.inputdeviceimei;
    try{
      const response = await axios.get(`http://192.168.0.163:5000/checkDeviceImeiNum/${deviceimeiNum}`);
      setsearchData(response.data);
      setLoading(false);
      setShowData(true)
    }
    catch{
      setLoading(false);
    }
  };

  const nextAction = () => {
    navigation.navigate("AddPhotoForNewDevice", {deviceImeiInput: inputdeviceimei})
  };
  return (
    <ScrollView style={{backgroundColor: COLORS.white500, minHeight: "100%"}} showsVerticalScrollIndicator={false}>
    <View style={{paddingHorizontal: SIZES.large}}>
      <View>
      <View style={{flexDirection: "row", gap: 10, paddingVertical: 10}}>
      <Controller control={control} rules={{required: true,}}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput keyboardType="number-pad" style={styles.inputBox} placeholder="Enter IMEI e.g 12345678912" onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="inputdeviceimei"
      />
      {inputdeviceimei ?
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.inputBoxBtn}>
      <Image source={icons.search} style={{resizeMode: "contain", width: 20, height: 20, tintColor: COLORS.white500}}/>
      </TouchableOpacity> :
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.inputBoxBtn}>
      <MaterialCommunityIcons name="line-scan" size={20} color={COLORS.white500} />
      </TouchableOpacity>
      }
      </View>
      {errors.inputdeviceimei && <Text style={{color: COLORS.red500}}>Please Enter your Device IMEI number</Text>}
      
      {loading && <ActivityIndicator />}

      {showData &&  
      <View style={{borderWidth: 1, borderColor: COLORS.slate200, borderRadius: SIZES.small, marginVertical: SIZES.medium}}>
        <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: SIZES.medium}}>
        <Image source={{uri: searchData?.devicePicture}} style={{width: 120, height: 140, borderRadius: 4, marginRight: 10, resizeMode: "cover"}}/>
        </View>
        <View>
        <Text style={styles.dText}>Model : {searchData?.modelName}</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Brand : {searchData?.brand}</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>3.5mm jack : {searchData?.threePointFive_mm_jack ? "Yes" : "No"}</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Colors : {searchData?.colorVarient}</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>MISC Model : {searchData?.MISC_Model}</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Ram : {searchData?.ram}</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Internal Storage : {searchData?.storage}</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Announced : {searchData?.AnnouncedDate}</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Chipset : {searchData?.Chipset}</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>SIM Slot: {searchData?.sim_slot}</Text>
        <Divider color={COLORS.slate200}/>
        <Text style={styles.dText}>Battery : {searchData?.battery}</Text>
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