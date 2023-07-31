import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, StyleSheet, Modal, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, MaterialCommunityIcons  } from '@expo/vector-icons';

const PrDeviceDetails = ({navigation, route}) => {
  const deviceId = route.params.deviceId ;
  const [myDevice, setMyDevice] = useState('');
  const [loading, setLoading] = useState(true)
  const transferDevice = (did) => {
    navigation.navigate('TransferDevice', {deviceId: did})
  }
  useEffect(() => {
    setLoading(true);
    axios.get(`http://192.168.1.4:5000/myDeviceDetails/${deviceId}`)
      .then(response => {
        if (response.data) {
          setMyDevice(response.data);
          setLoading(false)
        } else {
          console.log('No Device found in response');
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <ScrollView style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
    <View showsVerticalScrollIndicator={false}>
    <View style={{paddingVertical: SIZES.small, paddingHorizontal: SIZES.medium}}>
      <View>
      {
        myDevice?.devicePicture && <Image source={{uri: myDevice?.devicePicture}} style={{width: "100%", height: 200, borderRadius: SIZES.small, resizeMode: "contain", borderColor: COLORS.slate200, borderWidth: 1}}/>
      }
      </View>
        { myDevice.deviceTransferStatus && 
            <View style={{padding: 10, borderWidth: 1, borderColor: COLORS.slate200, marginVertical: 10, borderRadius: 10}}>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: 'space-between'}}>
            <Text>Device Security Code : </Text>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: 'center'}}> 
            <Text style={{marginRight: 10}}>56351164</Text> 
            <MaterialCommunityIcons name="content-copy" size={18} color="black" />
            </View>
          </View>
      </View>
        }
      <View>
        {
          loading ? <ActivityIndicator size={"large"}/> : <PhoneDetailsList item={myDevice}/>
        }
      </View>
    {
      !loading ? <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: SIZES.small}}>
      {
        myDevice.deviceTransferStatus ? <TouchableOpacity onPress={() => transferDevice(deviceId)} style={{alignItems: "center", justifyContent: "center", paddingHorizontal: SIZES.large, paddingVertical: SIZES.xSmall, borderWidth: 1, borderColor: COLORS.white500, flexDirection: "row", gap: 4, borderRadius: SIZES.small, flex: 1, backgroundColor: COLORS.red500}}>
        <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>Cencel Transfer </Text>
        <MaterialCommunityIcons name="cube-send"  size={SIZES.large} color={COLORS.white500} />
      </TouchableOpacity> : <TouchableOpacity onPress={() => transferDevice(deviceId)} style={{alignItems: "center", justifyContent: "center", paddingHorizontal: SIZES.large, paddingVertical: SIZES.xSmall, borderWidth: 1, borderColor: COLORS.white500, flexDirection: "row", gap: 4, borderRadius: SIZES.small, flex: 1, backgroundColor: COLORS.blue500}}>
        <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>Transfer </Text>
        <MaterialCommunityIcons name="cube-send"  size={SIZES.large} color={COLORS.white500} />
      </TouchableOpacity>
      }
        <TouchableOpacity style={{alignItems: "center", justifyContent: "center", paddingHorizontal: SIZES.large, paddingVertical: SIZES.xSmall, borderWidth: 1, borderColor: COLORS.white500, flexDirection: "row", gap: 4, borderRadius: SIZES.small, backgroundColor: COLORS.white500, flex: 1, backgroundColor: COLORS.blue200}}>
          <Text style={{color: COLORS.blue500, fontSize: SIZES.medium}}>Sell now</Text>
          <Entypo name="shop" size={SIZES.medium} color={COLORS.blue500} />
        </TouchableOpacity>
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
    <View style={styles.listItem}>
    <Text>Device Status :</Text>
    <Text>{item.deviceStatus ? "GOOD" : "BLOCK"}</Text>
    </View>
    <Divider />
  </View>
)

const styles = StyleSheet.create({
  listItem: {flexDirection: "row", alignItems: "center", justifyContent: 'space-between', paddingVertical: 10}
})

export default PrDeviceDetails