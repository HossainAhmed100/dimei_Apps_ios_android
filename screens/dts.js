import { Image, StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useState, useRef } from "react";  
import axios from 'axios';
import { format } from 'date-fns';
import { shareAsync } from 'expo-sharing';
import { storage } from '../FirebaseConfig';
import { COLORS, SIZES } from '../constants';
import * as FileSystem from 'expo-file-system';
import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from '../context/AuthProvider';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import SignatureScreen from "react-native-signature-canvas";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const TransferDevice =  ({navigation, route}) => {
    const signatureRef = useRef();
    const deviceId = route.params.deviceId ;
    const { user } = useContext(AuthContext);
    const todyDate = new Date().toISOString();
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [signatureSign, setSignatureSign] = useState(null);
    const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {reciverAccountEmail: "", transferDate: format(new Date(todyDate), 'yyyy-MM-dd')}});

    const { isLoading, isError, data: myDevice = [], error } = useQuery({ 
        queryKey: ['myDevice', user?.userEmail, deviceId], 
        queryFn: async () => {
        const res = await axios.get(`http://192.168.0.154:5000/getSingleDevice/${deviceId}`);
        return res.data;
        } 
    })
    const toggleCheckbox = () => {setChecked(!checked)};
    const handUndo = () => {signatureRef.current.undo();};
    const handleRedo = () => {signatureRef.current.redo();};
    const handleOK = (signature) => {
        console.log("🚀 ~ file: TransferDevice.js:40 ~ handleOK ~ signature:", signature)
        setSignatureSign(signature); 
    }
    const handleReset = () => {signatureRef.current.clearSignature();};
    const imgWidth = "100%";
    const imgHeight = 200;
    const style = ` 
    .m-signature-pad--footer {display: none; margin: 0px;}
    body,html {width: ${imgWidth}px; height: ${imgHeight}px;}
    `;

    const onSubmit = async (data) => {
    setLoading(true);
    await signatureRef.current.readSignature();
    const ram = myDevice?.ram;
    const transferDate = todyDate;
    const brand = myDevice?.brand;
    const ownerName = user?.userName;
    const storage = myDevice?.storage;
    const ownerEmail = user?.userEmail;
    const deviceImei = myDevice?.deviceImei;
    const deviceStatus = "OwnerShip Transfer";
    const ownerPicture = user?.userProfilePic;
    const colorVarient = myDevice?.colorVarient;
    const deviceModelName =  myDevice?.modelName;
    const devicePicture = myDevice?.devicePicture;
    const reciverAccountEmail = data.reciverAccountEmail;
    const secretCode = Math.floor(100000 + Math.random() * 900000);
    setTimeout(() => {
    console.log("🚀 ~ file: TransferDevice.js:67 ~ onSubmit ~ ownerDrawSign:", signatureSign)
    if(signatureSign){
        const path = FileSystem.cacheDirectory + "sign.png";
        FileSystem.writeAsStringAsync(
           path,
           signatureSign.replace("data:image/png;base64,", ""),
           { encoding: FileSystem.EncodingType.Base64 }
        )
        .then(() => FileSystem.getInfoAsync(path))
        .then((datas) => {
           const {uri} = datas;
           const ownerSign = uri;
           console.log("🚀 ~ file: TransferDevice.js:79 ~ .then ~ ownerSign:", ownerSign)
           const transferDeviceObj = {ownerEmail, ownerName, ownerPicture, reciverAccountEmail, transferDate, deviceModelName, brand,   colorVarient, ram, storage, devicePicture, deviceStatus, secretCode, deviceId, deviceImei};
           const infoData = {deviceId, secretCode};
           tranferDeviceInToServer(transferDeviceObj, infoData, ownerSign);
        })
        .catch(console.error);
    }
    }, 3000);
    }

    const uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
        resolve(xhr.response);
        };
        xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });
    try{
        const fileRef = ref(storage, `image/image-${Date.now()}`);
        const result = await uploadBytes(fileRef, blob);
        // We're done with the blob, close and release it
        blob.close();
        return await getDownloadURL(fileRef);
    }catch(error) {
        alert(`Error 1 : ${error}`)
        console.log(error)
    }
    }

    const tranferDeviceInToServer = async (transferDeviceObj, infoData, ownerSign) => {
        console.log("🚀 ~ file: TransferDevice.js:114 ~ tranferDeviceInToServer ~ ownerSign:", ownerSign)
        setLoading(true);
        const ownerSignUrl = await uploadImageAsync(ownerSign);
        if(ownerSignUrl){
            console.log("🚀 ~ file: TransferDevice.js:118 ~ tranferDeviceInToServer ~ ownerSignUrl:", ownerSignUrl)
            const transferDeviceInfo = {...transferDeviceObj, ownerSignUrl};
        await axios.put(`http://192.168.0.154:5000/devicetransferStatusUpdate/`,{infoData})
        .then((res) => {
        if (res.data.modifiedCount === 1){
            try{
                console.log("🚀 ~ file: TransferDevice.js:126 ~ .then ~ transferDeviceInfo:", transferDeviceInfo)
                axios.post(`http://192.168.0.154:5000/reciveTransferDevice/`, {transferDeviceInfo})
                .then((res) => {
                if (res.data.acknowledged){
                alert("Please Copy Your Device Transfer Security Code and Share Your Reciver");
                setLoading(false);
                navigation.navigate('Home')
                }
            })
            }catch (err) {
                setLoading(false);
                console.log(err);
                alert('Device Added Feild');
            } finally {setLoading(false);}
        }}
        )
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
                <Text style={{color: COLORS.slate500, marginBottom: SIZES.xSmall}}>Draw Your Signature</Text>
                <View style={styles.signCanvasContainer}>
                <View style={{ height: imgHeight, width: imgWidth, paddingVertical: 20, borderWidth: 1,borderColor: COLORS.slate200,borderRadius: 4, }}>
                <SignatureScreen
                ref={signatureRef}
                webStyle={style}
                descriptionText="Sign"
                onOK={handleOK}
                />
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10}}>
                <TouchableOpacity style={styles.signBtn}  onPress={handleReset} >
                <Entypo name="eraser" size={18} color={COLORS.white500} />
                <Text style={{color: COLORS.white500}}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signBtn}  onPress={handUndo}>
                <MaterialIcons name="undo" size={18} color={COLORS.white500} />
                <Text style={{color: COLORS.white500}}>Undo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signBtn}  onPress={handleRedo}>
                <MaterialIcons name="redo" size={18} color={COLORS.white500} />
                <Text style={{color: COLORS.white500}}>Redo</Text>
                </TouchableOpacity>
                </View>
            </View>
            </View>
            
            <View>
                <TouchableOpacity onPress={toggleCheckbox}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {checked ?  <MaterialIcons name="check-box" size={24} color={COLORS.blue500} /> : 
                    <MaterialIcons name="check-box-outline-blank" size={24} color={COLORS.slate400} />}
                    <Text style={{marginLeft: 4}}>I aggre with <Text style={{color: COLORS.blue500, fontWeight: 500}}>terms</Text> and  
                    <Text style={{color: COLORS.blue500, fontWeight: 500}}>condition</Text></Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
        </KeyboardAvoidingView>
        <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 30 }}>
        {
        loading ? 
        <Pressable style={styles.loginBtn}> 
        <ActivityIndicator color={COLORS.white500}/> 
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
    signCanvasContainer:{
        flexDirection:"column",
        gap: 10
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
    signBtn: {
        backgroundColor: COLORS.blue500,
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: SIZES.small,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
        borderColor: COLORS.blue500,
        borderWidth: 1,
        flexDirection: "row",
        gap: 5,
    }
});

export default TransferDevice
