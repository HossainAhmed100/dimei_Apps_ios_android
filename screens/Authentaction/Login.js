import React, { useContext, useState } from "react";
import {View,Text,StyleSheet,TextInput,Pressable,Image,TouchableOpacity,} from "react-native";
import { icons, COLORS, SIZES } from '../../constants';
import { useForm, Controller } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "../../context/AuthProvider";

const Login = ({ navigation }) => {
  const { userLogin, signinGooglePopup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {userEmail: "", userPassword: ""},})

  const onSubmit = async (data) => {
    setLoading(true)
    const email = data.userEmail;
    const password = data.userPassword;
    userLogin(email, password)
    .then(() => {
      alert("Login Successfull");
      setLoading(false)
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
      setLoading(false)
    });
  }

  return (
    <View style={styles.container}>
   
        <View style={{ textAlign: "center" }}>
          <View style={{marginBottom: 40,flexDirection: "column",alignItems: "center",gap: SIZES.xSmall}}>
            <Text style={{color: COLORS.slate500, fontSize: SIZES.xLarge, fontWeight: 600}}>Welcoeme to back</Text>
            <Text style={{color: COLORS.slate300, fontSize: SIZES.medium}}>Please login now</Text>
          </View>
        </View>
        <View style={{ gap: SIZES.medium }}>
        <View>
            <Text>Email address *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter your email address" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="userEmail"
            />
          {errors.userEmail && <Text style={{color: COLORS.red500}}>Email is required.</Text>}
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
        <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 20 }}>
        {
          loading ? <ActivityIndicator size="large" color="#0000ff"/> : 
          <Pressable onPress={handleSubmit(onSubmit)}  style={styles.loginBtn} >
            <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}>Log in</Text>
          </Pressable>
        }
          
          <View style={{flexDirection: "row",gap: SIZES.xSmall,justifyContent: "center",alignItems: "center",paddingVertical: SIZES.xSmall - 2,}}>
           <View style={{borderWidth: 0.5,borderColor: COLORS.slate200,borderStyle: "solid",flex: 1}}></View>
            <Text style={{ color: COLORS.slate300 }}>Or Login with</Text>
            <View style={{borderWidth: 0.5,borderColor: COLORS.slate200,borderStyle: "solid",flex: 1}}></View>
          </View>
          <Pressable onPress={() => signinGooglePopup()} style={styles.googleLoginBtn} >
            <Image source={icons.google} style={{ width: SIZES.medium, height: SIZES.medium }} />
            <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: COLORS.slate500 }}>Log in with Google</Text>
          </Pressable>
        </View>
        <View style={{marginTop: SIZES.medium,flexDirection: "row",alignItems: "center",justifyContent: "center",gap: 4,}}>
          <Text style={{ fontSize: SIZES.small, color: COLORS.slate300 }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{color:  COLORS.slate500,fontWeight: 700,textDecorationLine: "underline",}}>Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white500,
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

export default Login;
