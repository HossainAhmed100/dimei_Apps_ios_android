import {View,Text,StyleSheet,TextInput,Pressable,Image,TouchableOpacity, ScrollView} from "react-native";
import React, { useState } from "react";
import { icons, COLORS, SIZES } from '../../constants';
import { ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {fullName: "", userEmail: "", userPassword: "", userPhone: "", nameinBangla:""},})
  const onSubmit = async (data) => {
    const userEmail = data.userEmail;
    const userName = data.fullName;
    const nameinBangla = data.nameinBangla;
    const userPhone = data.userPhone;
    const userPassword = data.userPassword;
    const userInfo = {userEmail, userName, userPhone, userPassword, nameinBangla};
    navigation.navigate('NidPhotoUpload', {userInfo})
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <View style={{ textAlign: "center" }}>
          <Text style={{fontWeight: "bold",fontSize: SIZES.xxLarge,}}>Register now</Text>
          <Text style={{color: "gray",marginBottom: SIZES.medium}}>Create a new Account</Text>
        </View>
        <View style={{ gap: SIZES.medium }}>
          <View>
            <Text>Name *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter your full name" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="fullName"
            />
          {errors.fullName && <Text style={{color: COLORS.red500}}>Full name is required.</Text>}
          </View>
          <View>
            <Text>Name in Bangla *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter your full name" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="nameinBangla"
            />
          {errors.nameinBangla && <Text style={{color: COLORS.red500}}>Full name is required.</Text>}
          </View>
          <View>
            <Text>Email address *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter your email address" onBlur={onBlur} onChangeText={onChange} value={value}/>
              )}
              name="userEmail"
            />
          {errors.userEmail && <Text style={{color: COLORS.red500}}>Email is required.</Text>}
          </View>
          <View>
            <Text>Phone *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter your phone number" onBlur={onBlur} onChangeText={onChange}value={value}/>
              )}
              name="userPhone"
            />
          {errors.userPhone && <Text style={{color: COLORS.red500}}>Phone Number is required.</Text>}
          </View>
          <View>
            <Text>Password *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="must be 8 characters" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="userPassword"
            />
          {errors.userPassword && <Text style={{color: COLORS.red500}}>Password is required.</Text>}
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 30 }}>
        {
        loading ? <ActivityIndicator size="large" color="#0000ff"/> : 
        <TouchableOpacity activeOpacity={.7} onPress={handleSubmit(onSubmit)} style={styles.loginBtn}>
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}>Sign up</Text>
        </TouchableOpacity>
      }
        <View style={{flexDirection: "row",gap: SIZES.xSmall,justifyContent: "center",alignItems: "center",paddingVertical: SIZES.xSmall - 2,}}>
            <View style={{borderWidth: 0.5,borderColor: COLORS.slate200,borderStyle: "solid",flex: 1}}></View>
            <Text style={{ color: COLORS.slate300 }}>Or Login with</Text>
            <View style={{borderWidth: 0.5,borderColor: COLORS.slate200,borderStyle: "solid",flex: 1}}></View>
          </View>
          <Pressable onPress={() => navigation.navigate("Register")} style={styles.googleLoginBtn} >
            <Image source={icons.google} style={{ width: SIZES.medium, height: SIZES.medium }} />
            <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: COLORS.slate500 }}> Sign up with Google </Text>
          </Pressable>
        </View>
        <View style={{marginTop: SIZES.medium,flexDirection: "row",alignItems: "center",justifyContent: "center",gap: 4, paddingBottom: 20}}>
          <Text style={{ fontSize: SIZES.small, color: COLORS.slate300 }}>Alredy have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{color:  COLORS.slate500,fontWeight: 700,textDecorationLine: "underline",}}>Login now</Text>
          </TouchableOpacity>
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
  googleLoginBtn: {
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

export default Register;
