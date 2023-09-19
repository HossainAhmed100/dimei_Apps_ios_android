import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, Ionicons  } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, SIZES, images } from '../../constants';
import 'react-native-get-random-values';
import { storage } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from '../../context/AuthProvider';



const KYCPreview = ({navigation, route}) => {
    const { user, userLoding } = useContext(AuthContext);
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
      <View style={{marginTop: 15}}>
      <Text style={{fontSize: SIZES.large, color: COLORS.slate600, fontWeight: 500, textAlign: "center"}}>Submit your NID</Text>
      </View>
      <Text style={{textAlign: "center", color: COLORS.slate300, marginTop: SIZES.large}}>Scan the front side of NID card with camera</Text>

      <View  style={{paddingHorizontal: SIZES.medium, paddingVertical: SIZES.xxLarge}}>
      <Image source={{ uri: user?.nidImageUrl?.frontNidImage }}  style={{width: "100%", height: 180, borderRadius: 10, resizeMode: "contain"}}/> 
      
      {frontNidImage ? <TouchableOpacity onPress={() =>  setFrontNidImage(null)}  style={{width: 35, height: 35, backgroundColor: COLORS.slate100, alignItems: "center", justifyContent: "center", position: "absolute", borderRadius: 50, top: 40, right:24}}>
      <Ionicons name="ios-close-sharp" size={24} color={COLORS.slate300}/>
      </TouchableOpacity>  : <TouchableOpacity onPress={pickImage}  style={{width: 50, height: 50, backgroundColor: COLORS.blue500, alignItems: "center", justifyContent: "center", position: "absolute", borderRadius: 50, bottom: 20, right:SIZES.large}}>
      {frontNidImageLoding ? <ActivityIndicator size={"large"} color={COLORS.white500} animating/> : <Feather name="camera" size={24} color={COLORS.white500} />}
      </TouchableOpacity>
      }
      
      </View>

      <Text style={{textAlign: "center", color: COLORS.slate300, marginTop: SIZES.large}}>Scan the front side of NID card with camera</Text>

      <View  style={{paddingHorizontal: SIZES.medium, paddingVertical: SIZES.xxLarge}}>
      <Image source={{ uri: user?.nidImageUrl?.backsideNidPhoto }}  style={{width: "100%", height: 180, borderRadius: 10, resizeMode: "contain"}}/> 
      {backsideNidPhoto ? <TouchableOpacity onPress={() =>  setBacksideNidPhoto(null)}  style={{width: 35, height: 35, backgroundColor: COLORS.slate100, alignItems: "center", justifyContent: "center", position: "absolute", borderRadius: 50, top: 40, right:24}}>
      <Ionicons name="ios-close-sharp" size={24} color={COLORS.slate300} />
      </TouchableOpacity>  : <TouchableOpacity onPress={pickBackSideImage}  style={{width: 50, height: 50, backgroundColor: COLORS.blue500, alignItems: "center", justifyContent: "center", position: "absolute", borderRadius: 50, bottom: 20, right:SIZES.large}}>
      {backNidImageLoding ? <ActivityIndicator size={"large"} color={COLORS.white500} animating/> : <Feather name="camera" size={24} color={COLORS.white500} />}
      </TouchableOpacity>
      }
      </View>

    </View>
    <View style={{position: "absolute", bottom: 0, width: "100%"}}>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.blue500, flex: 1}}>
    <TouchableOpacity style={{alignItems: "center", justifyContent: "center", paddingHorizontal: SIZES.large, paddingVertical: SIZES.medium}}>
        <Text style={{color: COLORS.white500, fontWeight: 500, fontSize: SIZES.medium,borderRadius: SIZES.small}}>BACK</Text>
    </TouchableOpacity>
    <View style={{flexDirection: "column", alignItems: "flex-start", paddingHorizontal: SIZES.xSmall}}> 
    <Text style={{color: COLORS.blue200, fontSize: SIZES.medium}}>1/3</Text>
    </View>
    <TouchableOpacity activeOpacity={.7} onPress={() => nextStep()} style={{alignItems: "center", justifyContent: "center", paddingHorizontal: SIZES.large, paddingVertical: SIZES.medium}}>
        <Text style={{color: COLORS.white500, fontWeight: 500, fontSize: SIZES.medium,borderRadius: SIZES.small}}>NEXT</Text>
    </TouchableOpacity>
    </View>
    </View>
    </View>
  )
}

export default KYCPreview