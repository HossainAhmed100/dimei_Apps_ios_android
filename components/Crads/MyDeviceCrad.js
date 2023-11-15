import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { COLORS, SIZES } from '../../constants';
import { format, formatDistanceToNow } from 'date-fns';

const MyDeviceCrad = ({item, viewMyDeviceDetails}) => {
  return (
    <Pressable 
      onPress={() => viewMyDeviceDetails(item?._id)} 
      style={[style.cardContainer, {
      borderColor: item?.deviceTransferStatus ? COLORS.blue200 : 
      item?.isDeviceSell ? COLORS.green200 : 
      item?.newOwnerClaim ? COLORS.red200 : 
      item?.someonefoundthisdevice ? COLORS.red200 : 
      item?.deviceLostStatus ? COLORS.red200 : COLORS.slate100}]}>
    {item?.devicePicture &&  
    <Image source={{ uri: item?.devicePicture }} width={120} height={140} resizeMode="cover" style={{ borderRadius: 4, marginRight: 10, }} />}
      <View>
        {item?.deviceTransferStatus && 
        <View style={[style.alertText, {backgroundColor: COLORS.blue200}]}>
          <Text style={{color: COLORS.blue500, fontSize: 12}}>Transfaring</Text>
        </View>
        }
        {item?.isDeviceSell && 
        <View style={[style.alertText, {backgroundColor: COLORS.green200}]}>
          <Text style={{color: COLORS.green500, fontSize: 12}}>Selling Item</Text>
        </View>
        }
        {item?.deviceLostStatus && 
        <View style={[style.alertText, {backgroundColor: COLORS.red200}]}>
          <Text style={{color: COLORS.red500, fontSize: 12}}>Lost Item</Text>
        </View>
        }
       
        <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>{item?.modelName}</Text>
        <View style={{flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 4}}>
        {item?.newOwnerClaim ?
          <View style={{paddingVertical: 4, paddingHorizontal: 8, backgroundColor: COLORS.red200, borderRadius: 4}}>
            <Text style={{color: COLORS.red500, fontSize: SIZES.xSmall}}>Rejcted</Text>
          </View> : item?.someonefoundthisdevice ?
           <View style={{paddingVertical: 4, paddingHorizontal: 8, backgroundColor: COLORS.red200, borderRadius: 4}}>
           <Text style={{color: COLORS.red500, fontSize: SIZES.xSmall}}>Rejcted</Text>
         </View> : <View style={{paddingVertical: 4, paddingHorizontal: 8, backgroundColor: COLORS.green200, borderRadius: 4}}>
           <Text style={{color: COLORS.green500, fontSize: SIZES.xSmall}}>Active</Text>
          </View>
        }
        <View style={{paddingVertical: 4, paddingHorizontal: 8, backgroundColor: COLORS.blue200, borderRadius: 4}}>
        {item?.daysUsed && <Text style={{color: COLORS.blue500, fontSize: SIZES.xSmall}}>{formatDistanceToNow(new Date(item?.daysUsed))}</Text>}
        </View>
        </View> 
        {item?.daysUsed && <Text style={style.deviceListText}>{format(new Date(item?.daysUsed), 'yyyy-mm-dd hh:mm a')}</Text>}
        <Text style={style.deviceListText}>Variant :  {item?.ram} / {item.storage}</Text>
        <Text style={style.deviceListText}>Brand : {item?.brand}</Text>
        <Text style={style.deviceListText}>Color :  {item?.colorVarient}</Text>
      </View>
    </Pressable>
  )
}


const style = StyleSheet.create({
    cardContainer:{
      borderWidth: 1, 
      borderRadius: 4, 
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: "flex-start", 
      marginBottom: SIZES.xSmall, 
      paddingVertical: 4,
      paddingHorizontal: 10,
    },
    alertText:{
      position: "absolute", 
      top: -14, 
      right: -75, 
      padding: 5, 
      borderBottomLeftRadius: 4,
      borderTopRightRadius: 4,
      marginTop: 4
    },
    deviceListText:{
      marginBottom: 3, 
      color: COLORS.slate300, 
      fontSize: SIZES.small
    }
})


export default MyDeviceCrad