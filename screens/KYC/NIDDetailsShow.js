import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants';
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons  } from '@expo/vector-icons';


const NIDDetailsShow = ({navigation, route}) => {
    const userData = route.params.userData ;
    const [checked, setChecked] = React.useState(true);
    const toggleCheckbox = () => {setChecked(!checked)};
    const nidData = {
      nidnumber: "5154895645", 
      usernidname: userData?.userName, 
      nameinBangla: userData?.nameinBangla, 
      town: "সদর", 
      city: "ময়মনসিংহ", 
      unionWard: "৪ং", 
      villageBlock: "চর চিফালী", 
      nidusermothersname: "Hidden", 
      niduserfathersname: "Hidden", 
      niduserdateofbirth: "19/02/2000",
      niduserpresentsaddress: "বাসা হোল্ডিং নাই বাড়ি, গ্রাম/রাস্তা: চর চিফালী, ডাকঘর: সুকদেব - ১৩০০,",
      niduserpermanentaddress: "বাসা হোল্ডিং নাই বাড়ি, গ্রাম/রাস্তা: চর চিফালী, ডাকঘর: সুকদেব - ১৩০০,",
    };
    const {control, handleSubmit, formState: { errors }} = useForm({defaultValues: {
      nidnumber: nidData.nidnumber, 
      usernidname: nidData.usernidname, 
      niduserfathersname: nidData.niduserfathersname, 
      nidusermothersname: nidData.nidusermothersname, 
      niduserdateofbirth: nidData.niduserdateofbirth,
      niduserpresentsaddress: nidData.niduserpresentsaddress,
      niduserpermanentaddress: nidData.niduserpermanentaddress,
    },})
    const onSubmit = (data) => {
      const userDetails = {nidData, ...userData};
      navigation.navigate('AditionalEnfoSelection', {userDetails})
    }
  return (
    <View style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
     <ScrollView style={{flex: 1, padding: SIZES.small}}>
     <View style={{ gap: 20 }}>
          <View>
            <Text style={styles.inputTextLabel}>NID Number</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter NID Number" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="nidnumber"
            />
          {errors.nidnumber && <Text style={{color: COLORS.red500}}>NID Number is required.</Text>}
          </View>
          <View>
            <Text style={styles.inputTextLabel}>Applicant's Name</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter your NID Name" onBlur={onBlur} onChangeText={onChange} value={value}/>
              )}
              name="usernidname"
            />
          {errors.usernidname && <Text style={{color: COLORS.red500}}>NID User Name is required</Text>}
          </View>
          <View>
            <Text style={styles.inputTextLabel}>Applicat's Father's Name</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter your Father's Name" onBlur={onBlur} onChangeText={onChange}value={value}/>
              )}
              name="niduserfathersname"
            />
          {errors.niduserfathersname && <Text style={{color: COLORS.red500}}>Your Father's Name required.</Text>}
          </View>
          <View>
            <Text style={styles.inputTextLabel}>Applicat's Motherr's Name</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Enter your Motherr's Name" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="nidusermothersname"
            />
          {errors.nidusermothersname && <Text style={{color: COLORS.red500}}>Your Motherr's Name required.</Text>}
          </View>
          <View>
            <Text style={styles.inputTextLabel}>Date of Birth</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} placeholder="Select Your Date of Birth" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="niduserdateofbirth"
            />
          {errors.niduserdateofbirth && <Text style={{color: COLORS.red500}}>Your Date of Birth required.</Text>}
          </View>
          <View>
            <Text style={styles.inputTextLabel}>Presents Address</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} multiline={true} placeholder="Write Your Presents Address" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="niduserpresentsaddress"
            />
          {errors.niduserpresentsaddress && <Text style={{color: COLORS.red500}}>Your Presents Addres is required.</Text>}
          </View>
          <View>
            <Text style={styles.inputTextLabel}>Parmanent Address</Text>
            <Controller control={control} rules={{required: true,}}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput style={styles.inputBox} multiline={true} placeholder="Write Your Parmanent Address" onBlur={onBlur} onChangeText={onChange} value={value} />
              )}
              name="niduserpermanentaddress"
            />
          {errors.userPassword && <Text style={{color: COLORS.red500}}>Your Parmanent Addres is required.</Text>}
          </View>
          <View style={{paddingBottom: 80
          }}>
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
    </ScrollView>
    <View style={{position: "absolute", bottom: 0, width: "100%"}}>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.blue500, flex: 1}}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.actionBtn}>
        <Text style={styles.actionBtnText}>BACK</Text>
    </TouchableOpacity>
    <View style={{flexDirection: "column", alignItems: "flex-start", paddingHorizontal: SIZES.xSmall}}> 
    <Text style={{color: COLORS.blue200, fontSize: SIZES.medium}}>2/3</Text>
    </View>
    <TouchableOpacity activeOpacity={.7} onPress={handleSubmit(onSubmit)} style={styles.actionBtn}>
        <Text style={styles.actionBtnText}>NEXT</Text>
    </TouchableOpacity>
    </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputBox: {
    fontSize: 16,
    width: "100%",
    paddingVertical: 6,
    borderBottomWidth: 1,
    color: COLORS.slate500,
    borderColor: COLORS.slate500,
  },
  inputTextLabel: {
    fontSize: 12,
    color: COLORS.slate400,
  },
  actionBtn: {
    alignItems: "center", 
    justifyContent: "center", 
    paddingHorizontal: SIZES.large, 
    paddingVertical: SIZES.medium
  },
  actionBtnText: {
    fontWeight: 500, 
    color: COLORS.white500, 
    fontSize: SIZES.medium,
    borderRadius: SIZES.small
  }
})

export default NIDDetailsShow