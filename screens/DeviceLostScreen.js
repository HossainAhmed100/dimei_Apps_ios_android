import React, { useContext, useState } from "react";  
import { StyleSheet, Text, View,TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import { CheckBox } from '@rneui/themed';
import { format } from 'date-fns';
import { AuthContext } from "../context/AuthProvider";

const DeviceLostScreen = ({navigation, route}) => {
    const deviceId = route.params.deviceId;
    const [checked, setChecked] = useState(false);
    const toggleCheckbox = () => setChecked(!checked);
    const todyDate = new Date().toISOString();
    const {user} = useContext(AuthContext);
    const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {deviceDescription: "", transferDate: format(new Date(todyDate), 'yyyy-MM-dd')}});

    const onSubmit = async (data) => {
        const ownerEmail = user?.userEmail;
        const deviceLostMessage = data.deviceDescription;
        const infoData = {deviceId, ownerEmail, deviceLostMessage};
        try{
            await axios.put(`http://192.168.1.2:5000/deviceloststatusUpdate/`,{infoData})
        }
        catch{

        }
    }


  return (
    <ScrollView style={{minHeight: "100%", backgroundColor: COLORS.white500}} showsVerticalScrollIndicator={false}>
    <View style={{padding: 16}}>
    
    <View style={{ gap: SIZES.medium }}>


        <View>
        <Text style={{color: COLORS.slate500}}>On Wich date the mobile was lost? *</Text>
        <Controller control={control} rules={{required: true,}}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput  style={styles.inputBox} onBlur={onBlur} onChangeText={onChange} value={value} /> )}
            name="transferDate"
        />
        {errors.transferDate && <Text style={{color: COLORS.red500}}>Date is required</Text>}
        </View>

      <View>
      <Text style={{color: COLORS.slate500}}>How did you lose the mobile phone ?</Text>
      <Controller control={control} name="deviceDescription"
      render={({ field: { onChange, onBlur, value } }) => (
      <TextInput style={styles.descriptionInputBox} multiline={true} onBlur={onBlur} onChangeText={onChange} 
      placeholder="Write Somthing (optional)" value={value}/>)}/>
      {errors.deviceDescription && <Text style={{color: COLORS.red500}}>Selling Description is required</Text>}
      </View>
      
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
      <CheckBox checked={checked} onPress={toggleCheckbox} iconType="material-community" 
      checkedIcon="checkbox-marked" uncheckedIcon="checkbox-blank-outline" checkedColor={COLORS.blue500} />
      <Text style={{marginLeft: 4}}>I aggre with 
      <Text style={{color: COLORS.blue500}}>terms</Text> and 
      <Text style={{color: COLORS.blue500}}>condition</Text></Text>
      </View>

    </View>
    <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 30 }}>
    <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn} >
    <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}>Confirm</Text>
    </TouchableOpacity>
    </View>
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    selectPhotoBtn:{
      width: "100%", 
      paddingVertical: SIZES.xxLarge, 
      borderColor: COLORS.slate200, 
      borderRadius: 6, 
      alignItems: "center", 
      justifyContent: "center", 
      flexDirection: "column",
      borderWidth: 1
    },
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
        descriptionInputBox: {
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.xSmall,
        paddingVertical: 12,
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

export default DeviceLostScreen