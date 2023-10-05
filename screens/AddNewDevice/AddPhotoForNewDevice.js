import React, { useState } from "react";  
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

const AddPhotoForNewDevice = ({navigation, route}) => {
  const deviceImeiInput  = route.params.deviceImeiInput;
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false)
    
    const onSubmit = async () => {
      const deviceIamges = [...selectedImages];
      navigation.navigate('AddDeviceInput', {deviceIamges, deviceImeiInput})  
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
    
    const handleImageRemove = (index) => {
      const newImages = [...selectedImages];
      newImages.splice(index, 1);
      setSelectedImages(newImages);
    };

  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
    <View style={{gap: 10, padding: 10}}>
      
      <View style={{padding: 10, backgroundColor: COLORS.slate100, borderRadius: 6}}>
        <Text style={{color: COLORS.slate300}}>Uplaod Your Device Photo And Security Paper !</Text>
      </View>

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
    {
    selectedImages.length === 0 ? 
    <Pressable onPress={() => alert("Please Select image")} style={[styles.confirmBtn, {opacity: 0.5}]} >
    <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}>Next Step</Text>
    </Pressable> : loading ?
    <Pressable style={styles.confirmBtn} >
    <ActivityIndicator color={COLORS.white500}/>
    </Pressable> :
    <TouchableOpacity onPress={onSubmit} style={styles.confirmBtn} >
    <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}>Next Step</Text>
    </TouchableOpacity>
    }
    
   
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
    },    
  });

export default AddPhotoForNewDevice;