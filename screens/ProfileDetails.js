import React, { useContext } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { Entypo, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthProvider';
import { Divider } from '@rneui/base';

const ProfileDetails = ({ navigation })  => {
  const { user, userLoding } = useContext(AuthContext);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: COLORS.white500, flex: 1, minHeight: "100%"}}>
      <View style={{ paddingVertical: 8, paddingHorizontal: 15 }}>
      {!user?.verifyedStatus?.kycverifyed && 
        <View style={{padding: 10, marginVertical: 10, borderRadius: 6, backgroundColor: COLORS.red200, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <Text style={{color: COLORS.red500}}>Please Verify Your KYC</Text>
          <Feather name="alert-triangle" size={18} color={COLORS.red500} />
        </View>
        }
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: SIZES.xSmall}}>
        {user?.userProfilePic ? <Image source={{uri: user?.userProfilePic}} style={{width: 100, height: 100, borderRadius: 50}}/> : <Image source={require("../assets/images/profile.jpg")} style={{width: 100, height: 100, borderRadius: 50}}/>}
        <View style={{width: 30, height: 30, backgroundColor: COLORS.slate500, alignItems: "center", justifyContent: "center", position: "absolute", borderRadius: 50, bottom: 0}}>
        <Entypo name="camera" size={16} color={COLORS.white500} />
        </View>
        </View>
        <View style={{ gap: SIZES.medium, flex: 1, alignItems: "center", justifyContent: "center" }}>
            <View>
            <Text style={{color: COLORS.slate500}}>Nik Name</Text>
            <TextInput style={styles.inputBox} autoCapitalize='none'  onChangeText={(text) => setFirstName(text)} value={user?.userName} aria-disabled={false} />
            </View>
            <View>
            <Text style={{color: COLORS.slate500}}>Original Name</Text>
            <TextInput style={styles.inputBox}  autoCapitalize='none' onChangeText={(text) => setFirstName(text)} value={user?.userName} editable={false} />
            </View>
            <View>
            <Text style={{color: COLORS.slate500}}>Email</Text>
            <TextInput style={styles.inputBox} autoCapitalize='none'  onChangeText={(text) => setEmail(text)} value={user?.userEmail} editable={false} />
            </View>
            <View>
            <Text style={{color: COLORS.slate500}}>Phone</Text>
            <TextInput style={styles.inputBox} autoCapitalize='none'  onChangeText={(text) => setPhone(text)} value={user?.userPhone} editable={false} />
            </View>
            <View>
            <Text style={{color: COLORS.slate500}}>Address</Text>
            <TextInput multiline={true} style={styles.inputBox} autoCapitalize='none'  onChangeText={(text) => setAddress(text)} value={user?.userAddress} editable={false} />
            </View>
        </View>
        <View style={{backgroundColor: COLORS.slate100,borderRadius: 10,marginVertical: 10, width: "100%"}}>
          <TouchableOpacity onPress={() => navigation.navigate('KYCPreview')} style={{paddingVertical: 13,paddingHorizontal: 15,}}>
          <View style={{flexDirection: "row", alignItems: "center", gap: 10,justifyContent: "space-between",}}>
              <View style={styles.verifyList}>
              {user?.verifyedStatus?.kycverifyed ? <MaterialCommunityIcons name="check-decagram" size={20} color={COLORS.green500} /> : 
              <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.red500} />}
                <Text style={styles.verifyListText}>KYC Verifyed</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </TouchableOpacity>
          <Divider color={COLORS.slate200}/>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')} style={{paddingVertical: 13,paddingHorizontal: 15,}}>
          <View style={{flexDirection: "row", alignItems: "center", gap: 10,justifyContent: "space-between",}}>
              <View style={styles.verifyList}>
              {user?.verifyedStatus?.addressverifyed ? <MaterialCommunityIcons name="check-decagram" size={20} color={COLORS.green500} /> : 
              <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.red500} />}
                <Text style={styles.verifyListText}>Address Verifyed</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </TouchableOpacity>
          <Divider color={COLORS.slate200}/>
          <TouchableOpacity onPress={() => navigation.navigate('PhoneVerify')} style={{paddingVertical: 13,paddingHorizontal: 15,}}>
          <View style={{flexDirection: "row", alignItems: "center", gap: 10,justifyContent: "space-between",}}>
              <View style={styles.verifyList}>
              {user?.verifyedStatus?.phoneverifyed ? <MaterialCommunityIcons name="check-decagram" size={20} color={COLORS.green500} /> : 
                <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.red500} />}
                <Text style={styles.verifyListText}>Phone Verifyed</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </TouchableOpacity>
          <Divider color={COLORS.slate200}/>
          <TouchableOpacity onPress={() => navigation.navigate('EmailVerify')} style={{paddingVertical: 13,paddingHorizontal: 15,}}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 10,justifyContent: "space-between",}}>
              <View style={styles.verifyList}>
                {user?.verifyedStatus?.emailverifyed ? <MaterialCommunityIcons name="check-decagram" size={20} color={COLORS.green500} /> : 
                <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.red500} />}
                <Text style={styles.verifyListText}>Email Verifyed</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: COLORS.white500,
  },
  verifyList:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  verifyListText:{
    fontSize: 14, color: COLORS.slate300
  },
  inputBox: {
  paddingVertical: SIZES.xSmall,
  paddingHorizontal: SIZES.medium,
  borderRadius: SIZES.xSmall,
  marginTop: 6,
  width: 300,
  borderWidth: 1,
  borderColor: COLORS.slate200,
  },
  reuistBtn: {
  backgroundColor: COLORS.blue500,
  width: 300,
  paddingVertical: SIZES.small,
  paddingHorizontal: SIZES.large,
  borderRadius: SIZES.small,
  alignItems: "center",
  justifyContent: "center",
  borderColor: COLORS.blue500,
  borderWidth: 1,
  },
  kycViewBtn: {
  backgroundColor: COLORS.white500,
  width: 300,
  paddingVertical: SIZES.small,
  borderRadius: SIZES.xSmall,
  flexDirection: "row",
  gap: SIZES.small,
  alignItems: "center",
  justifyContent: "center",
  borderColor: COLORS.slate200,
  borderWidth: 1,
  }
});


export default ProfileDetails