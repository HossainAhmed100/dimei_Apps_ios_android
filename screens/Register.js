import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { icons, COLORS, SIZES } from '../constants';

const Register = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={{ textAlign: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: SIZES.xxLarge,
            }}
          >
            Register now
          </Text>
          <Text
            style={{
              color: "gray",
              marginBottom: SIZES.medium
            }}
          >
            Create a new Account
          </Text>
        </View>
        <View style={{ gap: SIZES.medium }}>
          <View>
            <Text>Name *</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter your full name"
            />
          </View>
          <View>
            <Text>Email address *</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter your email address"
            />
          </View>
          <View>
            <Text>Phone *</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter your phone number"
            />
          </View>
          <View>
            <Text>Password *</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="must be 8 characters"
            />
          </View>
        </View>
        <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 30 }}>
          <Pressable
            onPress={() => navigation.navigate("Home")}
            style={{
              backgroundColor: COLORS.blue500,
              width: 300,
              paddingVertical: SIZES.small,
              paddingHorizontal: SIZES.large,
              borderRadius: SIZES.small,
              alignItems: "center",
              justifyContent: "center",
              borderColor: COLORS.blue500,
              borderWidth: 1,
            }}
          >
            <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}>
              Sign up
            </Text>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              gap: SIZES.xSmall,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: SIZES.xSmall - 2,
            }}
          >
            <View
              style={{
                borderWidth: 0.5,
                borderColor: COLORS.slate200,
                borderStyle: "solid",
                width: "25%",
              }}
            ></View>
            <Text style={{ color: COLORS.slate300 }}>Or Login with</Text>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: COLORS.slate200,
                borderStyle: "solid",
                width: "25%",
              }}
            ></View>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{
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
            }}
          >
            <Image
              source={icons.google}
              style={{ width: SIZES.medium, height: SIZES.medium }}
            />
            <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: COLORS.slate500 }}>
              Sign up with Google
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            marginTop: SIZES.medium,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Text style={{ fontSize: SIZES.small, color: COLORS.slate300 }}>
           Alredy have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{
                color:  COLORS.slate500,
                fontWeight: 700,
                textDecorationLine: "underline",
              }}
            >
              Login now
            </Text>
          </TouchableOpacity>
        </View>
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
});

export default Register;
