import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants';
import { Ionicons, Feather,Entypo } from '@expo/vector-icons';

const DeviceSellingChat = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const deviceImg = route.params;
  return (
    <View style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
     
    <View style={{position: "absolute", bottom: 0, width: "100%"}}>

    <View style={{flexDirection: "row", alignItems: "center", backgroundColor: COLORS.white500, flex: 1, paddingHorizontal: 20, borderTopWidth: 1, borderColor: COLORS.slate200, paddingVertical: 15}}>
    
   <TextInput style={{flex: 1, backgroundColor: "white", borderRadius: 50, paddingHorizontal: 15, paddingVertical: 6,borderWidth: 1, borderColor: COLORS.slate200,}} placeholder='write your message...'/>
    <TouchableOpacity activeOpacity={.7} style={{alignItems: "center", justifyContent: "center", paddingHorizontal: SIZES.small}}>
    <Ionicons name="ios-image-outline" size={22} color={COLORS.slate300} />
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={.7} style={{alignItems: "center", justifyContent: "center", paddingHorizontal: SIZES.small}}>
    <Feather name="paperclip" size={22} color={COLORS.slate300} />
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={.7} style={{alignItems: "center", justifyContent: "center"}}>
    <Entypo name="dots-three-vertical" size={22} color={COLORS.slate300} />
    </TouchableOpacity>
    </View>

    </View>
    
    </View>
  )
}

export default DeviceSellingChat