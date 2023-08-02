import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { COLORS, SIZES } from '../../constants';

const MyDeviceCrad = ({item, viewDeviceDetails}) => {
  return (
    <Pressable onPress={() => viewDeviceDetails(item._id)} style={[style.cardContainer, {borderColor: item?.deviceTransferStatus ? COLORS.red200 : COLORS.slate100}]}>
    {item?.devicePicture &&  <Image
      source={{ uri: item.devicePicture }}
      width={120}
      height={140}
      resizeMode="cover"
      style={{
        borderRadius: 4,
        marginRight: 10,
      }}
    />}
      <View>
        {item?.deviceTransferStatus &&  <View style={{position: "absolute", top: -17, right: -75, backgroundColor: COLORS.red200, padding: 5, borderBottomLeftRadius: 10}}>
        <Text style={{color: COLORS.red500}}>Transfaring</Text>
        </View>}
       
          <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>{item.modelName}</Text>
          <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 4}}>
          {item.deviceStatus ? <View style={{paddingVertical: 4, paddingHorizontal: 8, backgroundColor: COLORS.green200, borderRadius: 4}}>
              <Text style={{color: COLORS.green500, fontSize: SIZES.xSmall}}>GOOD</Text>
              </View>  : <View style={{paddingVertical: 4, paddingHorizontal: 8, backgroundColor: COLORS.red200, borderRadius: 4}}>
              <Text style={{color: COLORS.red500, fontSize: SIZES.xSmall}}>Rejcted</Text>
              </View>  }
             
             <View style={{paddingVertical: 4, paddingHorizontal: 8, backgroundColor: COLORS.blue200, borderRadius: 4}}>
              <Text style={{color: COLORS.blue500, fontSize: SIZES.xSmall}}>{item.days} Days</Text>
              </View> 
          </View>
          <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>24-10-2022 | 10:23 PM</Text>
          <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Variant :  {item.ram} / {item.storage}</Text>
          <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Brand : {item.brand}</Text>
          <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Color :  {item.colorVarient}</Text>
      </View>
  </Pressable>
  )
}


const style = StyleSheet.create({
    cardContainer:{
        borderWidth: 1, 
        borderRadius: SIZES.xSmall, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "flex-start", 
        marginBottom: SIZES.xSmall, 
        padding: 10,
        overflow: "hidden"
    },
})


export default MyDeviceCrad