import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, useWindowDimensions, StyleSheet } from 'react-native';
import { Feather, Ionicons  } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES } from '../../constants';
import 'react-native-get-random-values';
import { storage } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from '../../context/AuthProvider';



const KYCPreview = () => {
    const { user } = useContext(AuthContext);
    const {height, width} = useWindowDimensions();
    const [frontNidImage, setFrontNidImage] = useState(null);
    const [backsideNidPhoto, setBacksideNidPhoto] = useState(null);
    const [frontNidImageLoding, setFrontNidImageLoding] = useState(false);
    const [backNidImageLoding, setBackNidImageLoding] = useState(false);
   
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 2],
          quality: 1,
        });
        if (!result.canceled) {
          setFrontNidImageLoding(true)
          const uploadUrl = await uploadImageAsync(result.assets[0].uri);
          setFrontNidImage(uploadUrl);
          setInterval(() => {
            setFrontNidImageLoding(false)
          }, 2000);
        }else{
          setFrontNidImage(null)
          setInterval(() => {
            setFrontNidImageLoding(false)
          }, 2000);
        }
    };

    const pickBackSideImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 2],
        quality: 1,
      });
      if (!result.canceled) {
        setBackNidImageLoding(true)
        const uploadUrl = await uploadImageAsync(result.assets[0].uri);
        setBacksideNidPhoto(uploadUrl);
        setInterval(() => {
          setBackNidImageLoding(false)
        }, 2000);
      }else{
        setBacksideNidPhoto(null)
        setInterval(() => {
          setBackNidImageLoding(false)
        }, 2000);
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
        alert(`Error 1 : ${error}`)
        console.log(error)
      }
  
    }

    const nextStep = () => {
      const nidImageUrl = {frontNidImage, backsideNidPhoto};
    }

  return (
    <View style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
    <View style={{justifyContent: "center",}}>
      <View style={{marginTop: 5}}>
      <Text style={{fontSize: SIZES.large, color: COLORS.slate600, fontWeight: 500, textAlign: "center"}}>Submit your NID</Text>
      </View>
      <Text style={styles.nidCardTitle}>Scan the front side of NID card with camera</Text>
      <View  style={styles.nidCardContainer}>
      {user?.nidImageUrl?.frontNidImage && 
      <Image source={{ uri: user?.nidImageUrl?.frontNidImage }} style={styles.nidCardImage(height)}/>
      }
      {frontNidImage ? 
        <TouchableOpacity onPress={() =>  setFrontNidImage(null)}  style={styles.nidRemoveBtn}>
          <Ionicons name="ios-close-sharp" size={24} color={COLORS.slate300}/>
        </TouchableOpacity> : 
        <TouchableOpacity onPress={pickImage}  style={styles.nidCameraBtn}>
          {frontNidImageLoding ? 
            <ActivityIndicator size={"large"} color={COLORS.white500} animating/> : 
            <Feather name="camera" size={24} color={COLORS.white500} />}
        </TouchableOpacity>
      }
      </View>

      <Text style={styles.nidCardTitle}>Scan the Back side of NID card with camera</Text>
      <View  style={styles.nidCardContainer}>
      <Image source={{ uri: user?.nidImageUrl?.backsideNidPhoto }}  style={styles.nidCardImage(height)}/> 
      {backsideNidPhoto ? 
        <TouchableOpacity onPress={() =>  setBacksideNidPhoto(null)}  style={styles.nidRemoveBtn}>
          <Ionicons name="ios-close-sharp" size={24} color={COLORS.slate300} />
        </TouchableOpacity>  : 
        <TouchableOpacity onPress={pickBackSideImage}  style={styles.nidCameraBtn}>
          {backNidImageLoding ? 
            <ActivityIndicator size={"large"} color={COLORS.white500} animating/> : 
            <Feather name="camera" size={24} color={COLORS.white500} />}
        </TouchableOpacity>
      }
      </View>

    </View>
    <View style={{position: "absolute", bottom: 0, width: "100%"}}>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.blue500, flex: 1}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.bottomActionBtn}>
          <Text style={styles.bottomNavigationBtnText}>BACK</Text>
        </TouchableOpacity>
        <View> 
          <Text style={{color: COLORS.blue200, fontSize: SIZES.medium}}>1/3</Text>
        </View>
        <TouchableOpacity activeOpacity={.7} style={styles.bottomActionBtn}>
          <Text style={{color: COLORS.slate200, fontWeight: 500, fontSize: SIZES.medium}}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
  headerTitle:{
    fontWeight: 500, 
    textAlign: "center",
    fontSize: SIZES.large, 
    color: COLORS.slate600, 
  },
  nidCardImage: (height) => ({
    height: height / 3.5, 
    width: "100%", 
    borderRadius: 10,
  }),
  nidCardTitle:{
    textAlign: "center", 
    color: COLORS.slate300, 
    // marginTop: SIZES.medium,
  },
  bottomNavigationBtnText:{
    fontWeight: 500, 
    fontSize: SIZES.medium,
    color: COLORS.white500, 
  },
  nidCardContainer:{
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.medium, 
  },
  bottomActionBtn:{
    alignItems: "center", 
    justifyContent: "center", 
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.large, 
  },
  nidCameraBtn:{
    width: 50, 
    bottom: 30, 
    height: 50, 
    borderRadius: 50, 
    right:SIZES.large,
    alignItems: "center", 
    position: "absolute", 
    justifyContent: "center", 
    backgroundColor: COLORS.blue500, 
  },
  nidRemoveBtn:{
    top: 30, 
    right:24,
    width: 35, 
    height: 35, 
    borderRadius: 50, 
    position: "absolute", 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: COLORS.slate100, 
  }
})

export default KYCPreview