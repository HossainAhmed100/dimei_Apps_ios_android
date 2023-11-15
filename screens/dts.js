import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, StyleSheet, FlatList, useWindowDimensions} from 'react-native';
import React, { useCallback, useContext, useRef } from 'react';
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import { Entypo, MaterialCommunityIcons  } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../context/AuthProvider';
import { formatDistanceToNow } from 'date-fns';

const dts = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const {width} = useWindowDimensions()
  const queryClient = useQueryClient()
  const deviceId = route.params.deviceId ;
  const firstTimeRef = useRef(true)

  const { isLoading, data: myDevice = [], refetch } = useQuery({ 
    queryKey: ['myDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.127:5000/myDeviceDetails/${deviceId}`);
      return res.data;
    } 
  })

  const { isLoading: devciePhotoLoading , data: devciePhotos = [] } = useQuery({ 
    queryKey: ['devciePhotos', deviceId, user?.userEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.127:5000/getDevicePhotoList/`,{params: {deviceId: deviceId, userEmail: user?.userEmail}});
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
    }, [refetch])
  )

  const canselTransferDevice = async () => {
    const secretCode = "";
    const infoData = {deviceId, secretCode}
    try {
        await axios.put(`http://192.168.0.127:5000/cancelDeviceTransferStatus/`, {infoData})
        .then((res) => {
          if(res.data.transferSuccess){
            queryClient.invalidateQueries({ queryKey: ['myDevice'] })
        }})
    } catch (err) {
        console.log(err);
    } finally {
    }
  }
  const updateSellingPost = async (did) => {
    navigation.navigate('UpdateSellingPost', {deviceId: did})
  }
  const transferDevice = (did) => {
    navigation.navigate('TransferDevice', {deviceId: did})
  }
  const sellDevice = (did) => {
    navigation.navigate('SellDevice', {deviceId: did})
  }
  const viewOwnerDetails = (did) => {
    navigation.navigate('ViewOwnerDetails', {deviceId: did})
  }
  const lostThisDevice = (did) => {
    navigation.navigate('DeviceLostScreen', {deviceId: did})
  }
  const mydevicehasbeenfound = (did) => {
    navigation.navigate('DeviceLostScreen', {deviceId: did})
  }
  return (
    <ScrollView style={{backgroundColor: COLORS.white500, minHeight: "100%"}} showsVerticalScrollIndicator={false}>
    <View showsVerticalScrollIndicator={false}>
    <View>
      <View style={{backgroundColor: COLORS.slate100}}>
      {devciePhotos && <ImageSilderShow devciePhotos={devciePhotos} width={width}/>}
      <Divider />
      </View>
      { myDevice?.deviceTransferStatus && 
      <View style={{padding: 10, borderWidth: 1, borderColor: COLORS.blue500, margin: 10, borderRadius: 10, backgroundColor: COLORS.blue500}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: 'space-between'}}>
          <Text style={{color: COLORS.white500}}>Device Security Code : </Text>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: 'center'}}> 
          <Text style={{marginRight: 10, color: COLORS.white500}}>{myDevice?.secretCode}</Text> 
          <MaterialCommunityIcons name="content-copy" size={18} color={COLORS.white500} />
          </View>
        </View>
      </View>
      }
    <View>
      {isLoading ? <ActivityIndicator size={"large"}/> : <PhoneDetailsList  item={myDevice}/>}
    </View>
    {!isLoading && 
      <View style={{flexDirection: "column", gap: SIZES.small, paddingVertical: 15, paddingHorizontal: 10}}>
      { myDevice?.ownerEmail !== user?.userEmail ? 
      <TouchableOpacity onPress={() => viewOwnerDetails(deviceId)} style={[styles.actionButton,{ backgroundColor: COLORS.red200 }]}>
      <Text style={{color: COLORS.red500, fontSize: 14}}>This is not your Device, see the device owner</Text>
      <MaterialCommunityIcons name="chevron-right" size={SIZES.large} color={COLORS.red500} />
      </TouchableOpacity> :
      <View style={{flexDirection: "column",gap: SIZES.small}}>
        {
        myDevice?.newOwnerClaim ? 
        <View style={{backgroundColor: COLORS.red200, padding: 10, borderRadius: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <Text style={{color: COLORS.red500, fontSize: 14}}>Someone claimed this device ownership</Text>
        <MaterialCommunityIcons name="alert-circle-outline" size={SIZES.large} color={COLORS.red500} />
        </View> : myDevice?.someonefoundthisdevice &&
        <View style={{backgroundColor: COLORS.red200, padding: 10, borderRadius: 6, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <Text style={{color: COLORS.red500, fontSize: 14}}>Someone found this device. view Owner info</Text>
        <MaterialCommunityIcons name="alert-circle-outline" size={SIZES.large} color={COLORS.red500} />
        </View>
        }
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: SIZES.small}}>
      <TouchableOpacity onPress={() => viewOwnerDetails(deviceId)} style={styles.actionButton}>
        <Text style={{color: COLORS.slate500, fontSize: SIZES.medium}}>Owner info</Text>
        {myDevice?.newOwnerClaim &&  
        <View style={{padding: 5, borderRadius: 5, backgroundColor: COLORS.red200}}>
          <MaterialCommunityIcons name="account-alert" size={SIZES.medium} color={COLORS.red500} />
        </View>}
        <MaterialCommunityIcons name="chevron-right" size={SIZES.large} color={COLORS.slate500} />
      </TouchableOpacity>
      {
        !myDevice?.deviceLostStatus &&
        (!myDevice?.deviceTransferStatus || !myDevice?.isDeviceSell) && 
        (
          <TouchableOpacity onPress={() => lostThisDevice(deviceId)} style={styles.actionButton}>
          <Text style={{ color: COLORS.slate500, fontSize: SIZES.medium }}>Lost This Device</Text>
          <MaterialCommunityIcons name="chevron-right" size={SIZES.large} color={COLORS.slate500}/>
        </TouchableOpacity>
        )
      }
      </View>
      </View>
      }
      

      
      { myDevice?.ownerEmail === user?.userEmail && 
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: SIZES.small}}>
      
      {myDevice?.someonefoundthisdevice ? 
        <TouchableOpacity onPress={() => mydevicehasbeenfound(deviceId)} style={[styles.button,{ backgroundColor: COLORS.red500 }]}>
          <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>Claim your ownership again</Text>
          <MaterialCommunityIcons name="cube-send"  size={SIZES.large} color={COLORS.white500} />
        </TouchableOpacity> : myDevice?.deviceLostStatus ? 
        <TouchableOpacity onPress={() => mydevicehasbeenfound(deviceId)} style={[styles.button,{ backgroundColor: COLORS.red500 }]}>
          <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>My device has been found</Text>
          <MaterialCommunityIcons name="cube-send"  size={SIZES.large} color={COLORS.white500} />
        </TouchableOpacity> : myDevice.deviceTransferStatus ? 
      <TouchableOpacity onPress={() => canselTransferDevice(deviceId)} style={[styles.button,{ backgroundColor: COLORS.red500 }]}>
        <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>Cencel Transfer </Text>
        <MaterialCommunityIcons name="cube-send"  size={SIZES.large} color={COLORS.white500} />
      </TouchableOpacity> : myDevice?.isDeviceSell ? 
      <TouchableOpacity onPress={() => updateSellingPost(deviceId)} style={[styles.button,{ backgroundColor: COLORS.green500 }]}>
        <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>Update Selling Post </Text>
        <MaterialCommunityIcons name="square-edit-outline"  size={SIZES.large} color={COLORS.white500} />
      </TouchableOpacity> :
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: SIZES.small}}>
      <TouchableOpacity onPress={() => transferDevice(deviceId)}  style={[styles.button,{ backgroundColor: COLORS.blue500 }]}>
        <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>Transfer </Text>
        <MaterialCommunityIcons name="cube-send"  size={SIZES.large} color={COLORS.white500} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => sellDevice(deviceId)} style={[styles.button,{ backgroundColor: COLORS.blue200 }]}>
      <Text style={{color: COLORS.blue500, fontSize: SIZES.medium}}>Sell now</Text>
      <Entypo name="shop" size={SIZES.medium} color={COLORS.blue500} />
      </TouchableOpacity>
      </View>
      }
      </View>
      }
    </View> 
    }
    </View>
    </View>
    </ScrollView>
  )
}

