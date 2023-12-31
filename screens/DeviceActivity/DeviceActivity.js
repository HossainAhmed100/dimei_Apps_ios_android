import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, StyleSheet, RefreshControl, TextInput } from "react-native";
import { COLORS, SIZES, icons, images } from '../../constants';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthProvider";
import { format } from "date-fns";

const DeviceActivity = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, formState: { errors }, reset, watch} = useForm({defaultValues: {inputdeviceimei: ""},});
  const [inputdeviceimei] = watch(['inputdeviceimei']);

  const { isLoading, data: trsnData = [], refetch } = useQuery({ 
    queryKey: ['trsnData'],
    queryFn: async () => {
      const res =  await axios.get(`http://192.168.0.163:5000/userTranstion/${user?.userEmail}`);
      return res.data;
    } 
  })

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Refresh the data
    await fetchToken(); // Refresh the data
    setRefreshing(false);
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


 return(
  <View style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
      <View style={{flexDirection: "row", gap: 10, paddingTop: 10, paddingHorizontal: 10}}>
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
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <Text style={{color: COLORS.slate500, fontSize: SIZES.medium, fontWeight: 500, padding: SIZES.small}}>Recent Activity</Text>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
        <TouchableOpacity style={{padding: SIZES.small}}>
        <Feather name="sliders" style={{transform: [{ rotate: '90deg'}]}} size={SIZES.large} color={COLORS.slate500} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: SIZES.small}}>
        <Feather name="clock" size={SIZES.large} color={COLORS.slate500} />
        </TouchableOpacity>
        </View>
      </View>
      
      <View style={{paddingHorizontal: SIZES.small, minHeight: "100%"}}>
      <FlatList data={trsnData} keyExtractor={item => item.date}
        renderItem={({item}) => (<ListBox item={item}/>)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ rowGap: 10 }}
      />
      </View>
  </View>
 )
};

const ListBox = ({item}) => (
  <View>
    <View style={styles.activityListContainer}>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
      <Image source={{uri: item.userProfilePic}} style={{width: 50, height: 50, borderRadius: 10, resizeMode: "contain"}}/>
      <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "center", marginLeft: 10}}>
        <Text style={{fontSize: SIZES.medium, color: COLORS.slate500, fontWeight: 500}}>{item.titleName}</Text>
        <Text style={styles.deviceListText}>{item.status}</Text>
      </View>
    </View>
    <View style={{flexDirection: "column", alignItems: "flex-end", justifyContent: "center"}}>
      <Text style={{fontSize: SIZES.large, color: COLORS.slate500, fontWeight: 500}}>{item.transtionQuantity}</Text>
      {item?.date && <Text style={styles.deviceListText}>{format(new Date(item?.date), 'yyyy-MM-dd hh:mm a')}</Text>}
    </View>
  </View>
  </View>
)

const styles = StyleSheet.create({
  inputBoxBtn: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.xSmall,
    backgroundColor: COLORS.blue500,
    alignItems: "center", justifyContent: "center"
  },
  inputBox: {
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.xSmall,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    flex: 1
  },
  activityListContainer:{
    backgroundColor: COLORS.white500, 
    padding: SIZES.small, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.slate100
  },
  actionBtnContainer:{
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: SIZES.small, 
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20, 
    overflow: "hidden", 
    margin: SIZES.medium, 
    flexWrap: "wrap"
  },
  actionButton:{
    backgroundColor: COLORS.white500, 
    padding: SIZES.small, 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "column", 
    borderRadius: SIZES.small, 
    flex: 1
  },
  actionButtonText:{
    fontSize: SIZES.small , 
    color: COLORS.blue500, 
    fontWeight: 700, 
    marginTop: 2
  },
  deviceListText:{
    marginBottom: 3, 
    color: COLORS.slate300, 
    fontSize: SIZES.small
  }
})

export default DeviceActivity