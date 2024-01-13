
import React, { useCallback, useContext, useRef, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import axios from 'axios';
import { COLORS, SIZES, icons } from '../constants';
import MyDeviceCrad from '../components/Crads/MyDeviceCrad';
import DeviceAcceptCard from '../components/Crads/DeviceAcceptCard';
import { AuthContext } from '../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';

const AllDevice = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const { user } = useContext(AuthContext);
  const firstTimeRef = useRef(true);
  const {control, handleSubmit, formState: { errors }, watch} = useForm({defaultValues: {inputdeviceimei: ""},});
  const [inputdeviceimei] = watch('inputdeviceimei');
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, isError, data: myDevice = [], refetch: refetchMyDevice } = useQuery({ 
    queryKey: ['myDevice', user?.userEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.181:5000/myalldevice/${user?.userEmail}`);
      return res.data;
    } 
  })

  const { isLoading: reciveDeviceLoading, data: reciveDevice = [], refetch } = useQuery({ 
    queryKey: ['reciveDevice', user?.userEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.181:5000/reciveTransferDevice/${user?.userEmail}`);
      return res.data;
    } 
  })

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
         firstTimeRef.current = false;
         return;
      }
      refetch()
      refetchMyDevice()
    }, [refetch, refetchMyDevice])
  )

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Refresh the data
    await refetchMyDevice(); // Refresh the data
    setRefreshing(false);
  };

  const onSubmit = async (data) => {
    console.log(data)
  }

  const viewMyDeviceDetails = (did) => {
    navigation.navigate('MyDeviceDetails', {deviceId: did})
  }
  
  const acceotDevice = (did) => {
    navigation.navigate('VerifyDeviceAccept', {transferDeviceId: did})
  }
  
  const viewProfile = (email) => {
    navigation.navigate('ViewUserProfile', {userEmail: email})
  }
  const viewDeviceDetails = (deviceId, ownerEmail) => {
    navigation.navigate('ViewDeviceDetails', {deviceId: deviceId, deviceOwnerEmail: ownerEmail})
  }

    return (
      <>
      <Tab value={index} onChange={(e) => setIndex(e)}
        containerStyle={(active) => ({backgroundColor: active ? COLORS.blue500 : COLORS.slate100,})}
        indicatorStyle={{backgroundColor: COLORS.blue200,height: 3,}}
      >
        <Tab.Item title="All Device" titleStyle={(active) => ({ color: active ? COLORS.white500 : COLORS.slate500, fontSize: 12 })} />
        <Tab.Item title="Recive Device" titleStyle={(active) => ({color: active ? COLORS.white500 : COLORS.slate500,fontSize: 12})}/>
      </Tab>
  
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{width: '100%' }}>
        <View style={{minHeight: "100%", backgroundColor: COLORS.white500, padding: 10}}>
        <View style={{gap: 5, marginBottom: 10}}>
          <View style={{flexDirection: "row", gap: 10}}>
          <Controller control={control} rules={{required: true,}}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput style={styles.inputBox} placeholder="Search imei, Name. . ." onBlur={onBlur} onChangeText={onChange} value={value} />
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
        </View>
        <View style={{marginBottom: 200}}>
        <FlatList style={{minHeight: "100%"}} data={myDevice} keyExtractor={item => item._id}
        renderItem={({item}) => (<MyDeviceCrad viewMyDeviceDetails={viewMyDeviceDetails} userEmail={user?.userEmail} item={item}/>)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
        </View>
        </View>
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
        <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
          <View style={{padding: SIZES.small}}>
          <FlatList style={{minHeight: "100%"}} data={reciveDevice} keyExtractor={item => item._id}
          renderItem={({item}) => (<DeviceAcceptCard viewProfile={viewProfile} viewDeviceDetails={viewDeviceDetails} acceotDevice={acceotDevice} item={item}/>)}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
          </View>
        </View>
        </TabView.Item>
      </TabView>
    </>
    )
}

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
})

export default AllDevice