import React, { useContext, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { useForm, Controller } from "react-hook-form";
import { COLORS, SIZES } from '../constants';

const VerifyDeviceAcceft = ({navigation, route})  => {
    const transferDeviceId = route.params.transferDeviceId;
    const [acceptStatus, setAcceptStatus] = useState("");
    const { user, userLoding } = useContext(AuthContext);
    const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {deviceSecrentCode: ""}})

    const { isLoading, isError, data: accevtDevice = [], error } = useQuery({ 
        queryKey: ['accevtDevice', transferDeviceId], 
        queryFn: async () => {
        const res = await axios.get(`http://192.168.1.7:5000/getTransferDeviceDetails/${transferDeviceId}`);
        return res.data;
        } 
    })

    
    const onSubmit = async (data) => {
        const secretCode = data.deviceSecrentCode;
        const deviceId = accevtDevice?.deviceId;
        const devicereciverEmail = user?.userEmail;
        const deviceTestInfo = {secretCode, deviceId, devicereciverEmail, transferDeviceId};
        if(user){
        await axios.put(`http://192.168.1.7:5000/devicesecretCodetst/`, {deviceTestInfo})
        .then((res) => {
            if(res.data.transferSuccess){
                navigation.navigate('Home')
                alert("Device Accept Succesfully!")
            }else{
                setAcceptStatus("Secret Code is wrong!")
            }
        })
        }
     }
  return (
    <View style={{padding: SIZES.medium, backgroundColor: COLORS.white500, minHeight: "100%"}}>
        <View View style={styles.cardContainer}>
            {accevtDevice?.devicePicture && <Image source={{uri: accevtDevice?.devicePicture}} resizeMode="contain" style={{ borderRadius: 4, marginRight: 10, width: 100, height: 100}}/>} 
            <View>
                <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>{accevtDevice?.modelName}</Text>
                <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Ram : {accevtDevice?.ram}</Text>
                <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Storage : {accevtDevice?.storage}</Text>
                <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Brand : {accevtDevice?.brand}</Text>
                <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Color : {accevtDevice?.colorVarient}</Text>
            </View>
        </View>
        <View>
        <Text style={{color: COLORS.slate500}}>Write Device Transfer Secret Code *</Text>
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
            name="deviceSecrentCode"
        />
        {errors.deviceSecrentCode && <Text style={{color: COLORS.red500}}>Device Transfer Secret Code is required</Text>}
        {acceptStatus && <Text style={{color: COLORS.red500}}>{acceptStatus}</Text>}
        </View>
        <View>
            <Text style={{color: COLORS.slate500, marginBottom: SIZES.xSmall}}>Device Transfer Fee</Text>
            <View style={{backgroundColor:  COLORS.slate100,  borderRadius: SIZES.small}}>
            <View style={{paddingHorizontal: SIZES.small, borderBottomColor: COLORS.slate200, borderBottomWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
            <Text style={{color: COLORS.slate500}}>Total Token</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>{user?.tokenQuantity} Token</Text>
            </View>
            <View style={{paddingHorizontal: SIZES.small, borderBottomColor: COLORS.slate200, borderBottomWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
            <Text style={{color: COLORS.slate500}}>Transfer Fee</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>1 Token</Text>
            </View>
            <View style={{paddingHorizontal: SIZES.small, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
            <Text style={{color: COLORS.slate500}}>Available Token</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>{user?.tokenQuantity && user?.tokenQuantity - 1} Token</Text>
            </View>
            </View>
        </View>
        <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 30 }}>
        {
        isLoading ? <Pressable style={styles.loginBtn}> 
        <ActivityIndicator size="large" color={COLORS.white500}/> 
        </Pressable> : <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn} >
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm to Transfer</Text>
        </TouchableOpacity>
        }
            
       
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

export default VerifyDeviceAcceft;