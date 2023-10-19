import React, { useCallback, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, TextInput } from 'react-native';
import 'react-native-get-random-values';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import axios from 'axios';
import { COLORS, SIZES } from '../../constants';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { storage } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from '@react-navigation/native';
import { Divider } from '@rneui/themed';
import { useForm, Controller } from "react-hook-form";
import { CheckBox } from '@rneui/themed';


const UpdateSellingPost = ({navigation, route}) => {
  const deviceId = route.params.deviceId;
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const { isLoading, data: sellingDevice = [], refetch } = useQuery({ 
    queryKey: ['myDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.1.8:5000/updateDevicesellingPost/${deviceId}`);
      return res.data;
    } 
  });

  const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {
    sellingTitle: sellingDevice?.sellingTitle,
    devciePrice: sellingDevice?.devciePrice,
    deviceDescription: sellingDevice?.deviceDescription, 
    listingAddress: sellingDevice?.listingAddress, 
  },})

  const onSubmit = async (data) => {
    const listingAddress = data?.listingAddress;
    const devciePrice = data.devicesellingPrice;
    const sellingTitle = data.sellingTitle;
    const deviceDescription = data.deviceDescription;
   };
    
  const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    setSelectedImages([...selectedImages, result.assets[0].uri]);
    setLoading(false);
  } else {
    setLoading(false);
  }
   };

  const transferToDeviceDattaBase = async (deviceIamges) => {
    setLoading(true);
    const createdAt = new Date().toISOString();
    const newArray = deviceInfo;
    newArray.createdAt = createdAt;
    newArray.deviceIamges = deviceIamges;
    try {
      const sellingDevInfo = newArray;
      const response = await axios.post('http://192.168.1.8:5000/addDevcieSellingList', {sellingDevInfo});
  
      if (response.data.acknowledged) {
        alert('Check your email');
        navigation.navigate('Home');
      } else {
        alert('Device Add Failed');
      }
  
    } catch (error) {
      console.error('Error during transferToDeviceDattaBase:', error);
      alert('Device Add Failed');
    } finally {
      setLoading(false);
    }
   };

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
      console.log(error)
    }
   };
  
  const handleImageRemove = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
   };

   const deleteThisPost = async (deviceId) => {
    try {
      await axios.delete(`http://192.168.1.8:5000/deleteDevcieSellingPost/${deviceId}`)
      .then((res) => {
        if(res.data.transferSuccess){
          navigation.navigate('Home')
        }
      })
    }catch (err) {
        console.log(err);
    }
   }



  return (
    <View>
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
    <View style={{gap: 10, padding: 10}}>
      <View>
        <TouchableOpacity style={styles.selectPhotoBtn} onPress={pickImage}>
        <AntDesign name="pluscircle" size={24} color={COLORS.slate300} />
        <Text style={{color: COLORS.slate300}}>Add Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, alignItems: "center", justifyContent: "flex-start" }}>
        {sellingDevice?.deviceIamges && sellingDevice?.deviceIamges.map((uri, index) => (
          <View key={index} style={{borderWidth: 1, borderColor: COLORS.slate200, borderRadius: 5}}>
            <TouchableOpacity style={{position: "absolute", zIndex: 100, backgroundColor: COLORS.slate200, borderBottomRightRadius: 5, padding: 2}}>
              <AntDesign name="close" size={16} color={COLORS.slate500} /></TouchableOpacity>
            <Image source={{ uri }} style={{ width: 107, height: 100, resizeMode: "contain" }} />
          </View>
        ))}
      </View>
      <Text>{`Selected: ${sellingDevice?.deviceIamges?.length}/10`}</Text>
    </View>
    <View style={{paddingVertical: SIZES.small}}>
    <Divider />
    </View>
    <View style={{flex: 1, alignItems: "center", padding: SIZES.small}}>
    {isLoading ? <ActivityIndicator /> : 
      <View style={{ gap: 20 }}>
          <View>
            <Text style={styles.inputTextLabel}>Selling Post Title *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter NID Number" onBlur={onBlur} onChangeText={onChange} value={sellingDevice?.sellingTitle} />
              )}
              name="sellingTitle"
            />
          {errors.sellingTitle && <Text style={{color: COLORS.red500}}>Selling Post Title is required.</Text>}
          </View>
          <View>
            <Text style={styles.inputTextLabel}>Asking Price *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter Price" onBlur={onBlur} onChangeText={onChange} value={sellingDevice?.devciePrice}/>
              )}
              name="devciePrice"
            />
          {errors.devciePrice && <Text style={{color: COLORS.red500}}>Price is required</Text>}
          </View>
          <View>
            <Text style={styles.inputTextLabel}>Post Description *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Write Post Description" onBlur={onBlur} onChangeText={onChange}value={sellingDevice?.deviceDescription}/>
              )}
              name="deviceDescription"
            />
          {errors.deviceDescription && <Text style={{color: COLORS.red500}}>Post Description is required.</Text>}
          </View>
          <View>
            <Text style={styles.inputTextLabel}>Picup Address *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter your Motherr's Name" onBlur={onBlur} onChangeText={onChange} value={sellingDevice?.listingAddress} />
              )}
              name="listingAddress"
            />
          {errors.listingAddress && <Text style={{color: COLORS.red500}}>Address required.</Text>}
          </View>
      </View>
    }
    </View>
    <View style={{width: "100%", alignItems: "center", paddingHorizontal: 10}}>
    <View style={{width: 300}}>
      {loading ? 
      <TouchableOpacity style={styles.confirmBtn}>
        <ActivityIndicator size="large" color={COLORS.white500}/>
      </TouchableOpacity> :
      <TouchableOpacity onPress={() => nextStep()} style={[styles.button,{ backgroundColor: COLORS.blue500 }]}>
      <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>Confirm To Update</Text>
      <MaterialCommunityIcons name="progress-upload" size={SIZES.large} color={COLORS.white500} />
    </TouchableOpacity>
      }
    <TouchableOpacity onPress={() => deleteThisPost(deviceId)} style={[styles.button,{ backgroundColor: COLORS.red500}]}>
      <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>Delete This Post </Text>
      <MaterialCommunityIcons name="delete-outline" size={SIZES.large} color={COLORS.white500} />
    </TouchableOpacity>
    </View>
    </View>

    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  button:{
    width: "100%", 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: SIZES.small, 
    flexDirection: "row", gap: 4, 
    paddingVertical: SIZES.xSmall, 
    paddingHorizontal: SIZES.large,
    marginVertical: 10, 
  },
  confirmBtnText:{color: COLORS.white500, fontSize: SIZES.medium},
  inputBox: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    width: 320,
    borderColor: COLORS.slate500,
    color: COLORS.slate500,
    fontSize: 16
  },
  inputTextLabel: {
    color: COLORS.slate400,
    fontSize: 12
  },
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
});

export default UpdateSellingPost