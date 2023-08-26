import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const ViewOwnerDetails =  ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, data: myDevice = [], refetch } = useQuery({ 
    queryKey: ['myDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.1.4:5000/myDeviceDetails/${deviceId}`);
      return res.data;
    } 
  })
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Refresh the data
    setRefreshing(false);
  };
  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500, paddingHorizontal: 10}}>
      <View style={{paddingTop: 10}}>
        
      {isLoading ? (
        <ActivityIndicator size={"large"}/>
        ) : (
          <FlatList
          showsVerticalScrollIndicator={false}
          data={myDevice?.deviceOwnerList}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => <OwnerCard item={item} index={index}/>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ rowGap: 12, columnGap: 12 }}
          inverted
        />
        )}
      </View>
    </View>
  )
}

const OwnerCard = ({item, index}) => {
  return(
    <View style={{ borderWidth: 1, padding: SIZES.xSmall, borderRadius: SIZES.xSmall, borderColor: COLORS.slate100, overflow: "hidden"}}>
   <View style={{position: "absolute", top: 0, right: 0, backgroundColor: COLORS.red200, padding: 5, borderBottomLeftRadius: 10}}>
    <Text style={{color: COLORS.red500}}>{++index}</Text>
    </View>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start",}}>
      <Image source={{uri: item?.userProfilePicture}} style={{width: 80, height: 100, borderRadius: SIZES.xSmall,  resizeMode: "contain"}}/>
      <View style={{marginLeft: SIZES.xSmall, gap: 4}}>
        <Text style={{fontSize: SIZES.large, fontWeight: 500, color: COLORS.slate500}}>{item?.userName}</Text>
        <Text style={{ color:  COLORS.slate300}}>Buy:      {item?.exchangeDate}</Text>
        <Text style={{ color:  COLORS.slate300}}>Sell:      {item?.exchangeDate}</Text>
        <Text style={{ color:  COLORS.slate300}}>Used:    365 Days</Text>
      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.slate100,
    padding: 10,
    borderRadius: 10
  }
})
export default ViewOwnerDetails
