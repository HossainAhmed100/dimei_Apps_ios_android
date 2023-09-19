import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import { format } from 'date-fns';

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
    <View style={{ borderWidth: 1, padding: SIZES.xSmall, borderRadius: SIZES.xSmall, borderColor: COLORS.slate100, overflow: "hidden", gap: 10}}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10}}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: 10}}>
    {item?.ownerPhoto && <Image source={{uri: item?.ownerPhoto}} style={{width: 50, height: 50, borderRadius: 6,  resizeMode: "cover"}}/>}
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 20, fontWeight: 600, color: "#3B3C35"}}>{item?.OwnerName}</Text>
      <Text style={{fontSize: 16, color: "#808080", fontWeight: "400", fontSize: 14}}>ID: {item.ownerId}</Text>
    </View>
    </View>
    <TouchableOpacity style={{backgroundColor: COLORS.blue100, paddingVertical: 6, paddingHorizontal: 16, borderRadius: 6}}>
      <Text style={{color: COLORS.blue500, fontSize: 12, fontWeight: 500}}>{item?.ownarStatus}</Text>
    </TouchableOpacity>
    </View>
    <Divider />

    <View style={{flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 10}}>
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 10}}>
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>Listing Date</Text>
      <Text style={{fontSize: 16, color: "#808080", fontWeight: "400", fontSize: 14}}>{format(new Date(item?.deviceListingDate), 'yyyy-MM-dd hh:mm a')}</Text>
    </View>
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
    <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>Transfer Date</Text>
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

const OwnerInfo = ({item}) => (
  <View style={{ flexDirection: "column",  width: "100%"}}>
    <View style={styles.listItem}>
    <Text>Name :</Text>
    <Text>{item.OwnerName}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>OwnerId :</Text>
    <Text>{item.ownerId}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Owner Phone :</Text>
    <Text>{item.ownerPhone}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Owner Address :</Text>
    <Text>{item.ownerAddress}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Owner Email :</Text>
    <Text>{item.ownerEmail}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Listing Date :</Text>
    <Text>{format(new Date(item?.deviceListingDate), 'yyyy-MM-dd hh:mm a')}</Text>
    </View>
    <Divider />
    <View style={styles.listItem}>
    <Text>Transfer Date :</Text>
    <Text>{format(new Date(item?.deviceTransferDate), 'yyyy-MM-dd hh:mm a')}</Text>
    </View>
  </View>
)


const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 10,
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: 'space-between', 
  },
})
export default ViewOwnerDetails
