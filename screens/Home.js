import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Pressable
} from "react-native";
import React from "react";
import { images, icons, COLORS, SIZES } from '../constants';
import MyDeviceCrad from "../components/Crads/MyDeviceCrad";

const Home = ({navigation}) => {
  const myPhoneList =   [
    {
        "deviceImg": images.iphoneImg,
        "name": "iPhone 13 Pro max",
        "deviceStatus": true,
        "days": "75",
        "ram": "4GB",
        "rom": "64GB",
        "brand": "Apple",
        "color": "Selvet"
    },
    {
        "deviceImg": images.samsungImg,
        "name": "Samsung A13",
        "deviceStatus": false,
        "days": "315",
        "ram": "6GB",
        "rom": "128GB",
        "brand": "Samsung",
        "color": "Blue"
    },
    {
        "deviceImg": images.xiaomiImg,
        "name": "Xioami 13 Lite",
        "deviceStatus": true,
        "days": "21",
        "ram": "8GB",
        "rom": "128GB",
        "brand": "Mi",
        "color": "Black"
    },
    {
        "deviceImg": images.oppoImg,
        "name": "Oppo F21 Pro",
        "deviceStatus": false,
        "days": "75",
        "ram": "8GB",
        "rom": "256GB",
        "brand": "Oppo",
        "color": "Selvet"
    },
    {
        "deviceImg": images.vivovImg,
        "name": "Vivo F23",
        "deviceStatus": true,
        "days": "198",
        "ram": "8GB",
        "rom": "256GB",
        "brand": "Vivo",
        "color": "Silver"
    }
];
  return (
    <ScrollView showsVerticalScrollIndicator={false}>

      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.small, backgroundColor: COLORS.white500, paddingHorizontal: SIZES.small}}>
        <View style={{flexDirection: "column", justifyContent: "center", gap: 2}}>
          <Text style={{color: COLORS.slate300, fontSize: SIZES.medium}}>Welcome</Text>
          <Text style={{color: COLORS.slate500, fontSize: SIZES.xLarge, fontWeight: 600}}>Hossain Ahmed</Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center", gap: SIZES.xSmall}}>
          <View style={{borderRadius: 6, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: COLORS.slate200, padding: 10}}>
            <Image source={icons.notification} style={{width: SIZES.xLarge, height: SIZES.xLarge}}/>
          </View>
          <View style={{alignItems: "center", justifyContent: "center"}}>
            <Image source={images.profile} style={{borderRadius: 6, width: 45, height: 45}}/>
          </View>
        </View>
      </View>
      <View style={{paddingVertical: SIZES.small, paddingHorizontal: SIZES.small, backgroundColor: COLORS.white500}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: SIZES.xSmall, flex: 1}}>
          <View style={{ borderRadius: SIZES.xSmall}}>
            <ImageBackground source={images.tokenQuantityBg} style={styles.backgroundImage}>
            <Image source={icons.diamond} style={styles.boxIcosn}/>
            <Text style={styles.balanceTitle}>Token</Text>
            <Text style={styles.balanceValue}>2</Text>
            </ImageBackground>
          </View>
          <View style={{ borderRadius: SIZES.xSmall}}>
            <ImageBackground source={images.deviceQuantityBg} style={styles.backgroundImage}>
            <Image source={icons.chip} style={styles.boxIcosn}/>
            <Text style={styles.balanceTitle}>Device</Text>
            <Text style={styles.balanceValue}>5</Text>
            </ImageBackground>
          </View>
          <View style={{ borderRadius: SIZES.xSmall}}>
            <ImageBackground source={images.referenceQuantityBg} style={styles.backgroundImage}>
            <Image source={icons.usersGroup} style={styles.boxIcosn}/>
            <Text style={styles.balanceTitle}>Reference</Text>          
            <Text style={styles.balanceValue}>7</Text>
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
          <Image source={icons.downArrow} style={{width: 18, height: 18, transform: [{ rotate: '-90deg' }], tintColor: COLORS.slate300}}/>
        </View>
        <View style={{paddingVertical: 20}}>
            {
            myPhoneList.map((item, index) => <MyDeviceCrad key={index} item={item}/>)
            }
        </View>
      </View>

    </ScrollView>
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
