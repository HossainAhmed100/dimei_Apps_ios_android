import { View, Text, Image, Pressable,ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { COLORS, SIZES, images } from '../constants';
import { Feather } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from '../context/AuthProvider';
const ProfileShare = () => {
  const { user, userLoding } = useContext(AuthContext);
  return (
    <View style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
      <ImageBackground source={images.patterns} style={{flex: 1, resizeMode: 'cover', justifyContent: "center"}}>
      <View style={{paddingHorizontal: SIZES.xxLarge}}>
      <View style={{backgroundColor: COLORS.white500, padding: SIZES.medium, borderRadius: SIZES.small, alignItems: "center", justifyContent: "center"}}>
      { user?.userProfilePic && <View style={{position: "absolute", borderWidth: 4, borderColor: COLORS.white500, borderRadius: 100, overflow: "hidden", top: -60}}>
      <Image source={{uri: user?.userProfilePic}} style={{width: 80, height: 80, resizeMode: "contain"}}/>
      </View>}
      <Text style={{marginTop: SIZES.medium, fontSize: SIZES.medium, fontWeight: 600, color: COLORS.slate500}}>{user?.userName}</Text>
        <View style={{backgroundColor: COLORS.blue500, borderRadius: 12, flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: SIZES.small}}>
        <Text style={{color: COLORS.white500, fontSize: SIZES.medium, fontWeight: 400, paddingHorizontal: SIZES.small, }}>ID : {user?.userAccountId}</Text>
        <Pressable style={{height: "100%", borderLeftColor: COLORS.white500, borderLeftWidth: 2, padding: SIZES.small}}>
        <Feather name="copy" size={18} color={COLORS.white500} />
        </Pressable>
        </View>
        { user?.userProfilePic && <View style={{marginBottom: SIZES.medium, paddingVertical: SIZES.small}}>
        <QRCode value={user?.userAccountId} size={200}/>
        </View>}
      </View>
      <View style={{paddingVertical: SIZES.medium, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10}}>
        <Pressable style={{backgroundColor: COLORS.white500, paddingVertical: SIZES.xSmall, paddingHorizontal: SIZES.small, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, flex: 1, borderColor: COLORS.white500, borderWidth: 1}}>
        <Feather name="arrow-down-circle" size={18} color={COLORS.blue500} />
        <Text style={{color: COLORS.blue500, fontSize: SIZES.medium, fontWeight: 400, marginLeft:6}}>Download</Text>
        </Pressable>
        <Pressable style={{backgroundColor: COLORS.blue500, paddingVertical: SIZES.xSmall, paddingHorizontal: SIZES.small, flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 10, flex: 1, borderColor: COLORS.white500, borderWidth: 1}}>
        <Feather name="share-2" size={18} color={COLORS.white500} />
        <Text style={{color: COLORS.white500, fontSize: SIZES.medium, fontWeight: 400, marginLeft:6}}>Share</Text>
        </Pressable>
      </View>
      </View>
      </ImageBackground>
    </View>
  )
}

export default ProfileShare