import { Text, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React,{ useState } from 'react';
import { COLORS, SIZES } from '../constants/theme';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '@rneui/themed';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const Chat = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const pickImage = async () => {
    setisLoading(true)
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const uploadUrl = await uploadImageAsync(result.assets[0].uri);
    setImage(uploadUrl);
    setInterval(() => {
      setisLoading(false)
    }, 2000);
  }else{
    setImage(null)
    setInterval(() => {
      setisLoading(false)
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

  
  const deleteImage = async () => {
    setisLoading(true);
    const deleteRef = ref(storage, image);
    try{
     deleteObject(deleteRef).then(() => {
        setImage(null)
        setInterval(() => {
          setisLoading(false)
        }, 2000);
      })
    }catch(error){
      alert(`Error : ${error}`)
      console.log(error)
    }
  }



  return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: SIZES.medium, backgroundColor: COLORS.white500}}>
      {!image ? (<>
      <TouchableOpacity onPress={pickImage} style={{width: "100%", height: 256, backgroundColor: COLORS.slate100, borderRadius: 10, borderWidth: 1, borderStyle: "dashed", borderColor: COLORS.slate200, alignItems: "center", justifyContent: "center"}}>
        {isLoading ? ( <ActivityIndicator size={"large"} color={COLORS.blue500} animating/>) : 
        ( <Text style={{fontSize: 16, fontWeight: "400", color: COLORS.slate500}}>Pick an image</Text> )}
      </TouchableOpacity>
      </>) : 
      (<View style={{width: "100%", height: 256, borderRadius: 10, overflow: "hidden", alignItems: "center", justifyContent: "center"}}>
        <Image source={{ uri: image }} style={{ width: "100%", height: "100%" }} />
      </View>)}
      <Button title="Delete This Photo" onPress={deleteImage} 
      buttonStyle={{backgroundColor: 'rgba(78, 116, 289, 1)',borderRadius: 3,}}
      containerStyle={{width: 200,marginHorizontal: 50,marginVertical: 10,}}
      />
    </View>
  )
}

export default Chat;