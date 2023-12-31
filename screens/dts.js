import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import { format, formatDistanceToNow } from 'date-fns';
import { Entypo  } from '@expo/vector-icons';


const OwnerCard = ({item, viewMyDeviceDetails}) => {
  const formattedDate = (date) => {
    const distance = formatDistanceToNow(new Date(date));
    const formatted = format(new Date(date), "MMMM d, yyyy h:mm a"); // Adjust the format as needed
    return `${distance} - ${formatted}`;
  };
  return(
    <View style={[styles.activityCard, {borderColor: item?.thisIsUnAuthorizeOwner ? COLORS.red200 : COLORS.slate100}]}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: 10}}>
    {item?.ownerPhoto && <Image source={{uri: item?.devicePicture}} style={{width: 50, height: 50, borderRadius: 6,  resizeMode: "cover"}}/>}
    <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", gap: 2}}>
      <Text style={{fontSize: 16, fontWeight: 600, color: "#3B3C35"}}>{item?.deviceModel}</Text>
      {item?.activityTime ? <Text style={styles.dateText}>{format(new Date(item?.activityTime), 'yyyy-MM-dd hh:mm a')}</Text>: <ActivityIndicator />}
    </View>
    {item?.activityTime ? 
    <View style={[styles.activityTimeCard, {backgroundColor: COLORS.blue100}]}>
     <Text style={[styles.activityTimeText, {color: COLORS.blue500}]}>{formatDistanceToNow(new Date(date))}</Text>
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
}


const styles = StyleSheet.create({

  activityCard:{
    borderWidth: 1, 
    padding: SIZES.xSmall, 
    borderRadius: 6, 
    overflow: "hidden", gap: 10
  },
  activityTimeCard:{paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6},
  activityTimeText:{fontSize: 12, fontWeight: 500},
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
})