const ImageSilderShow = ({devciePhotos, width}) => (
  <FlatList
      horizontal
      data={devciePhotos}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={{ width: width, height: 230, resizeMode: "contain"}} />
      )}
      pagingEnabled
      bounces={false}
    /> 
)

const PhoneDetailsList = ({item}) => (
  <View style={{paddingHorizontal: SIZES.small, flexDirection: "column"}}>
    <View style={styles.listItem}>
    <Text>IMEI :</Text>
    <Text>{item?.deviceImei}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Model Name :</Text>
    <Text>{item.modelName}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Brand :</Text>
    <Text>{item.brand}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Color Varient :</Text>
    <Text>{item.colorVarient}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Ram :</Text>
    <Text>{item.ram}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Rom :</Text>
    <Text>{item.storage}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Battery :</Text>
    <Text>{item.battery}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Days Used :</Text>
    {item?.daysUsed ? <Text>{formatDistanceToNow(new Date(item?.daysUsed))}</Text> : <ActivityIndicator />}
    </View>
    <Divider />
  </View>
)

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 10,
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: 'space-between', 
  },
  button:{
    flex: 1, 
    borderWidth: 1, 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: 5, 
    flexDirection: "row", gap: 4, 
    borderColor: COLORS.white500,
    paddingVertical: 12, 
    paddingHorizontal: SIZES.large, 
  },
  actionButton:{
    backgroundColor: COLORS.slate100,
    alignItems: "center", 
    justifyContent: "space-between", 
    borderRadius: 5, 
    flexDirection: "row", 
    paddingVertical: 10, 
    paddingHorizontal: SIZES.xSmall, 
    flex: 1
  }
})

export default dts