import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import React, { useEffect, useState } from "react";
import { images, icons, COLORS, SIZES } from '../constants';
import MyDeviceCrad from "../components/Crads/MyDeviceCrad";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const Home = ({navigation}) => {
  const [myDevice, setMyDevice] = useState('');
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true)
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if(user){
        const email = user.email;
        axios.get(`http://192.168.1.4:5000/signleUser/${email}`)
        .then((res) => {
          setUser(res.data)
          loadData(email)
        })    
      }
      setIsLoading(false)
    })
  }, [])
  const loadData = async (email) => {
      setLoading(true);
   await axios.get(`http://192.168.1.4:5000/mydevice/${email}`)
      .then(response => {
        if (response.data) {
          setMyDevice(response.data);
          setLoading(false)
        } else {
          console.log('No Device found in response');
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
const viewDeviceDetails = (did) => {
  navigation.navigate('MyDeviceDetails', {deviceId: did})
}
  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>

      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.small, backgroundColor: COLORS.white500, paddingHorizontal: SIZES.small}}>
        <View style={{flexDirection: "column", justifyContent: "center", gap: 2}}>
          <Text style={{color: COLORS.slate300, fontSize: SIZES.medium}}>Welcome</Text>
          <Text style={{color: COLORS.slate500, fontSize: SIZES.xLarge, fontWeight: 600}}>Hossain Ahmed</Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center", gap: SIZES.xSmall}}>
          <View style={{borderRadius: 6, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.slate200, padding: 10}}>
            <Image source={icons.notification} style={{width: SIZES.xLarge, height: SIZES.xLarge}}/>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("ProfileShare")} style={{alignItems: "center", justifyContent: "center"}}>
            {user?.userProfilePic ? <Image source={{uri: user?.userProfilePic}} style={{borderRadius: 6, width: 45, height: 45}}/> : <Image source={images.profile} style={{borderRadius: 6, width: 45, height: 45}}/>}
          </TouchableOpacity>
        </View>
      </View>

      <View style={{paddingVertical: SIZES.small, paddingHorizontal: SIZES.small, backgroundColor: COLORS.white500}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: SIZES.xSmall}}>
          <View style={{ borderRadius: SIZES.xSmall}}>
            <ImageBackground source={images.tokenQuantityBg} style={styles.backgroundImage}>
            <Image source={icons.diamond} style={styles.boxIcosn}/>
            <Text style={styles.balanceTitle}>Token</Text>
            <Text style={styles.balanceValue}>{user?.tokenQuantity}</Text>
            </ImageBackground>
          </View>
          <View style={{ borderRadius: SIZES.xSmall}}>
            <ImageBackground source={images.deviceQuantityBg} style={styles.backgroundImage}>
            <Image source={icons.chip} style={styles.boxIcosn}/>
            <Text style={styles.balanceTitle}>Device</Text>
            <Text style={styles.balanceValue}>{user?.deviceQuantity}</Text>
            </ImageBackground>
          </View>
          <View style={{ borderRadius: SIZES.xSmall}}>
            <ImageBackground source={images.referenceQuantityBg} style={styles.backgroundImage}>
            <Image source={icons.usersGroup} style={styles.boxIcosn}/>
            <Text style={styles.balanceTitle}>Reference</Text>          
            <Text style={styles.balanceValue}>{user?.referenceQuantity}</Text>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Pressable style={styles.button} onPress={() => navigation.navigate('BuyToken')}>
          <Text style={styles.buttonText}>By Token</Text>
          <Image source={icons.shoppingCart} style={styles.buttonIcons}/>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('AddNewDevice')}>
          <Text style={styles.buttonText}>Add Device</Text>
          <Image source={icons.plus} style={styles.buttonIcons}/>
          </Pressable>
          <Pressable style={styles.button} onPress={() => navigation.navigate('AddReference')}>
          <Text style={styles.buttonText}>Add Ref</Text>
          <Image source={icons.userPlus} style={styles.buttonIcons}/>
          </Pressable>
        </View>
      </View>
      
      <View style={{paddingBottom: SIZES.xLarge, paddingHorizontal: SIZES.small, backgroundColor: COLORS.white500}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <Text style={{fontSize: SIZES.medium, fontWeight: 600, color: COLORS.slate500}}>My Device list</Text> 
        <TouchableOpacity
        onPress={() => navigation.navigate('Device')}>
        <Image source={icons.downArrow} style={{width: 18, height: 18, transform: [{ rotate: '-90deg' }], tintColor: COLORS.slate300}}/>
        </TouchableOpacity>
        </View>
        <View style={{paddingVertical: 20}}>
        {myDevice ? <FlatList 
          data={myDevice}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <MyDeviceCrad viewDeviceDetails={viewDeviceDetails} item={item}/>
          )}
          refreshing={loading}
          onRefresh={loadData}
        /> : <FlatList 
        data={[1]}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={{minHeight: 200, alignItems: "center", justifyContent: "center"}}>
            <Text>Not Device Found</Text>
          </View>
        )}
        refreshing={loading}
        onRefresh={loadData}
      />}
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  balanceValue:{
    color: COLORS.white500,
    fontSize: SIZES.xLarge,
    fontWeight: 700
  },
  balanceTitle:{
    color: COLORS.white500,
    fontSize: SIZES.medium,
    marginTop: 5
  },
  backgroundImage: {
    resizeMode: 'cover',
    borderRadius: 10, 
    height: 105,
    width: 105,
    padding: SIZES.xSmall,
    overflow: "hidden",
  },
  boxIcosn:{
    width: 30, height: 30, tintColor: COLORS.white500
  },
  button: {
    backgroundColor: COLORS.blue500,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 600
  },
  buttonIcons: {
    width: 17, height: 17, tintColor: COLORS.white500
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
})

export default Home;
