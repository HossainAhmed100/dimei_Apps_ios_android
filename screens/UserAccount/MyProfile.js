import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Divider } from '@rneui/base';
import { AuthContext } from '../../context/AuthProvider';
import { COLORS, SIZES } from '../../constants';

const MyProfile = ({ navigation })  => {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("")
  const [address, setAddress] = useState("")
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: COLORS.white500, flex: 1, minHeight: "100%"}}>
      <View style={{ paddingVertical: 8, paddingHorizontal: 15 }}>
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: SIZES.xSmall}}>
        {user?.userProfilePic ? <Image source={{uri: user?.userProfilePic}} style={styles.profilePic}/> :
         <Image source={{uri: "https://i.ibb.co/Kb9kTkN/Screenshot-2023-08-26-185633.png"}} style={styles.profilePic}/>}
        <View style={styles.profileCameraBtn}>
        <Entypo name="camera" size={16} color={COLORS.white500} />
        </View>
        </View>
        <View style={{ gap: SIZES.medium, alignItems: "flex-start", width: "100%" }}>
          <View style={{width: "100%"}}>
            <Text style={{color: COLORS.slate500}}>Nik Name</Text>
            <TextInput style={styles.inputBox} value={user?.userName} />
          </View>
          <View style={{width: "100%"}}>
            <Text style={{color: COLORS.slate500}}>Original Name</Text>
            <TextInput style={styles.inputBox} value={user?.userName} editable={false} />
          </View>
          <View style={{width: "100%"}}>
            <Text style={{color: COLORS.slate500}}>Email</Text>
            <TextInput style={styles.inputBox} value={user?.userEmail} editable={false} />
          </View>
          <View style={{width: "100%"}}>
            <Text style={{color: COLORS.slate500}}>Phone</Text>
            <TextInput style={styles.inputBox} value={user?.userPhone} editable={false} />
          </View>
          <View style={{width: "100%"}}>
            <Text style={{color: COLORS.slate500}}>Address</Text>
            <TextInput multiline={true} style={styles.inputBox} onChangeText={(text) => setAddress(text)} value={user?.userAddress} editable={false} />
          </View>
        </View>
        <View style={{backgroundColor: COLORS.slate100,borderRadius: 10,marginVertical: 10, width: "100%"}}>
          <TouchableOpacity onPress={() => navigation.navigate('KYCPreview')} style={styles.shortItemcontainer}>
            <View style={styles.verifyList}>
              {user?.verifyedStatus?.kycverifyed ? <MaterialCommunityIcons name="check-decagram" size={20} color={COLORS.green500} /> : 
              <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.red500} />}
              <Text style={styles.verifyListText}>KYC Verifyed</Text>
            </View> 
            <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <Divider color={COLORS.slate200}/>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')} style={styles.shortItemcontainer}>
            <View style={styles.verifyList}>
              {user?.verifyedStatus?.addressverifyed ? <MaterialCommunityIcons name="check-decagram" size={20} color={COLORS.green500} /> : 
                <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.red500} />}
                <Text style={styles.verifyListText}>Address Verifyed</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <Divider color={COLORS.slate200}/>
          <TouchableOpacity onPress={() => navigation.navigate('PhoneVerify')} style={styles.shortItemcontainer}>
            <View style={styles.verifyList}>
              {user?.verifyedStatus?.phoneverifyed ? 
                <MaterialCommunityIcons name="check-decagram" size={20} color={COLORS.green500} /> : 
                <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.red500} />}
                <Text style={styles.verifyListText}>Phone Verifyed</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <Divider color={COLORS.slate200}/>
          <TouchableOpacity onPress={() => navigation.navigate('EmailVerify')} style={styles.shortItemcontainer}>
            <View style={styles.verifyList}>
              {user?.verifyedStatus?.emailverifyed ? <MaterialCommunityIcons name="check-decagram" size={20} color={COLORS.green500} /> : 
              <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.red500} />}
              <Text style={styles.verifyListText}>Email Verifyed</Text>
            </View>
            <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  shortItemcontainer: {
    paddingVertical: 13,paddingHorizontal: 15,
    flexDirection: "row", alignItems: "center", gap: 10,justifyContent: "space-between",
  },
  verifyList:{
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  verifyListText:{
    fontSize: 14, 
    color: COLORS.slate300,
  },
  inputBox: {
    width: "100%",
    marginTop: 6,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.slate200,
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
  },
  profilePic:{
    width: 100, 
    height: 100, 
    borderRadius: 50
  },
  profileCameraBtn:{
    width: 30, 
    bottom: 0,
    height: 30, 
    borderRadius: 50, 
    alignItems: "center", 
    position: "absolute", 
    justifyContent: "center", 
    backgroundColor: COLORS.slate500, 
  },

});

export default MyProfile