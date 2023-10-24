import { Image, StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext } from "react";  
import { COLORS, SIZES } from '../constants';
import { KeyboardAvoidingView } from "react-native";
import { ActivityIndicator } from "react-native";
import { CheckBox } from '@rneui/themed';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthProvider';
import { format } from 'date-fns';


const TransferDevice =  ({navigation, route}) => {
    const deviceId = route.params.deviceId ;
    const [checked, setChecked] = React.useState(true);
    const toggleCheckbox = () => setChecked(!checked);
    const todyDate = new Date().toISOString();
    const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {reciverAccountEmail: "", transferDate: format(new Date(todyDate), 'yyyy-MM-dd')}});
    const { user } = useContext(AuthContext);

    const { isLoading, isError, data: myDevice = [], error } = useQuery({ 
        queryKey: ['myDevice', user?.userEmail, deviceId], 
        queryFn: async () => {
        const res = await axios.get(`http://192.168.1.2:5000/getSingleDevice/${deviceId}`);
        return res.data;
        } 
    })

    const { data: itemQuantity = [] } = useQuery({ 
        queryKey: ['itemQuantity', user?.userEmail], 
        queryFn: async () => {
          const res = await axios.get(`http://192.168.1.2:5000/useritemQuantity/${user?.userEmail}`);
          return res.data;
        } 
      })

    const onSubmit = async (data) => {
    const ownerEmail = user?.userEmail;
    const ownerPicture = user?.userProfilePic;
    const ownerName = user?.userName;
    const reciverAccountEmail = data.reciverAccountEmail;
    const transferDate = todyDate;
    const deviceModelName =  myDevice?.modelName;
    const brand = myDevice?.brand;
    const colorVarient = myDevice?.colorVarient;
    const ram = myDevice?.ram;
    const storage = myDevice?.storage;
    const devicePicture = myDevice?.devicePicture;
    const deviceStatus = "OwnerShip Transfer";
    const secretCode = Math.floor(100000 + Math.random() * 900000);
    const transferDeviceInfo = {ownerEmail, ownerName, ownerPicture, reciverAccountEmail, transferDate, deviceModelName, brand, colorVarient, ram, storage, devicePicture, deviceStatus, secretCode, deviceId}
    const infoData = {deviceId, secretCode}
    if(user){
    await axios.put(`http://192.168.1.2:5000/devicetransferStatusUpdate/`,{infoData})
    .then((res) => {
    if (res.data.modifiedCount === 1){
        try{
            axios.post(`http://192.168.1.2:5000/reciveTransferDevice/`, {transferDeviceInfo})
            .then((res) => {
            if (res.data.acknowledged){
            navigation.navigate('Home')
            alert("Please Copy Your Device Transfer Security Code and Share Your Reciver")
            }
        })
        }catch (err) {
            console.log(err);
            alert('Device Added Feild');
        } finally {}
    }})
    }
    }



  return (
    <ScrollView style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
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
       
        <KeyboardAvoidingView behavior='padding'>
        <View style={{ gap: SIZES.medium }}>
            <View>
            <Text style={{color: COLORS.slate500}}>Device Receiver Account Email *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
              <TextInput  style={styles.inputBox} onBlur={onBlur} onChangeText={onChange} value={value} placeholder='Type Recevier Acount Email'/>)}
              name="reciverAccountEmail"
            />
            {errors.reciverAccountEmail && <Text style={{color: COLORS.red500}}>Receiver Account Email is required</Text>}
            </View>
            <View>
            <Text style={{color: COLORS.slate500}}>Date</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
              <TextInput  style={styles.inputBox} onBlur={onBlur} onChangeText={onChange} value={value} /> )}
              name="transferDate"
            />
            {errors.transferDate && <Text style={{color: COLORS.red500}}>Date is required</Text>}
            </View>
            <View>
                <Text style={{color: COLORS.slate500, marginBottom: SIZES.xSmall}}>Device Transfer Fee</Text>
                <View style={{backgroundColor:  COLORS.slate100,  borderRadius: SIZES.small}}>
                <View style={{paddingHorizontal: SIZES.small, borderBottomColor: COLORS.slate200, borderBottomWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
                <Text style={{color: COLORS.slate500}}>Total Token</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>{itemQuantity?.tokenQuantity} Token</Text>
                </View>
                <View style={{paddingHorizontal: SIZES.small, borderBottomColor: COLORS.slate200, borderBottomWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
                <Text style={{color: COLORS.slate500}}>Transfer Fee</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>0 Token</Text>
                </View>
                <View style={{paddingHorizontal: SIZES.small, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
                <Text style={{color: COLORS.slate500}}>Available Token</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>{user?.tokenQuantity && itemQuantity?.tokenQuantity - 0} Token</Text>
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
        isLoading ? 
        <Pressable style={styles.loginBtn}> 
        <ActivityIndicator size="large" color={COLORS.white500}/> 
        </Pressable> : 
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn} >
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm to Transfer</Text>
        </TouchableOpacity>
        }
            
            
       
        </View>
        </View>
    </View>
    </ScrollView>
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
        disableBtn: {
        backgroundColor: COLORS.blue500,
        width: "100%",
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.small,
        alignItems: "center",
        justifyContent: "center",
        borderColor: COLORS.blue500,
        borderWidth: 1,
        opacity: 0.5,
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
