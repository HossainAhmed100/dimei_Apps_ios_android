import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS, SIZES, images } from '../../constants';

const NIDPhotoUpload = ({navigation, route}) => {
    const userInfo = route.params.userInfo ;
  return (
    <View style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
    <View style={{flex: 1, justifyContent: "center"}}>
      <View style={{marginTop: SIZES.medium}}>
      <Text style={{fontSize: SIZES.large, color: COLORS.slate600, fontWeight: 500, textAlign: "center"}}>Please Verify Your</Text>
      <Text style={{fontSize: SIZES.large, color: COLORS.slate600, fontWeight: 500, textAlign: "center"}}>National NID Card</Text>
      </View>
      <Text style={{textAlign: "center", color: COLORS.slate300, marginTop: SIZES.large}}>Scan the front side of NID card with camera</Text>
      <View style={{paddingHorizontal: SIZES.medium, paddingVertical: SIZES.xxLarge}}>
      <Image source={images.frontNid} style={{width: "100%", height: 180, borderRadius: 10}}/>
      <View style={{width: 50, height: 50, backgroundColor: COLORS.blue500, alignItems: "center", justifyContent: "center", position: "absolute", borderRadius: 50, bottom: 20, right:SIZES.large}}>
      <Feather name="camera" size={24} color={COLORS.white500} />
      </View>
      </View>
      <Text style={{textAlign: "center", color: COLORS.slate300, marginTop: SIZES.large}}>Scan the front side of NID card with camera</Text>
      <View style={{paddingHorizontal: SIZES.medium, paddingVertical: SIZES.xxLarge}}>
      <Image source={images.backnid} style={{width: "100%", height: 180, borderRadius: 10}}/>
      <View style={{width: 50, height: 50, backgroundColor: COLORS.blue500, alignItems: "center", justifyContent: "center", position: "absolute", borderRadius: 50, bottom: 20, right:SIZES.large}}>
      <Feather name="camera" size={24} color={COLORS.white500} />
      </View>
      </View>
    </View>
    <View style={{position: "absolute", bottom: 0, width: "100%"}}>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.blue500, flex: 1}}>
    <TouchableOpacity style={{alignItems: "center", justifyContent: "center", paddingHorizontal: SIZES.large, paddingVertical: SIZES.medium}}>
        <Text style={{color: COLORS.white500, fontWeight: 500, fontSize: SIZES.medium,borderRadius: SIZES.small}}>BACK</Text>
    </TouchableOpacity>
    <View style={{flexDirection: "column", alignItems: "flex-start", paddingHorizontal: SIZES.xSmall}}> 
    <Text style={{color: COLORS.blue200, fontSize: SIZES.medium}}>1/5</Text>
    </View>
    <TouchableOpacity style={{alignItems: "center", justifyContent: "center", paddingHorizontal: SIZES.large, paddingVertical: SIZES.medium}}>
        <Text style={{color: COLORS.white500, fontWeight: 500, fontSize: SIZES.medium,borderRadius: SIZES.small}}>NEXT</Text>
    </TouchableOpacity>
    </View>
    </View>
    </View>
  )
}

export default NIDPhotoUpload
