import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import { format, formatDistanceToNow } from 'date-fns';
import { Entypo  } from '@expo/vector-icons';

const ViewOwnerDetails =  ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, data: ownerData = [], refetch } = useQuery({ 
    queryKey: ['myDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.163:5000/getDeviceOwnerList/${deviceId}`);
      return res.data;
    } 
  })

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Refresh the data
    setRefreshing(false);
  };
  const viewOwnerDetails = (ownerInfo) => {
    const data = {deviceId: deviceId, ownerInfo: ownerInfo, ownerEmail: ownerData?.ownerEmail};
    navigation.navigate('ViewDeviceOwnerInfo', {paramsInfo: data})
  }

  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500, paddingHorizontal: 10}}>
      <View style={{paddingTop: 10}}>
      {isLoading ? <ActivityIndicator size={"large"}/> : 
        (
        <View>
          <FlatList showsVerticalScrollIndicator={false} data={ownerData?.deviceOwnerList} keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => <OwnerCard item={item} viewOwnerDetails={viewOwnerDetails} index={index}/>}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          contentContainerStyle={{ rowGap: 12, columnGap: 12 }}
          />
        </View>
        )}
      </View>
    </View>
  )
}

const OwnerCard = ({item, viewOwnerDetails}) => {
  const formattedDate = (date) => {
    const distance = formatDistanceToNow(new Date(date));
    const formatted = format(new Date(date), "MMMM d, yyyy h:mm a"); // Adjust the format as needed
    return `${distance} - ${formatted}`;
  };
  return(
    <View style={[styles.cardContainer, {borderColor: item?.thisIsUnAuthorizeOwner ? COLORS.red200 : COLORS.slate100}]}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 10}}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: 10}}>
    {item?.ownerPhoto && <Image source={{uri: item?.ownerPhoto}} style={{width: 50, height: 50, borderRadius: 6,  resizeMode: "cover"}}/>}
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>{item?.ownerName}</Text>
      <Text style={styles.dateText}>ID: {item.ownerId}</Text>
    </View>
    </View>
    {item?.thisIsPreviousOwner ? 
    <View style={[styles.ownerAlertBg, {backgroundColor: COLORS.blue100}]}>
     <Text style={[styles.ownerAlertText, {color: COLORS.blue500}]}>Previous Owner</Text>
    </View> : item?.thisIsCurrentOwner ?
     <View style={[styles.ownerAlertBg, {backgroundColor: COLORS.green100}]}>
      <Text style={[styles.ownerAlertText, {color: COLORS.green500}]}>Current Owner</Text>
    </View> :
     <View style={[styles.ownerAlertBg, {backgroundColor: COLORS.red100}]}>
      <Text style={[styles.ownerAlertText, {color: COLORS.red500}]}>Unauthorized Owner</Text>
    </View>
    }
    </View>
    {item?.deviceOrigin && <DevcieOriginText item={item?.deviceOrigin}/>}
    <Divider />
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 10}}>
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>Listing Date</Text>
      {item?.deviceTransferDate ? <Text style={styles.dateText}>{formattedDate(item?.deviceTransferDate)}</Text>: <ActivityIndicator />}
    </View>
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>
        {item?.thisIsPreviousOwner ? "Transfer Date" : item?.thisIsCurrentOwner ? "Received Date" : "Unauthorized Listing Date"}
      </Text>  
      {item?.deviceTransferDate ? <Text style={styles.dateText}>{formattedDate(item?.deviceTransferDate)}</Text>: <ActivityIndicator />}
    </View>
    </View>
    <Divider />
    <View style={{flexDirection: "row", gap: 10}}>
    <TouchableOpacity onPress={() => viewOwnerDetails(item)} style={{borderRadius: 6, alignItems: "flex-end", padding: 6, justifyContent: "center"}}>
      <Text style={{color: COLORS.blue500, fontSize: 12, fontWeight: 500}}>View Details</Text>
    </TouchableOpacity>
    </View>
  </View>
  )
}

const DevcieOriginText = ({item}) => {
  return(
    <View style={styles.deviceOriginBox}>
      <Entypo name="text" size={SIZES.medium} color={COLORS.slate300} />
      <Text style={styles.deviceOriginText}>
      {
      item  === "mynewDevice" ? "আমি এই ডিভাইসটি নতুন কিনেছি" :
      item  === "ibugthtThisSecondHand" ? "আমি এই ডিভাইস টি পুরাতন কিনেছি" :
      item  === "ifoundthisdevice" ? "আমি এই ডিভাইসটি খুজে পেয়েছি" :
      item  === "ilostthisdevice" && "আমি এই ডিভাইসটি হারিয়ে ফেলেছি"
      }
      </Text>
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
  cardContainer:{
    borderWidth: 1, 
    padding: SIZES.xSmall, 
    borderRadius: 6, 
    overflow: "hidden", gap: 10
  },
  ownerAlertBg:{paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6},
  ownerAlertText:{fontSize: 12, fontWeight: 500},
  dateText:{fontSize: 14, color: "#808080", fontWeight: "400"},
  deviceOriginText: {color: COLORS.slate300, fontSize: 14},
  deviceOriginBox: {
    backgroundColor: COLORS.slate100, 
    padding: 10, borderRadius: 4, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "flex-start",
    gap: 6
  },
})
export default ViewOwnerDetails
