import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, TextInput, useWindowDimensions, FlatList} from 'react-native';
import 'react-native-get-random-values';
import axios from 'axios';
import { COLORS, SIZES } from '../../constants';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { storage } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useQuery } from "@tanstack/react-query";
import { Divider } from '@rneui/themed';
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from '../../context/AuthProvider';


const UpdateSellingPost = ({navigation, route}) => {
  const {width} = useWindowDimensions();
  const deviceId = route.params.deviceId;
  const { user } = useContext(AuthContext);
  const todyDate = new Date().toISOString();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleCheckbox = () => {setChecked(!checked)};
  const [selectedImages, setSelectedImages] = useState([]);

  const { isLoading, data: sellingDevice = [], refetch } = useQuery({ 
    queryKey: ['sellingDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.181:5000/getSellingDevcieDetails/${deviceId}`);
      return res.data;
    } 
  });
  const { data: sellingDeviceImages = [] } = useQuery({ 
    queryKey: ['sellingDeviceImages', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.181:5000/getSellingDevcieImages/${deviceId}`);
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

  const transferToDeviceDattaBase = async (deviceIamges, deviceInfo) => {
    setLoading(true);
    const createdAt = new Date().toISOString();
    const newArray = deviceInfo;
    newArray.createdAt = createdAt;
    newArray.deviceIamges = deviceIamges;
    try {
      const sellingDevInfo = newArray;
      const response = await axios.post('http://192.168.0.181:5000/addDevcieSellingList', {sellingDevInfo});
  
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
      await axios.delete(`http://192.168.0.181:5000/deleteDevcieSellingPost/${deviceId}`)
      .then((res) => {
        if(res.data.transferSuccess){
          updateDeviceActivity()
        }
      })
    }catch (err) {
        console.log(err);
    }
   }

  const updateDeviceActivity = async () => {
    setLoading(true)
    const deviceActivityInfo = {
      deviceImei: sellingDevice?.deviceImei,
      ownerEmail: sellingDevice?.ownerEmail,
      ownerPhoto: user?.userProfilePic,
      listingDate: todyDate,
      activityList: [
        {
          userId: user?._id,
          deviceId: sellingDevice?.deviceId,
          activityTime: todyDate,
          deviceModel: sellingDevice?.deviceModelName,
          message: "Device Selling Post is Deleted!",
          devicePicture: sellingDevice?.deviceThumnailPhoto,
        }
      ]
    };
    try{
      setLoading(true)
      await axios.put("http://192.168.0.181:5000/insertDevcieActivity/", {deviceActivityInfo})
      .then((res) => {
        if (res.data.modifiedCount === 1){
          navigation.navigate('Home');
        }else{
          setLoading(false)
          alert('Somthing is wrong! 🚀 ~ file: UpdateSellingPost.js');
        }
      })
    }catch (error){
      console.log("🚀 ~ file: UpdateSellingPost.js:170 ~ updateDeviceActivity ~ error:", error)
      setLoading(false)
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
      {sellingDeviceImages && 
      <ImageSilderShow deviceIamges={sellingDeviceImages} width={width}/>
      }
      <Text>{`Selected: ${sellingDeviceImages.length}/10`}</Text>
    </View>
    <View style={{paddingVertical: SIZES.small}}>
    <Divider />
    </View>
    <View style={{flex: 1, padding: SIZES.small}}>
    {isLoading ? <ActivityIndicator /> : 
      <View style={{ gap: 20 }}>
          <View>
            <Text style={styles.inputTextLabel}>Selling Post Title *</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Write Post Title" onBlur={onBlur} onChangeText={onChange} value={sellingDevice?.sellingTitle} />
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
                <TextInput style={styles.inputBox} placeholder="Write Pickup Address" onBlur={onBlur} onChangeText={onChange} value={sellingDevice?.listingAddress} />
              )}
              name="listingAddress"
            />
          {errors.listingAddress && <Text style={{color: COLORS.red500}}>Address required.</Text>}
          </View>
      </View>
    }
    </View>
    <View style={{width: "100%", paddingHorizontal: 10}}>
    <View style={{marginVertical: 15}}>
      <TouchableOpacity onPress={toggleCheckbox}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {checked ?  <MaterialIcons name="check-box" size={24} color={COLORS.blue500} /> : 
          <MaterialIcons name="check-box-outline-blank" size={24} color={COLORS.slate400} />}
          <Text style={{marginLeft: 4}}>I aggre with <Text style={{color: COLORS.blue500, fontWeight: 500}}>terms</Text> and  
          <Text style={{color: COLORS.blue500, fontWeight: 500}}> condition</Text></Text>
        </View>
      </TouchableOpacity>
    </View>
    <View>
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

const ImageSilderShow = ({deviceIamges, width}) => (
  <FlatList
      horizontal
      data={deviceIamges}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item }) => (
        <View style={styles.imageBox}>
          <TouchableOpacity style={styles.imgCloseBtn}>
          <AntDesign name="close" size={16} color={COLORS.slate500} /></TouchableOpacity>
          <Image source={{ uri: item }} style={{ width: 107, height: 100, resizeMode: "contain" }} />
        </View>
      )}
      pagingEnabled
      bounces={false}
    /> 
)
  

const styles = StyleSheet.create({
  imgCloseBtn:{
    padding: 2,
    zIndex: 100, 
    position: "absolute", 
    borderBottomRightRadius: 5, 
    backgroundColor: COLORS.slate200, 
  },
  imageBox:{
    borderWidth: 1, 
    borderRadius: 5, 
    marginRight: 10,
    borderColor: COLORS.slate200, 
  },
  button:{
    width: "100%", 
    borderRadius: 4, 
    marginVertical: 10, 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "row", gap: 4, 
    paddingVertical: SIZES.xSmall, 
  },
  confirmBtnText:{
    color: COLORS.white500, 
    fontSize: SIZES.medium
  },
  inputBox: {
    marginTop: 6,
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.slate200,
    paddingVertical: SIZES.xSmall,
    paddingHorizontal: SIZES.medium,
  },
  inputTextLabel: {
    fontSize: 12,
    color: COLORS.slate400,
  },
  selectPhotoBtn:{
    width: "100%", 
    borderWidth: 1,
    borderRadius: 6, 
    alignItems: "center", 
    flexDirection: "column",
    justifyContent: "center", 
    borderColor: COLORS.slate200, 
    paddingVertical: SIZES.xxLarge, 
  },
  cardContainer:{
    padding: 10,
    borderWidth: 1, 
    alignItems: "center", 
    flexDirection: "row", 
    borderRadius: SIZES.xSmall, 
    marginBottom: SIZES.xSmall, 
    borderColor: COLORS.slate100, 
    justifyContent: "flex-start", 
  },
});

export default UpdateSellingPost