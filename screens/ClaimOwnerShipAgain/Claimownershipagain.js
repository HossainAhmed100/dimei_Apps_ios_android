import React, { useState } from "react";  
import { Image, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Pressable, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import { format } from "date-fns";
import { Divider } from '@rneui/themed';  
import { MaterialIcons  } from '@expo/vector-icons';


const Claimownershipagain = ({navigation, route}) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const todyDate = new Date().toISOString();
    const [checked, setChecked] = useState(false);
    // const toggleCheckbox = () => setChecked(!checked);
    const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {deviceNote: ""},});
    
    const onSubmit = async (data) => {
      const deviceIamges = [...selectedImages];
      // navigation.navigate('AddDeviceInput', {deviceIamges})  ;
      console.log(data)

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

    const toggleCheckbox = () => {setChecked(!checked)};

  return (
    <View style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
    <View style={{padding: 10}}>
    <View style={{gap: 6, paddingBottom: 20}}>
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
            <TouchableOpacity onPress={() => handleImageRemove(index)} style={styles.selectedImgRemoveBtn}>
                <AntDesign name="close" size={16} color={COLORS.slate500} />
            </TouchableOpacity>
            <Image source={{ uri }} style={{ width: 103, height: 100, resizeMode: "contain" }} />
          </View>
        ))}
      </View>
      <Text>{`Selected: ${selectedImages.length}/10`}</Text>
    </View>
    <Divider />
    <View style={{gap: SIZES.small, marginVertical: 20}}>
      <View>
        <Text style={styles.inputTextLabel}>Date *</Text>
        <TextInput style={styles.inputBox} placeholder="Device Listing Date" value={format(new Date(todyDate), 'yyyy-MM-dd')} />
      </View>
      <View>
          <Text style={styles.inputTextLabel}>Note *</Text>
          <Controller control={control} rules={{required: true,}}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput style={styles.messageIntputBox} multiline={true} numberOfLines={3} 
              placeholder={"Write About Your Devcie "} onBlur={onBlur} onChangeText={onChange} value={value} />
            )}
            name="deviceNote"
          />
        {errors.deviceNote && <Text style={{color: COLORS.red500}}>Write Some Message Please</Text>}
      </View>
      <View style={{paddingVertical: 10}}>
        <TouchableOpacity onPress={toggleCheckbox}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {checked ?  <MaterialIcons name="check-box" size={24} color={COLORS.blue500} /> : 
            <MaterialIcons name="check-box-outline-blank" size={24} color={COLORS.slate400} />}
            <Text style={{marginLeft: 4}}>I aggre with <Text style={{color: COLORS.blue500, fontWeight: 500}}>terms</Text> and  
            <Text style={{color: COLORS.blue500, fontWeight: 500}}>condition</Text></Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    </View>



    <View style={{ position: "absolute", bottom: 15, width: "100%", alignItems: "center", padding: 10 }}>
    {
    selectedImages.length === 0 ? 
    <Pressable onPress={() => alert("Please Select image")} style={[styles.confirmBtn, {opacity: 0.5}]} >
    <Text style={styles.confirmBtnText}>Confirm</Text>
    </Pressable> : loading ?
    <Pressable style={styles.confirmBtn} >
    <ActivityIndicator color={COLORS.white500}/>
    </Pressable> :
    <TouchableOpacity onPress={onSubmit} style={styles.confirmBtn} >
    <Text style={styles.confirmBtnText}>Confirm</Text>
    </TouchableOpacity>
    }
    </View>
    </View>
  )
}


const styles = StyleSheet.create({
    messageIntputBox: {
      paddingVertical: SIZES.xSmall,
      paddingHorizontal: SIZES.medium,
      borderRadius: SIZES.xSmall,
      marginTop: 6,
      width: "100%",
      borderWidth: 1,
      borderColor: COLORS.slate200,
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
      justifyContent: "flex-start", 
      borderColor: COLORS.slate100, 
    },
    confirmBtn: {
        width: "100%",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: SIZES.small,
        borderColor: COLORS.blue500,
        paddingVertical: SIZES.small,
        paddingHorizontal: SIZES.large,
        backgroundColor: COLORS.blue500,
    },
    confirmBtnText: {
      fontSize: SIZES.medium, 
      fontWeight: 600, color: "#fff"
    },
    selectedImgRemoveBtn:{
        padding: 2,
        zIndex: 100, 
        position: "absolute", 
        borderBottomRightRadius: 5, 
        backgroundColor: COLORS.slate200, 
    },
});


export default Claimownershipagain