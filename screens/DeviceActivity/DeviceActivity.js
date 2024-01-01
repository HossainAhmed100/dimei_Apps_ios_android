import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ActivityIndicator, StyleSheet, RefreshControl, TextInput } from "react-native";
import { COLORS, SIZES, icons } from '../../constants';
import { MaterialCommunityIcons, Feather, Entypo } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthProvider";
import { format, formatDistanceToNow } from "date-fns";
import { Divider } from '@rneui/themed';


const DeviceActivity = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, formState: { errors }, reset, watch} = useForm({defaultValues: {inputdeviceimei: ""},});
  const [inputdeviceimei] = watch(['inputdeviceimei']);

  const { isLoading, data: activityDataObj = [], refetch } = useQuery({ 
      queryKey: ['activityDataObj'],
      queryFn: async () => {
          const res =  await axios.get(`http://192.168.0.163:5000/getUserDeviceActivity/${user?.userEmail}`);
          return res.data;
        } 
    })

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Refresh the data
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

  const viewMyDeviceDetails = (did) => {
    navigation.navigate('MyDeviceDetails', {deviceId: did})
  }


 return(
  <View style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
      <View style={{flexDirection: "row", gap: 10, paddingTop: 10, paddingHorizontal: 10}}>
        <Controller control={control} rules={{required: true,}}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput keyboardType="number-pad" style={styles.inputBox} placeholder="Enter IMEI 12345678912" onBlur={onBlur} onChangeText={onChange} value={value} />
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
      
      <View style={{paddingHorizontal: SIZES.small, flex: 1}}>
      <FlatList data={activityDataObj} keyExtractor={item => item.activityTime}
        renderItem={({item}) => (<ListBox item={item} viewMyDeviceDetails={viewMyDeviceDetails}/>)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ rowGap: 10 }}
        showsVerticalScrollIndicator={false}
      />
      </View>
  </View>
 )
};

const ListBox = ({item, viewMyDeviceDetails}) => (
    <View style={[styles.activityCard, {borderColor: COLORS.slate200}]}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10}}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: 10}}>
    {item?.devicePicture && <Image source={{uri: item?.devicePicture}} style={{width: 50, height: 50, borderRadius: 6,  resizeMode: "cover"}}/>}
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>{item?.deviceModel}</Text>
      {item?.activityTime ? <Text style={styles.dateText}>{format(new Date(item?.activityTime), 'yyyy-MM-dd hh:mm a')}</Text>: <ActivityIndicator />}
    </View>
    </View>
    {item?.activityTime ? 
    <View style={[styles.activityTimeCard, {backgroundColor: COLORS.slate100}]}>
     <Text style={[styles.activityTimeText, {color: COLORS.slate300}]}>{formatDistanceToNow(new Date(item?.activityTime))}</Text>
    </View> : <ActivityIndicator />}
    </View>
    <View style={styles.activityMessageCard}>
      <Entypo name="text" size={SIZES.medium} color={COLORS.slate300} />
      <Text style={styles.activityMessageText}>
      {item?.message}
      </Text>
    </View>
    <Divider />
    <View style={{flexDirection: "row", gap: 10}}>
    <TouchableOpacity onPress={() => viewMyDeviceDetails(item?.deviceId)} style={{borderRadius: 6, alignItems: "flex-end", padding: 6, justifyContent: "center"}}>
      <Text style={{color: COLORS.blue500, fontSize: 12, fontWeight: 500}}>View Details</Text>
    </TouchableOpacity>
    </View>
  </View>
)

const styles = StyleSheet.create({
activityCard:{
    borderWidth: 0.5, 
    padding: SIZES.xSmall, 
    borderRadius: 6, 
    overflow: "hidden", gap: 10
    },
    activityTimeCard:{paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6},
    activityTimeText:{fontSize: 10, fontWeight: 500},
    dateText:{fontSize: 14, color: "#808080", fontWeight: "400"},
    activityMessageText: {color: COLORS.slate300, fontSize: 14},
    activityMessageCard: {
    backgroundColor: COLORS.slate100, 
    padding: 10, borderRadius: 4, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "flex-start",
    gap: 6
    },
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
})

export default DeviceActivity