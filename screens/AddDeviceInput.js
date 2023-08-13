import { Image, ScrollView, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import React, { useContext, useState } from "react";  
import { COLORS, SIZES, images } from '../constants';
import { KeyboardAvoidingView } from "react-native";
import { ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
// import CheckBox from 'react-native-check-box';
import { CheckBox } from '@rneui/themed';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';

const AddDeviceInput = ({ navigation }) => {
    const [checked, setChecked] = React.useState(true);
    const toggleCheckbox = () => setChecked(!checked);
    const [deviceImei, setDeviceImei] = useState('');
    const [listingDate, setListingDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const { user, userLoding } = useContext(AuthContext);
    const addDevice = async () => {
    const modelName =  "Iphone 13 Pro";
    const brand = "Apple";
    const colorVarient = "Silver";
    const ram = "6GB";
    const storage = "128GB";
    const battery = "128GBLi-Ion 3095 mAh";
    const sim = false;
    const sim_slot = "Dual SIM";
    const gpu = "Apple GPU (5-core graphics)";
    const Chipset = "Apple A15 Bionic (5 nm)";
    const Announced = "2021, September 14";
    const MISC_Model = "A2638";
    const threePointFive_mm_jack = true;
    const deviceStatus = "Good";
    const listingDate = "May/12/2023";
    const listingAddress = "Dhaka, Bangladesh";
    const daysUsed = "0";
    const deviceImei = "4658925796458359";
    const devicePicture = "https://i.ibb.co/YWkJ22y/iphone13pro.jpg";
    const ownerEmail = user?.userEmail;
    const devcieOrigin = value;
    const haveBoxde = false;
    const secretCode = "";
    const batteryRemovable = false;
    const deviceTransferStatus = false;
    const deviceSellingStatus = false;
    
    const devcieInfo = {modelName, brand, colorVarient, ram, storage, battery, secretCode, batteryRemovable, sim, sim_slot, gpu, Chipset, Announced, MISC_Model, threePointFive_mm_jack, devcieOrigin, deviceStatus, devicePicture, listingAddress, listingDate, daysUsed, deviceImei, haveBoxde, ownerEmail, deviceTransferStatus, deviceSellingStatus};
     setLoading(true);
    try {
        await axios.post('http://192.168.1.2:5000/addNewDevice', {devcieInfo})
        .then((res) => {
        if (res.data.acknowledged){
            alert('Check your email');
            navigation.navigate('Home')
        }
        })
    } catch (err) {
        console.log(err);
        alert('Device Added Feild');
    } finally {
        setLoading(false);
    }
  }; 
const itemsSelect = [
    {label: "I Bought this Devcie new", value: "mynewDevice"},
    {label: "I Found This Device", value: "finddevice"}
]
  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
        <View style={{padding: SIZES.small}}>
            <View style={styles.cardContainer}>
                <Image source={images.iphone13pro} resizeMode="contain" style={{ borderRadius: 4, marginRight: 10, width: 100, height: 100}}/>
                <View>
                    <Text style={{fontSize: SIZES.medium, fontWeight: 500, color: COLORS.slate500}}>iPhone 13 Pro</Text>
                    <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Ram : 6GB</Text>
                    <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Storage : 128GB</Text>
                    <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Brand : Apple</Text>
                    <Text style={{marginBottom: 3, color: COLORS.slate300, fontSize: SIZES.small}}>Color : Silver</Text>
                </View>
            </View>
        <View style={styles.container}>
        <View>
        <KeyboardAvoidingView behavior='padding'>
        <View style={{ gap: SIZES.medium }}>
            <View>
            <Text style={{color: COLORS.slate500}}>Device IMEI *</Text>
            <TextInput
                style={styles.inputBox}
                placeholder="Old Password"
                autoCapitalize='none' 
                onChangeText={(text) => setDeviceImei(text)}
                value={"4658925796458359"}
            />
            </View>
            <View>
            <Text style={{color: COLORS.slate500}}>Listing Date *</Text>
            <TextInput
                style={styles.inputBox}
                placeholder="Confirm Password"
                onChangeText={(text) => setListingDate(text)}
                value={"7/26/2023"}
            />
            
            </View>
            {/* <View>
            <Text style={{color: COLORS.slate500}}>Reference</Text>
            <View style={styles.referenceInputBox}>
            <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: 10}}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 10}}>
            <Image source={{uri: "https://scontent.fdac24-3.fna.fbcdn.net/v/t39.30808-6/329413355_1127951397871370_7922564190006557504_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeF-UePABmkG1uQtAUJt3yEZpOGY48SGGvik4ZjjxIYa-Olrwqvc4ftFWpiMcK0D65YSo6ZG_uGEwwsjlMR4zWDK&_nc_ohc=TNbreiFkDnkAX-Qbw4S&_nc_ht=scontent.fdac24-3.fna&oh=00_AfC5hu5CX7Gcnl6dDWlyNs07qy8cG3RvTfS3kBOntsk8qA&oe=64C65E62"}} style={{borderRadius: 6, width: 35, height: 35}}/>
            <Text>Din islam</Text>
            </View>
            <Ionicons name="close-outline" size={20} color={COLORS.slate300} />
            </View>
            <View style={{width: "100%"}}>
            <Divider />
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 10}}>
            <Image source={{uri: "https://scontent.fdac24-4.fna.fbcdn.net/v/t39.30808-6/355132375_947562279835069_1334785686561488687_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHHtN1wxZ7Qoqh8vwhkbkCKhM1o-7zlIv6EzWj7vOUi_oWf04NR1LLxwF1Bz-DSWyezZDB1uQ_iKoULtJ9eLu6-&_nc_ohc=OaLd5JqEld8AX93-voz&_nc_ht=scontent.fdac24-4.fna&oh=00_AfAufPcPO0Go9QPCrrkmsZikzlYoXF0SjSqmT7uldEPaGw&oe=64C70281"}} style={{borderRadius: 6, width: 35, height: 35}}/>
            <Text>Ahasan Habib</Text>
            </View>
            <Ionicons name="close-outline" size={20} color={COLORS.slate300} />
            </View>
            <View style={{width: "100%"}}>
            <Divider />
            </View>
            <View style={{width: "100%"}}>
            <Pressable style={{backgroundColor: COLORS.slate100, width: "100%", paddingVertical: SIZES.small, paddingHorizontal: SIZES.large, borderRadius: SIZES.small, alignItems: "center", justifyContent: "center", borderColor: COLORS.slate200, borderWidth: 1,}} >
            <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: COLORS.slate500 }}>Add Reference +</Text>
            </Pressable>
            </View>
            </View>
            </View>
            </View> */}
            <View style={{zIndex: 100}}>
            <Text style={{color: COLORS.slate500, marginBottom: 6}}>Device origin *</Text>
            <DropDownPicker
            open={open}
            value={value}
            items={itemsSelect}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder='Select Device origin'
            style={{
               borderColor: COLORS.slate200
              }}
            bottomOffset={20}
            dropDownDirection='BOTTOM'
            mode='BADGE'
            />
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start"}}>
            {/* <CheckBox
            isChecked={isChecked}
            onClick={() => setIsChecked(!isChecked)}
            checkedCheckBoxColor={COLORS.blue500}
            uncheckedCheckBoxColor={COLORS.slate500}
            /> */}
             <CheckBox
           checked={checked}
           onPress={toggleCheckbox}
           // Use ThemeProvider to make change for all checkbox
           iconType="material-community"
           checkedIcon="checkbox-marked"
           uncheckedIcon="checkbox-blank-outline"
           checkedColor={COLORS.blue500}
         />
            <Text style={{marginLeft: 4}}>I aggre with <Text style={{color: COLORS.blue500}}>terms</Text> and <Text style={{color: COLORS.blue500}}>condition</Text></Text>
            </View>
        </View>
        </KeyboardAvoidingView>
        <View style={{ flexDirection: "column", gap: SIZES.small, marginTop: 30 }}>
        {
        loading ? <Pressable style={styles.loginBtn}> 
        <ActivityIndicator size="large" color={COLORS.white500}/> 
        </Pressable> : <Pressable onPress={() => addDevice()} style={styles.loginBtn} >
        <Text style={{ fontSize: SIZES.medium, fontWeight: 600, color: "#fff" }}> Confirm </Text>
        </Pressable>
        }
            
       
        </View>
        </View>
    </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    container: {
        backgroundColor: COLORS.white500,
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
        referenceInputBox: {
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.medium,
        borderRadius: SIZES.xSmall,
        marginTop: 6,
        width: 300,
        borderWidth: 1,
        borderColor: COLORS.slate200,
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
        googleLoginBtn: {
        backgroundColor: COLORS.white500,
        width: 300,
        paddingVertical: SIZES.small,
        borderRadius: SIZES.xSmall,
        flexDirection: "row",
        gap: SIZES.small,
        alignItems: "center",
        justifyContent: "center",
        borderColor: COLORS.slate200,
        borderWidth: 1,
        }
});

export default AddDeviceInput
