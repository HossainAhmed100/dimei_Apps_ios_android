import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
} from "react-native";
import { COLORS, SIZES } from '../constants';
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { KeyboardAvoidingView } from "react-native";
import { ActivityIndicator } from "react-native";

const ResetPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
    console.log(email, password)
    setLoading(true);
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response);
    } catch (err) {
        console.log(err.code);
            alert(err.code);
    } finally {
        setLoading(false);
    }
};

    return (
    <View style={styles.container}>
        <View>
        <View>
            <View
            style={{
                marginBottom: 20,
                flexDirection: "column",
                gap: SIZES.xSmall
            }}
            >
            <Text style={{color: COLORS.slate500, fontSize: SIZES.xLarge, fontWeight: 600}}>Reset password</Text>
            <Text style={{color: COLORS.slate300, fontSize: SIZES.medium}}>Please type password</Text>
            </View>
        </View>
        <KeyboardAvoidingView behavior='padding'>
        <View style={{ gap: SIZES.medium }}>
            <View>
            <Text style={{color: COLORS.slate500}}>Old Password *</Text>
            <TextInput
                style={styles.inputBox}
                placeholder="Old Password"
                autoCapitalize='none' 
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            </View>
            <View>
            <Text style={{color: COLORS.slate500}}>New Password *</Text>
            <TextInput
                style={styles.inputBox}
                placeholder="New Password"
                autoCapitalize='none' 
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            </View>
            <View>
            <Text style={{color: COLORS.slate500}}>Confirm Password *</Text>
            <TextInput
                style={styles.inputBox}
                placeholder="Confirm Password"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            </View>
        </View>
        </KeyboardAvoidingView>
        <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 60 }}>
        {
        loading ? <ActivityIndicator size="large" color="#0000ff"/> : <Pressable
        onPress={() => signIn()}
        style={styles.loginBtn}
        >
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}>
            Reset Password
        </Text>
        </Pressable>
    }
            
       
        </View>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.white500,
    paddingVertical: SIZES.large
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

export default ResetPassword;