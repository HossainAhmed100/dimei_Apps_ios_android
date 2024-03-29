import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { COLORS, SIZES } from '../../constants'
import { Feather, Ionicons  } from '@expo/vector-icons';
import { auth, storage } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../../context/AuthProvider';

const ProfilePhotoSelection = ({navigation, route}) => {
  const accountInfo = route.params.accountInfo;
  const {logOut} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoLoading, setProfilePhotoLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
    });
    if (!result.canceled) {
      setProfilePhotoLoading(true)
      const uploadUrl = await uploadImageAsync(result.assets[0].uri);
      setProfilePhoto(uploadUrl);
      setInterval(() => {
        setProfilePhotoLoading(false)
      }, 2000);
    }else{
      setFrontNidImage(null)
      setInterval(() => {
        setProfilePhotoLoading(false)
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

  const generateRandomNumber = () => {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const sinOut = () => {
      logOut()
      .then(() => {
        navigation.navigate('Login')
      })
  };

  const consfirmToAdd = async () => {
    const userNikName = accountInfo.userName;
    const userProfilePic = profilePhoto;
    const userAddress = accountInfo.nidData.niduserpresentsaddress;
    const userAccountId = generateRandomNumber();
    const userEmail = accountInfo.userEmail;
    const userPassword = accountInfo.userPassword;
    const userPhone = accountInfo.userPhone;
    const tokenQuantity = 0;
    const deviceQuantity = 0;
    const referenceQuantity = 0;
    const listingDeviceList = [];
    const verifyedStatus = { "kycverifyed": true, "addressverifyed": true, "phoneverifyed": false, "emailverifyed": false };
    const userInfo = {userEmail, userPhone, userNikName, userProfilePic, userAddress, verifyedStatus, userAccountId, ...accountInfo, tokenQuantity, deviceQuantity, referenceQuantity, listingDeviceList};
     setLoading(true);
    try {
        await createUserWithEmailAndPassword(auth, userEmail, userPassword)
        .then((userCredential) => {
          const users = userCredential.user;
          if (users.uid){
            const newuser = async () => {
              await axios.post('http://192.168.0.181:5000/addNewUser', {userInfo})
              .then((res) => {
                if (res.data.acknowledged){
                  navigation.navigate('Login')
                  alert('Account Created Successfully!');
                  sinOut();
                }
              })
            }
            newuser();
          }
        })
        
    } catch (err) {
        console.log(err);
        alert('Sign in failed: ' + err.message);
    } finally {
        setLoading(false);
    }
  }

  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>

        <View style={{paddingVertical: 20}}>
          <View style={{justifyContent: "center", alignItems: "center", paddingVertical: SIZES.xSmall}}>
            {profilePhoto ? 
             <Image source={{uri: profilePhoto}} style={{width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: COLORS.slate200}}/> : 
              <Image source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwVLdSDmgrZN7TkzbHJb8dD0_7ASUQuERL2A&usqp=CAU"}} 
              style={{width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: COLORS.slate200}}/>
            }
            {
            profilePhoto ? 
            <TouchableOpacity onPress={() =>  setProfilePhoto(null)} style={styles.photoActionBtn}>
              <Ionicons name="ios-close-sharp" size={24} color={COLORS.white500}/>
            </TouchableOpacity> : 
            <TouchableOpacity onPress={pickImage}  style={styles.photoActionBtn}>
              {
              profilePhotoLoading ? 
                <ActivityIndicator size={"small"} color={COLORS.white500} animating/> : 
                <Feather name="camera" size={16} color={COLORS.white500} />
              }
            </TouchableOpacity>
            }
          </View>
        </View>

        <View style={{flexDirection: "column", alignItems: "flex-start", gap: 20, paddingHorizontal: 50}}>
          <View style={styles.listItem}>
            <View style={styles.numberBox}><Text style={styles.itemTextTitle}>1</Text></View><Text style={styles.itemTextTitle}>Remove your eye glass (if have any).</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.numberBox}><Text style={styles.itemTextTitle}>2</Text></View><Text style={styles.itemTextTitle}>Place your face in photo frame.</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.numberBox}><Text style={styles.itemTextTitle}>3</Text></View><Text style={styles.itemTextTitle}>Make sure there is enough light around.</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.numberBox}><Text style={styles.itemTextTitle}>4</Text></View><Text style={styles.itemTextTitle}>Do not shake your face when capturing photo.</Text>
          </View>
          <View style={styles.listItem}>
            <View style={styles.numberBox}><Text style={styles.itemTextTitle}>5</Text></View><Text style={styles.itemTextTitle}>Blink your eyes several times to capture photo.</Text>
          </View>
        </View>
        <View style={{width: 300, marginVertical: 30}}>
          {
            loading ? 
            <TouchableOpacity style={styles.loginBtn}> 
              <ActivityIndicator color={COLORS.white500}/> 
            </TouchableOpacity> :
            <TouchableOpacity onPress={() => consfirmToAdd()} style={styles.loginBtn} >
              <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm </Text>
            </TouchableOpacity> 
          }
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  listItem:{
    gap: 10,
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "flex-start", 
  },
  numberBox:{
    backgroundColor: COLORS.slate200, 
    width: 25, 
    height: 25, 
    padding: 2,
    borderRadius: 50, 
    alignItems: "center", 
    justifyContent: "center",
  },
  itemTextTitle:{
    color: COLORS.slate300
  },
  photoActionBtn:{
    right: 0,
    width: 30, 
    bottom: 20, 
    height: 30, 
    borderRadius: 50, 
    alignItems: "center", 
    position: "absolute", 
    justifyContent: "center", 
    backgroundColor: COLORS.blue500, 
  },
  confirmBtn: {
    padding: 10,
    width: "100%", 
    borderRadius: 50, 
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: COLORS.blue500, 
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
  confirmBtnText:{
    fontSize: 16, 
    fontWeight: 400,
    color: COLORS.white500, 
  }
})
export default ProfilePhotoSelection