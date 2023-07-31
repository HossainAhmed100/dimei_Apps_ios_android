import { Image, StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from "react";  
import { COLORS, SIZES, images } from '../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { KeyboardAvoidingView } from "react-native";
import { ActivityIndicator } from "react-native";
import { CheckBox } from '@rneui/themed';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';

const TransferDevice =  ({navigation, route}) => {
    const deviceId = route.params.deviceId ;
    const [checked, setChecked] = React.useState(true);
    const toggleCheckbox = () => setChecked(!checked);
    const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {reciverAccountId: "", transferDate: "7/26/2023"}})
    const [loading, setLoading] = useState(false);
    const [myDevice, setMyDevice] = useState('');
    const [user, setUser] = useState(null);
    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
        if(user){
            const email = user.email;
            axios.get(`http://192.168.1.4:5000/signleUser/${email}`)
            .then((res) => {
            setUser(res.data)
            loadData(email)
            })    
        }
        setLoading(false)
        })
    }, [])
    const loadData = async (email) => {
        setLoading(true);
    await axios.get(`http://192.168.1.4:5000/getSingleDevice/${deviceId}`)
        .then(response => {
            if (response.data) {
            setMyDevice(response.data);
            setLoading(false)
            } else {
            console.log('No Device found in response');
            }
        })
        .catch(error => {
            console.log(error);
        });
        };

        const onSubmit = (data) => {
            console.log(data)
        }
  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
        <View style={{padding: SIZES.small}}>
            <View style={styles.cardContainer}>
                {myDevice?.devicePicture && <Image source={{uri: myDevice?.devicePicture}} resizeMode="contain" style={{ borderRadius: 4, marginRight: 10, width: 100, height: 100}}/>} 
                <View>
                    <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>{myDevice?.modelName}</Text>
                    <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Ram : {myDevice?.ram}</Text>
                    <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Storage : {myDevice?.storage}</Text>
                    <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Brand : {myDevice?.brand}</Text>
                    <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Color : {myDevice?.colorVarient}</Text>
                </View>
            </View>
        <View style={styles.container}>
        <View>
        <KeyboardAvoidingView behavior='padding'>
        <View style={{ gap: SIZES.medium }}>
            <View style={{marginTop: 10}}>
            <Text style={{color: COLORS.slate500}}>Device Receiver Account ID *</Text>
            <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
                maxLength: 10,
                minLength: 10
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput 
                style={styles.searchInput} 
                placeholder="Write Device receiver Account ID"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                />
                )}
                name="reciverAccountId"
            />
            <TouchableOpacity><MaterialCommunityIcons name="line-scan" size={24} color={COLORS.slate600} /></TouchableOpacity>
            </View>
          {errors.reciverAccountId && <Text style={{color: COLORS.red500}}>Receiver Account ID is required</Text>}
                
            </View>
            </View>
            <View>
            <Text style={{color: COLORS.slate500}}>Date</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput 
                style={styles.inputBox}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                />
                )}
                name="transferDate"
            />
            {errors.transferDate && <Text style={{color: COLORS.red500}}>Date is required</Text>}
            
            </View>
            <View>
            <View>
                <Text style={{color: COLORS.slate500, marginBottom: SIZES.xSmall}}>Device Transfer Fee</Text>
                <View style={{backgroundColor:  COLORS.slate100,  borderRadius: SIZES.small}}>
                <View style={{paddingHorizontal: SIZES.small, borderBottomColor: COLORS.slate200, borderBottomWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
                <Text style={{color: COLORS.slate500}}>Total Token</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>{user?.tokenQuantity} Token</Text>
                </View>
                <View style={{paddingHorizontal: SIZES.small, borderBottomColor: COLORS.slate200, borderBottomWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
                <Text style={{color: COLORS.slate500}}>Trnsfer Fee</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>1 Token</Text>
                </View>
                <View style={{paddingHorizontal: SIZES.small, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
                <Text style={{color: COLORS.slate500}}>Available Token</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>{user?.tokenQuantity && user?.tokenQuantity - 1} Token</Text>
                </View>
                </View>
            </View>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
             <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor={COLORS.blue500}
         />
            <Text style={{marginLeft: 4}}>I aggre with <Text style={{color: COLORS.blue500}}>terms</Text> and <Text style={{color: COLORS.blue500}}>condition</Text></Text>
            </View>
        </View>
        </KeyboardAvoidingView>
        <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 30 }}>
        {
        loading ? <Pressable style={styles.loginBtn}> 
        <ActivityIndicator size="large" color={COLORS.white500}/> 
        </Pressable> : <Pressable onPress={handleSubmit(onSubmit)} style={styles.loginBtn} >
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm to Transfer</Text>
        </Pressable>
        }
            
       
        </View>
        </View>
    </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer:{
        borderWidth: 1, 
        borderColor: COLORS.slate100, 
        borderRadius: SIZES.xSmall, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "flex-start", 
        marginBottom: SIZES.xSmall, 
        padding: 10
    },
    searchContainer: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: COLORS.white500,
        justifyContent: "space-between",
        marginTop: 6,
    },
    searchWrapper: {
        borderWidth: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        marginRight: 10,
        borderColor: COLORS.slate200,
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.xSmall,
    },
    container: {
        backgroundColor: COLORS.white500,
        },
        inputBox: {
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.xSmall,
        marginTop: 6,
        width: "100%",
        borderWidth: 1,
        borderColor: COLORS.slate200,
        },
        referenceInputBox: {
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.xSmall,
        marginTop: 6,
        width: 300,
        borderWidth: 1,
        borderColor: COLORS.slate200,
        },
        loginBtn: {
        backgroundColor: COLORS.blue500,
        width: "100%",
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

export default TransferDevice
