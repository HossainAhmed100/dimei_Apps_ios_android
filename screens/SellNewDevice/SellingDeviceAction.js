import React, { useContext, useState } from "react";  
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import 'react-native-get-random-values';
import axios from 'axios';
import { COLORS, SIZES } from '../../constants';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../../context/AuthProvider";

const SellingDeviceAction = ({navigation, route}) => {
  const { user } = useContext(AuthContext);
  const deviceInfo = route.params.deviceInfo;
  const [loading, setLoading] = useState(false)
  const [firebaseIamge, setFirebaseIamge] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const todyDate = new Date().toISOString();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const uploadPromises = selectedImages.map(async (uri) => {
        return await uploadImageAsync(uri);
      });
  
      const newFirebaseImages = await Promise.all(uploadPromises);
      setFirebaseIamge([...newFirebaseImages]);
  
      // Now that all images are uploaded to Firebase, proceed to transferToDeviceDattaBase
      await transferToDeviceDattaBase([...newFirebaseImages]);
      
    } catch (error) {
      console.error('Error during onSubmit:', error);
    } finally {
      
      setLoading(false);
    }
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
      const response = await axios.post('http://192.168.0.181:5000/addDevcieSellingList', {sellingDevInfo});
      if (response.data.acknowledged) {
        updateDeviceActivity()
      } else {
        setLoading(false);
        alert('Selling Device Add Failed');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error during transferToDeviceDattaBase:', error);
      alert('Device Add Failed');
    } finally {
      setLoading(false);
    }
  };

  const updateDeviceActivity = async () => {
    setLoading(true)
    const deviceActivityInfo = {
      deviceImei: deviceInfo?.deviceImei,
      ownerEmail: deviceInfo?.ownerEmail,
      ownerPhoto: user?.userProfilePic,
      listingDate: todyDate,
      activityList: [
        {
          userId: user?._id,
          deviceId: deviceInfo?.deviceId,
          activityTime: todyDate,
          deviceModel: deviceInfo?.deviceModelName,
          message: "Device Transfer is Canceled!",
          devicePicture: deviceInfo?.deviceThumnailPhoto,
        }
      ]
    };
    try{
      setLoading(true)
      await axios.put("http://192.168.0.181:5000/insertDevcieActivity/", {deviceActivityInfo})
      .then((res) => {
        if (res.data.modifiedCount === 1){
          alert('Check your email');
          navigation.navigate('Home');
        }else{
          setLoading(false)
          alert('Somthing is wrong! 🚀 ~ file: SellingDeviceAction.js');
        }
      })
    }catch (error){
      console.log("🚀 ~ file: SellingDeviceAction.js:110 ~ updateDeviceActivity ~ error:", error)
      setLoading(false)
    }
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
      console.log(error)
    }
  };
  
  const handleImageRemove = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };
    
  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
    <View style={{gap: 10, padding: 10}}>
      <View>
        <TouchableOpacity style={styles.selectPhotoBtn} onPress={pickImage}>
        <AntDesign name="pluscircle" size={24} color={COLORS.slate300} />
        <Text style={{color: COLORS.slate300}}>Add Photo</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, alignItems: "center", justifyContent: "flex-start" }}>
        {selectedImages.map((uri, index) => (
          <View key={index} style={{borderWidth: 1, borderColor: COLORS.slate200, borderRadius: 5}}>
            <TouchableOpacity onPress={() => handleImageRemove(index)} style={{position: "absolute", zIndex: 100, backgroundColor: COLORS.slate200, borderBottomRightRadius: 5, padding: 2}}><AntDesign name="close" size={16} color={COLORS.slate500} /></TouchableOpacity>
            <Image source={{ uri }} style={{ width: 103, height: 100, resizeMode: "contain" }} />
          </View>
        ))}
      </View>
      <Text>{`Selected: ${selectedImages.length}/10`}</Text>
    </View>
    <View style={{ position: "absolute", bottom: 15, width: "100%", alignItems: "center", padding: 10 }}>
    {loading ? <TouchableOpacity style={styles.confirmBtn} >
    <ActivityIndicator size={"small"} color={COLORS.white500}/>
    </TouchableOpacity> : <TouchableOpacity onPress={onSubmit} style={styles.confirmBtn} >
    <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}>Confirm to Post</Text>
    </TouchableOpacity>}
    </View>
    </View>
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
    confirmBtn: {
    backgroundColor: COLORS.blue500,
    width: "100%",
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.large,
    borderRadius: SIZES.small,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.blue500,
    borderWidth: 1,
    }
  });

export default SellingDeviceAction;