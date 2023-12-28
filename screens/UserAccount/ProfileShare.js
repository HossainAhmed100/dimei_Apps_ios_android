import { View, Text, Image, Pressable,ImageBackground, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { COLORS, SIZES, images } from '../../constants';
import { Feather } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from '../../context/AuthProvider';
const ProfileShare = () => {
  const { user } = useContext(AuthContext);

  return (
    <View style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
      <ImageBackground source={images.patterns} style={{flex: 1, resizeMode: 'cover', justifyContent: "center"}}>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <View>
      <View style={styles.qrCodeContainer}>
      { user?.userProfilePic && 
      <View style={styles.userProfile}>
      <Image source={{uri: user?.userProfilePic}} style={{width: 80, height: 80, resizeMode: "cover"}}/>
      </View>
      }
      <Text style={{marginTop: SIZES.medium, fontSize: SIZES.medium, fontWeight: 600, color: COLORS.slate500}}>{user?.userName}</Text>
        <View style={styles.userIdCopyBtn}>
        <Text style={styles.actionBtnText(COLORS.white500)}>ID : {user?.userAccountId}</Text>
        <Pressable>
        <Feather name="copy" size={18} color={COLORS.white500} />
        </Pressable>
        </View>
        { user?.userAccountId && <View style={{marginBottom: SIZES.medium, paddingVertical: SIZES.small}}>
        <QRCode value={"1654654321324"} size={200}/>
        </View>}
      </View>
      <View style={{paddingVertical: SIZES.medium, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10}}>
        <Pressable style={styles.actionBtn(COLORS.white500)}>
        <Feather name="arrow-down-circle" size={18} color={COLORS.blue500} />
        <Text style={styles.actionBtnText(COLORS.blue500)}>Download</Text>
        </Pressable>
        <Pressable style={styles.actionBtn(COLORS.blue500)}>
        <Feather name="share-2" size={18} color={COLORS.white500} />
        <Text style={styles.actionBtnText(COLORS.white500)}>Share</Text>
        </Pressable>
      </View>
      </View>
      </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  userProfile:{
    top: -60,
    borderWidth: 4, 
    borderRadius: 100, 
    overflow: "hidden", 
    position: "absolute", 
    borderColor: COLORS.white500, 
  },
  actionBtn: (bgColor) => ({
    flex: 1, 
    borderWidth: 1,
    borderRadius: 10, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    borderColor: COLORS.white500, 
    paddingVertical: SIZES.xSmall, 
    paddingHorizontal: SIZES.small, 
    backgroundColor: bgColor,
  }),
  actionBtnText:(textColor) => ({
    marginLeft:6,
    fontWeight: 400, 
    color: textColor, 
    fontSize: SIZES.medium, 
  }),
  qrCodeContainer:{
    marginTop: 50,
    alignItems: "center", 
    paddingHorizontal: 40, 
    justifyContent: "center",
    borderRadius: SIZES.small, 
    paddingVertical: SIZES.medium, 
    backgroundColor: COLORS.white500, 
  },
  userIdCopyBtn:{
    borderRadius: 6, 
    alignItems: "center", 
    flexDirection: "row", 
    justifyContent: "center", 
    marginVertical: SIZES.small,
    backgroundColor: COLORS.blue500, 
    paddingHorizontal: 10,
    gap: 10,
    paddingVertical: 6
  },
})

export default ProfileShare