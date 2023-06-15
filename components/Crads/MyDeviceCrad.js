import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { images, COLORS, SIZES } from '../../constants';

const MyDeviceCrad = ({item}) => {
  return (
    <View style={style.cardContainer}>
    <Image source={item.deviceImg} style={{width: 120, height: 140, borderRadius: 4, marginRight: 10}}/>
      <View>
          <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>{item.name}</Text>
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
          <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Variant :  {item.ram} / {item.rom}</Text>
          <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Brand : {item.brand}</Text>
          <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Color :  {item.color}</Text>
      </View>
  </View>
  )
}


const style = StyleSheet.create({
    cardContainer:{
        borderWidth: 1, 
        borderColor: COLORS.slate100, 
        borderRadius: SIZES.xSmall, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "flex-start", 
        marginBottom: SIZES.xSmall, 
        padding: 10
    },
})


export default MyDeviceCrad