import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, StyleSheet, FlatList, useWindowDimensions} from 'react-native';
import React, { useCallback, useRef } from 'react';
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import { Feather, MaterialCommunityIcons  } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { formatDistanceToNow } from 'date-fns';

const ViewDeviceDetails = ({navigation, route}) => {
  const {width} = useWindowDimensions();
  const deviceId = route.params.deviceId;
  const deviceOwnerEmail = route.params.deviceOwnerEmail;
  const firstTimeRef = useRef(true)

  const { isLoading, data: myDevice = [], refetch } = useQuery({ 
    queryKey: ['myDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.154:5000/myDeviceDetails/${deviceId}`);
      return res.data;
    } 
  })

  const { isLoading: devciePhotoLoading , data: devciePhotos = [] } = useQuery({ 
    queryKey: ['devciePhotos', deviceId, deviceOwnerEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.154:5000/getDevicePhotoList/`,{params: {deviceId: deviceId, userEmail: deviceOwnerEmail}});
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

  const viewOwnerDetails = (did) => {
    navigation.navigate('ViewOwnerDetails', {deviceId: did})
  }

  return (
    <ScrollView style={{backgroundColor: COLORS.white500, minHeight: "100%"}} showsVerticalScrollIndicator={false}>
    <View showsVerticalScrollIndicator={false}>
    <View>
      <View style={{backgroundColor: COLORS.slate100}}>
      {devciePhotos && <ImageSilderShow devciePhotos={devciePhotos} width={width}/>}
      <Divider />
      </View>
    <View>
      {isLoading ? <ActivityIndicator size={"large"}/> : <PhoneDetailsList  item={myDevice}/>}
    </View>

    {!isLoading && 
    <View style={{flexDirection: "column", gap: SIZES.small, paddingVertical: 15, paddingHorizontal: 10}}>
      {myDevice?.newOwnerClaim && 
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: SIZES.small, backgroundColor: COLORS.red200, padding: 10, borderRadius: 5}}>
      <Text style={{color: COLORS.red500, fontSize: SIZES.medium}}>This Devcie has an unauthorised owner</Text>
      <Feather name="alert-triangle" size={SIZES.medium} color={COLORS.red500} />
      </View>
      }
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: SIZES.small}}>
      <TouchableOpacity onPress={() => viewOwnerDetails(deviceId)} style={styles.actionButton}>
        <Text style={{color: COLORS.slate500, fontSize: SIZES.medium}}>Owner info</Text>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5}}>
        {myDevice?.newOwnerClaim && <View style={{padding: 5, borderRadius: 5, backgroundColor: COLORS.red200}}>
          <MaterialCommunityIcons name="account-alert" size={SIZES.medium} color={COLORS.red500} />
        </View>}
        <MaterialCommunityIcons name="chevron-right" size={SIZES.large} color={COLORS.slate500} />
        </View>
      </TouchableOpacity>
      </View>
    </View> 
    }
    </View>
    </View>
    </ScrollView>
  )
}

const ImageSilderShow = ({devciePhotos, width}) => (
  <FlatList horizontal data={devciePhotos} keyExtractor={(item, index) => `${index}`}
    renderItem={({ item }) => (
      <Image source={{ uri: item }} style={{ width: width, height: 230, resizeMode: "contain"}} />
    )}
    pagingEnabled bounces={false}
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
    <Text>Announced :</Text>
    <Text>{item?.AnnouncedDate}</Text>
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
    <Text>Chipset :</Text>
    <Text>{item?.Chipset}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>GPU :</Text>
    <Text>{item?.gpu}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Battery :</Text>
    <Text>{item.battery} {item?.batteryRemovable ? "(removable)" : "(non-removable)"}</Text>
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

export default ViewDeviceDetails