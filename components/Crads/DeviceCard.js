import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react';
import { COLORS, SIZES } from '../../constants';
import { format } from 'date-fns';

const DeviceCard = ({item, viewDeviceDetails}) => {
  return (
    <Pressable onPress={() => viewDeviceDetails(item?._id)} style={style.cardContainer}>
      <Image source={{uri: item?.deviceIamges[0]}} style={{width: "100%", height: 160, resizeMode: "cover"}}/>
      <View style={{ padding: 8}}>
          <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>{item?.deviceModelName}</Text>
          {/* <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 4}}>
              <View style={{paddingVertical: 4, paddingHorizontal: 8, backgroundColor: COLORS.blue200, borderRadius: 4}}>
              <Text style={{color: COLORS.blue500, fontSize: SIZES.xSmall}}>VERIFIED SELLER</Text>
              </View> 
          </View> */}
          <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 4, justifyContent: "space-between"}}>
          <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>{format(new Date(item?.createdAt), 'hh:mm a')}</Text>
          <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}> {item?.ram} / {item?.storage}</Text>
          </View>
          <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>৳{item?.devciePrice}</Text>
      </View>
    </Pressable>
  )
}

const style = StyleSheet.create({
    cardContainer:{
        borderWidth: 1, 
        borderColor: COLORS.slate100, 
        borderRadius: SIZES.xSmall, 
        flexDirection: "column", 
        alignItems: "flex-start", 
        overflow: "hidden",
        width: "48%",
        margin: "1%",
    },
})

export default DeviceCard
