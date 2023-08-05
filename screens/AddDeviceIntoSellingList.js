import React, { useContext, useState } from "react";  
import { Image, StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { COLORS, SIZES } from '../constants';
import { AuthContext } from '../context/AuthProvider';
import { CheckBox } from '@rneui/themed';

const AddDeviceIntoSellingList = ({navigation, route}) => {
  const deviceId = route.params.deviceId ;
  const [haveABox, sethaveABox] = useState(false);
  const [checked, setChecked] = useState(false);
  const toggleCheckbox = () => setChecked(!checked);
  const toggleHaveABox = () => sethaveABox(!checked);
  const [loading, setLoading] = useState(false);
  const { user, userLoding } = useContext(AuthContext);
  const {control, handleSubmit, formState: { errors }} = useForm();

  const { isLoading, data: sellingDevice = [], refetch } = useQuery({ 
    queryKey: ['sellingDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.1.3:5000/myDeviceDetails/${deviceId}`);
      return res.data;
    } 
  })

  const onSubmit = async (data) => {
    const modelName =  "Iphone 13 Pro";
    const devcieInfo = {modelName};

     setLoading(true);

    try {
        await axios.post('http://192.168.1.3:5000/addNewDevice', {devcieInfo})
        .then((res) => {
        if (res.data.acknowledged){
            alert('Check your email');
        }
        })
    } catch (err) {
        console.log(err);
        alert('Device Added Feild');
    } finally {
        setLoading(false);
    }
  }; 


  return (
    <ScrollView style={{minHeight: "100%", backgroundColor: COLORS.white500}} showsVerticalScrollIndicator={false}>
    <View style={{padding: 16}}>
    <View style={{ gap: SIZES.medium }}>
      <View>
      <Text style={{color: COLORS.slate500}}>Brand</Text>
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
          value={sellingDevice?.brand}
          editable={false}
          />
          )}
          name="deviceBrand"
      />
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Ram</Text>
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
          value={sellingDevice?.ram}
          editable={false}
          />
          )}
          name="deviceram"
      />
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Storage</Text>
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
          value={sellingDevice?.storage}
          editable={false}
          />
          )}
          name="devicestorage"
      />
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Battery</Text>
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
          value={sellingDevice?.battery}
          editable={false}
          />
          )}
          name="devicebattery"
      />
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Days Used</Text>
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
          value={sellingDevice?.daysUsed}
          editable={false}
          />
          )}
          name="devicedaysUsed"
      />
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Selling Post Title *</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput 
          placeholder="Selling Post Title"
          style={styles.inputBox}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          />
          )}
          name="sellingTitle"
      />
      {errors.sellingTitle && <Text style={{color: COLORS.red500}}>Post Title is Required</Text>}
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Description *</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput 
          style={styles.descriptionInputBox}
          multiline = {true}
          numberOfLines = {4}
          onBlur={onBlur}
          onChangeText={onChange}
          placeholder="Write Somthing"
          value={value}
          />
          )}
          name="deviceDescription"
      />
      {errors.deviceDescription && <Text style={{color: COLORS.red500}}>Selling Description is required</Text>}
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Price Taka *</Text>
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
          placeholder="Example 10,000"
          keyboardType='numeric'
          value={value}
          />
          )}
          name="devicesellingPrice"
      />
      {errors.devicesellingPrice && <Text style={{color: COLORS.red500}}>Price is required</Text>}
      </View>

      <View>
      <Text style={{color: COLORS.slate500}}>Address *</Text>
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
          value={sellingDevice?.listingAddress}
          />
          )}
          name="deviceAddress"
      />
        {errors.deviceDescription && <Text style={{color: COLORS.red500}}>Device Pickup Address is required</Text>}
      </View>

      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
      <CheckBox
      checked={haveABox}
      onPress={toggleHaveABox}
      iconType="material-community"
      checkedIcon="checkbox-marked"
      uncheckedIcon="checkbox-blank-outline"
      checkedColor={COLORS.blue500}
      />
      <Text style={{marginLeft: 4}}>I Have a Original Box</Text>
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
    <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 30 }}>
    {
    isLoading ? <Pressable style={styles.loginBtn}> 
    <ActivityIndicator size="large" color={COLORS.white500}/> 
    </Pressable> : <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.loginBtn} >
    <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}>Confirm to Post</Text>
    </TouchableOpacity>
    }
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
      descriptionInputBox: {
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
export default AddDeviceIntoSellingList;
