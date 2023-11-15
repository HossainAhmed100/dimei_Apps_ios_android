import React, { useCallback, useContext, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';
import { useForm, Controller } from "react-hook-form";
import { COLORS, SIZES } from '../../constants';
import { format } from 'date-fns';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons  } from '@expo/vector-icons';


const VerifyDeviceAcceft = ({navigation, route})  => {
    const transferDeviceId = route.params.transferDeviceId;
    const [checked, setChecked] = useState(false);
    const [acceptStatus, setAcceptStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const todyDate = new Date().toISOString();
    const firstTimeRef = useRef(true);
    const [zeroTokenAlert, setZeroTokenAlert] = useState(false);
    const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {deviceSecrentCode: "", transferDate: format(new Date(todyDate), 'yyyy-MM-dd')}})
    
    const toggleCheckbox = () => {setChecked(!checked)};
    const showAlert = () => {setZeroTokenAlert(true)};
    
    const hideAlert = () => {setZeroTokenAlert(false)};

    const { data: itemQuantity = [], refetch } = useQuery({ 
      queryKey: ['itemQuantity', user?.userEmail], 
      queryFn: async () => {
      const res = await axios.get(`http://192.168.0.127:5000/useritemQuantity/${user?.userEmail}`);
      return res.data;
      } 
    })

    const { isLoading, data: acceptDevice = [], refetch: refetchAcceptDevice } = useQuery({ 
      queryKey: ['acceptDevice', transferDeviceId], 
      queryFn: async () => {
      const res = await axios.get(`http://192.168.0.127:5000/getTransferDeviceDetails/${transferDeviceId}`);
      return res.data;
      } 
    })

    const onSubmit = async (data) => {
    setLoading(true)
    const secretCode = data.deviceSecrentCode;
    const deviceId = acceptDevice?.deviceId;
    const devicereciverEmail = user?.userEmail;
    const previusDeviceOwner = acceptDevice?.ownerEmail;
    const newDeviceOwner = {
        ownerId: user?.userAccountId,
        deviceListingDate: todyDate,
        deviceTransferDate: todyDate,
        ownerPhoto: user?.userProfilePic,
        ownerName: user?.userName,
        ownarStatus: "",
        ownerEmail: user?.userEmail,
        deviceLostNoteMessage: "",
        thisIsPreviousOwner: false,
        thisIsCurrentOwner: true,
      };
    const acceptDeviceInfo = {secretCode, deviceId, devicereciverEmail, transferDeviceId, newDeviceOwner, previusDeviceOwner};
    
    try{
        await axios.put(`http://192.168.0.127:5000/verifydeviceAccept/`, {acceptDeviceInfo})
        .then((res) => {
            if(res.data.modifiedCount === 1){
                setLoading(false)
                navigation.navigate('Home')
                alert("Device Accept Succesfully!")
            }else{
                setLoading(false)
                setAcceptStatus("Secret Code is wrong!")
            }
        })
    }
    catch{}
    finally{
        setLoading(false)
    }

    

    }    

    useFocusEffect(
      useCallback(() => {
        if (firstTimeRef.current) {
           firstTimeRef.current = false;
           return;
        }
        refetch()
        refetchAcceptDevice()
      }, [refetch, refetchAcceptDevice])
    )

  return (
    <View style={{padding: SIZES.medium, backgroundColor: COLORS.white500, minHeight: "100%"}}>
        <View View style={styles.cardContainer}>
        {acceptDevice?.devicePicture && 
        <Image source={{uri: acceptDevice?.devicePicture}} resizeMode="contain" style={{ borderRadius: 4, marginRight: 10, width: 100, height: 100}}/>} 
        <View>
            <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>{acceptDevice?.modelName}</Text>
            <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Ram : {acceptDevice?.ram}</Text>
            <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Storage : {acceptDevice?.storage}</Text>
            <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Brand : {acceptDevice?.brand}</Text>
            <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Color : {acceptDevice?.colorVarient}</Text>
        </View>
        </View>
        <View style={{gap: 10}}>
        <View>
        <Text style={{color: COLORS.slate500}}>Write Device Transfer Secret Code *</Text>
        <Controller control={control} rules={{required: true,}}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput  style={styles.inputBox} onBlur={onBlur} onChangeText={onChange} value={value}  placeholder='Enter Device Secret Code'/> )}
            name="deviceSecrentCode"
        />
        {errors.deviceSecrentCode && <Text style={{color: COLORS.red500}}>Device Transfer Secret Code is required</Text>}
        {acceptStatus && <Text style={{color: COLORS.red500}}>{acceptStatus}</Text>}
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
            <Text style={{color: COLORS.slate500}}>Device Accept Fee</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>1 Token</Text>
            </View>
            <View style={{paddingHorizontal: SIZES.small, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.xSmall}}>
            <Text style={{color: COLORS.slate500}}>Available Token</Text><Text style={{color: COLORS.slate500, fontWeight: 700}}>{itemQuantity?.tokenQuantity && itemQuantity?.tokenQuantity - 1} Token</Text>
            </View>
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
        { itemQuantity?.tokenQuantity === 0 && 
        <View style={{padding: 10, borderRadius: 10, backgroundColor: COLORS.red200}}>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: 'space-between'}}>
            <Text style={{marginRight: 10, color: COLORS.red500}}>You Have 0 Token. Please Purchase Token For Accept This Token</Text> 
          </View>
        </View>
        }
       <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 20 }}>
       {isLoading ? <TouchableOpacity style={styles.loginBtn}> 
        <ActivityIndicator color={COLORS.white500}/> 
        </TouchableOpacity> :
        itemQuantity?.tokenQuantity === 0 ? 
        <TouchableOpacity onPress={() => showAlert()} style={[styles.loginBtn, {opacity: 0.5}]} >
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm to Accept</Text>
        </TouchableOpacity> : loading ?
        <TouchableOpacity style={styles.loginBtn}> 
        <ActivityIndicator color={COLORS.white500}/> 
        </TouchableOpacity> :
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn} >
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm to Accept</Text>
        </TouchableOpacity> 
        }
        <AwesomeAlert
          show={zeroTokenAlert}
          showProgress={false}
          title="Token Alert"
          message="You don't have any Token. Please Buy some Token to continue."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Close"
          confirmText="Buy now"
          confirmButtonColor={COLORS.blue500}
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            navigation.navigate('BuyToken');
            hideAlert();
          }}
        />
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