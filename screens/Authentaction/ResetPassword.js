import {View,Text,StyleSheet,TextInput,TouchableOpacity, ScrollView} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from '../../constants';
import { ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";

const ResetPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {currentPassword: "", newPassword: "", confirmPassword: ""},})
  const onSubmit = async (data) => {
    console.log("🚀 ~ file: ResetPassword.js:11 ~ onSubmit ~ data:", data)
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <View style={{ textAlign: "center" }}>
          <Text style={{fontWeight: "bold",fontSize: SIZES.xxLarge,}}>Reset Password</Text>
          <Text style={{color: "gray",marginBottom: SIZES.medium}}>Please Type your password</Text>
        </View>
        <View style={{ gap: SIZES.medium }}>
          <View>
            <Text>Current Password *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter your current password" onBlur={onBlur} onChangeText={onChange} value={value}/>
              )}
              name="currentPassword"
            />
          {errors.userEmail && <Text style={{color: COLORS.red500}}>Password is required.</Text>}
          </View>
          <View>
            <Text>New Password *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Type new password" onBlur={onBlur} onChangeText={onChange}value={value}/>
              )}
              name="newPassword"
            />
          {errors.userPhone && <Text style={{color: COLORS.red500}}>Password is required.</Text>}
          </View>
          <View>
            <Text>Confirm Password *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Type Confirm Password" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="confirmPassword"
            />
          {errors.userPassword && <Text style={{color: COLORS.red500}}>Password is required.</Text>}
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 30 }}>
        {
        loading ? 
        <ActivityIndicator size="large" color="#0000ff"/> : 
        <TouchableOpacity activeOpacity={.7} onPress={handleSubmit(onSubmit)} style={styles.loginBtn}>
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}>Confirm</Text>
        </TouchableOpacity>
        }
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white500,
    paddingBottom: 20,
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
  loginBtn: {
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
});

export default ResetPassword;
