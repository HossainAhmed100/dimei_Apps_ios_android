import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import { format } from 'date-fns';

const ViewOwnerDetails =  ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, data: myDevice = [], refetch } = useQuery({ 
    queryKey: ['myDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.1.2:5000/myDeviceDetails/${deviceId}`);
      return res.data;
    } 
  })
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Refresh the data
    setRefreshing(false);
  };
  const viewProvile = (email) => {
    navigation.navigate('ViewUserProfile', {userEmail: email})
  }

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
          renderItem={({ item, index }) => <OwnerCard item={item} viewProvile={viewProvile} index={index}/>}
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

const OwnerCard = ({item, viewProvile}) => {
  return(
    <View style={{ borderWidth: 1, padding: SIZES.xSmall, borderRadius: SIZES.xSmall, borderColor: item?.thisIsUnAuthorizeOwner ? COLORS.red200 : COLORS.slate100, overflow: "hidden", gap: 10}}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10}}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: 10}}>
    {item?.ownerPhoto && <Image source={{uri: item?.ownerPhoto}} style={{width: 50, height: 50, borderRadius: 6,  resizeMode: "cover"}}/>}
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 20, fontWeight: 600, color: "#3B3C35"}}>{item?.ownerName}</Text>
      <Text style={{fontSize: 16, color: "#808080", fontWeight: "400", fontSize: 14}}>ID: {item.ownerId}</Text>
    </View>
    </View>
    {
    item?.thisIsPreviousOwner ? 
    <View style={{backgroundColor: COLORS.blue100, paddingVertical: 6, paddingHorizontal: 16, borderRadius: 6}}>
      <Text style={{color: COLORS.blue500, fontSize: 12, fontWeight: 500}}>Previous Owner</Text>
    </View> : item?.thisIsCurrentOwner ?
    <View style={{backgroundColor: COLORS.green100, paddingVertical: 6, paddingHorizontal: 16, borderRadius: 6}}>
      <Text style={{color: COLORS.green500, fontSize: 12, fontWeight: 500}}>Current Owner</Text>
    </View> :
    <View style={{backgroundColor: COLORS.red100, paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6}}>
      <Text style={{color: COLORS.red500, fontSize: 12, fontWeight: 500}}>Unauthorized Owner</Text>
    </View>
    }
    
    </View>
    <Divider />

    <View style={{flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 10}}>
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 10}}>
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>Listing Date</Text>
      <Text style={{fontSize: 16, color: "#808080", fontWeight: "400", fontSize: 14}}>{format(new Date(item?.deviceListingDate), 'yyyy-MM-dd hh:mm a')}</Text>
    </View>
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>
        {
        item?.thisIsPreviousOwner ? "Transfer Date" : 
        item?.thisIsCurrentOwner ? "Received Date" : "Unauthorized Listing Date"
        } </Text>  
      <Text style={{fontSize: 16, color: "#808080", fontWeight: "400", fontSize: 14}}>{format(new Date(item?.deviceTransferDate), 'yyyy-MM-dd hh:mm a')}</Text>
    </View>
    </View>
    <TouchableOpacity onPress={() => viewProvile(item?.ownerEmail)} style={{paddingVertical: 6, paddingHorizontal: 16, borderRadius: 6}}>
      <Text style={{color: COLORS.blue500, fontSize: 12, fontWeight: 500}}>View Profile</Text>
    </TouchableOpacity>
    </View>

  </View>
  )
}


const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 10,
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: 'space-between', 
  },
})
export default ViewOwnerDetails
