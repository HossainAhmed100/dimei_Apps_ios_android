import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { COLORS, SIZES, images } from '../../constants';
import { TextInput } from 'react-native';
import { Divider } from '@rneui/base';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthProvider';

const EmailVerify = () => {
  const { user, userLoding } = useContext(AuthContext);
  return (
    <View style={{flex: 1, paddingHorizontal: SIZES.medium, backgroundColor: COLORS.white500}}>
      <View style={{paddingVertical: 20, gap: 20,}}>
        <View style={{alignItems: "center", width: "100%"}}>
        <Image source={images.emailForm} style={{width: 200, height: 200, resizeMode: "cover", }}/>
        </View>
        <View style={{gap: 8, alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontWeight: 600, color: COLORS.slate500, fontSize: 22}}>Verify Your Email Address</Text>
        <View style={{gap: 3, alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontWeight: 400, color: COLORS.slate300, fontSize: 14, }}>Enter your email address in order to</Text>
        <Text style={{fontWeight: 400, color: COLORS.slate300, fontSize: 14, }}>send you your OTP security code.</Text>
        </View>
        </View>
        <View style={styles.card}>
        <Text style={{color: COLORS.slate300, paddingVertical: 5, paddingHorizontal: 2}}>Email Addres</Text>
        <View style={styles.phoneNumberInput}>
          <MaterialIcons name="email" size={18} color={COLORS.slate300} />
          <Divider orientation="vertical" color={COLORS.slate500}/>
          <TextInput placeholder='Enter your number' value={user?.userEmail} style={{width: "100%", color: COLORS.slate300}}/>
        </View>
        <TouchableOpacity style={{backgroundColor: COLORS.blue500, paddingVertical: 15, alignItems: "center", justifyContent: "center", marginVertical: 15, borderRadius: 10}}>
          <Text style={{color: COLORS.white500, fontSize: 16, fontWeight: 500}}>Next Step</Text>
        </TouchableOpacity>
        <View style={{flexDirection: "row", alignItems: "center", gap: 5, justifyContent: "center", paddingVertical: 6}}>
        <Text style={{fontSize: 14, color: COLORS.slate300}}>i accept the</Text>
        <Text style={{fontSize: 14, color: COLORS.blue500, fontWeight: 500}}>Term and Conditions</Text>
        </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  phoneNumberInput: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  card: {
    backgroundColor: COLORS.white500,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.slate100,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 10,

    shadowColor: COLORS.slate200,
    shadowOffset: {width: -4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20,
  }
})


export default EmailVerify