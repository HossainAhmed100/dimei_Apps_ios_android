import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, images } from '../../constants';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const AddReferenceCard = ({item}) => {
  return (
    <View style={{ borderWidth: 1, padding: SIZES.xSmall, borderRadius: SIZES.xSmall, borderColor: COLORS.slate200}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start",}}>
          <Image source={{uri: item.userProfilePic}} style={{width: 80, height: 100, borderRadius: SIZES.xSmall,  resizeMode: "contain"}}/>
          <View style={{marginLeft: SIZES.xSmall, gap: 4}}>
            <Text style={{fontSize: SIZES.large, fontWeight: 500, color: COLORS.slate500}}>{item.userName}</Text>
            <Text style={{ color:  COLORS.slate300}}>ID: 475250949</Text>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: SIZES.xSmall}}>
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4}}>
                <Text>KYC</Text>
                {item?.kyc ? <MaterialCommunityIcons name="check-decagram" size={18} color={COLORS.green500} /> :
                 <AntDesign name="closecircle" size={18} color={COLORS.red500} />}
                
              </View>
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4}}>
                <Text>SMS</Text>
                {item?.sms ? <MaterialCommunityIcons name="check-decagram" size={18} color={COLORS.green500} /> :
                 <AntDesign name="closecircle" size={18} color={COLORS.red500} />}
              </View>
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4}}>
                <Text>REFERENCE</Text>
                {item?.reference ? <MaterialCommunityIcons name="check-decagram" size={18} color={COLORS.green500} /> :
                 <AntDesign name="closecircle" size={18} color={COLORS.red500} />}
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 1, marginTop: 8}}>
          <TouchableOpacity style={{backgroundColor: COLORS.blue500, padding: SIZES.small, borderRadius: SIZES.xSmall}}>
            <Text style={{color: COLORS.white500, textAlign: "center", fontWeight: 500, fontSize: 14}}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default AddReferenceCard