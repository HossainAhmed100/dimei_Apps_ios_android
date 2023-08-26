import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, StyleSheet} from 'react-native';
import React, { useCallback, useRef } from 'react';
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import { Entypo, MaterialCommunityIcons  } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';

const PrDeviceDetails = ({navigation, route}) => {
  const queryClient = useQueryClient()
  const deviceId = route.params.deviceId ;
  const firstTimeRef = useRef(true)

  const { isLoading, data: myDevice = [], refetch } = useQuery({ 
    queryKey: ['myDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.1.4:5000/myDeviceDetails/${deviceId}`);
      return res.data;
    } 
  })

  const canselTransferDevice = async () => {
    const secretCode = "";
    const infoData = {deviceId, secretCode}
    try {
        await axios.put(`http://192.168.1.4:5000/cancelDeviceTransferStatus/`, {infoData})
        .then((res) => {
          if(res.data.transferSuccess){
            queryClient.invalidateQueries({ queryKey: ['myDevice'] })
        }})
    } catch (err) {
        console.log(err);
    } finally {
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
         firstTimeRef.current = false;
         return;
      }
      refetch()
    }, [refetch])
  )

  const transferDevice = (did) => {
    navigation.navigate('TransferDevice', {deviceId: did})
  }

  const sellDevice = (did) => {
    navigation.navigate('SellDevice', {deviceId: did})
  }
  const viewOwnerDetails = (did) => {
    navigation.navigate('ViewOwnerDetails', {deviceId: did})
  }


  return (
    <ScrollView style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
    <View showsVerticalScrollIndicator={false}>
    <View style={{paddingVertical: SIZES.small, paddingHorizontal: SIZES.medium}}>
    { myDevice?.deviceTransferStatus && 
        <View style={{padding: 10, borderWidth: 1, borderColor: COLORS.blue500, marginVertical: 10, borderRadius: 10, backgroundColor: COLORS.blue500}}>
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
      {myDevice?.devicePicture && 
      <Image source={{uri: myDevice?.devicePicture}} 
      style={{width: "100%", height: 200, borderRadius: SIZES.small, resizeMode: "contain", borderColor: COLORS.slate200, borderWidth: 1}}
      />}
      </View>
    <View>
      {isLoading ? <ActivityIndicator size={"large"}/> : <PhoneDetailsList item={myDevice}/>}
    </View>
    {!isLoading ? 
    <View style={{flexDirection: "column", gap: SIZES.small}}>
     
      <TouchableOpacity onPress={() => viewOwnerDetails(deviceId)} style={[styles.actionButton,{ backgroundColor: COLORS.slate100 }]}>
        <Text style={{color: COLORS.slate500, fontSize: SIZES.medium}}>Owner info </Text>
        <MaterialCommunityIcons name="arrow-right"  size={SIZES.large} color={COLORS.slate500} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => viewOwnerDetails(deviceId)} style={[styles.actionButton,{ backgroundColor: COLORS.slate100 }]}>
        <Text style={{color: COLORS.slate500, fontSize: SIZES.medium}}>Lost This Device </Text>
        <MaterialCommunityIcons name="arrow-right"  size={SIZES.large} color={COLORS.slate500} />
      </TouchableOpacity>

      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: SIZES.small}}>
      {myDevice.deviceTransferStatus ? 
      <TouchableOpacity onPress={() => canselTransferDevice(deviceId)} style={[styles.button,{ backgroundColor: COLORS.red500 }]}>
        <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>Cencel Transfer </Text>
        <MaterialCommunityIcons name="cube-send"  size={SIZES.large} color={COLORS.white500} />
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
    </View> : <ActivityIndicator />
    }
    </View>
    </View>
    </ScrollView>
  )
}

const PhoneDetailsList = ({item}) => (
  <View style={{paddingVertical: SIZES.small, flexDirection: "column"}}>
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
    <Text>{item.daysUsed}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Address :</Text>
    <Text>{item.listingAddress}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Listing Date :</Text>
    <Text>{item.listingDate}</Text>
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
    borderRadius: SIZES.small, 
    flexDirection: "row", gap: 4, 
    borderColor: COLORS.white500,
    paddingVertical: SIZES.xSmall, 
    paddingHorizontal: SIZES.large, 
  },
  actionButton:{
    flex: 1, 
    borderWidth: 1, 
    alignItems: "center", 
    justifyContent: "space-between", 
    borderRadius: SIZES.small, 
    flexDirection: "row", gap: 4, 
    borderColor: COLORS.white500,
    paddingVertical: SIZES.xSmall, 
    paddingHorizontal: SIZES.large, 
  }
})

export default PrDeviceDetails