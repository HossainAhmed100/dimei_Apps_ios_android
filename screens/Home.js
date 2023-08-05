import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import React, { useCallback, useContext, useRef } from "react";
import { images, icons, COLORS, SIZES } from '../constants';
import MyDeviceCrad from "../components/Crads/MyDeviceCrad";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthProvider";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({navigation}) => {
  const { user, userLoding } = useContext(AuthContext);
  const firstTimeRef = useRef(true)
  const { isLoading, isError, data: myDevice = [], refetch } = useQuery({ 
    queryKey: ['myDevice', user?.userEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.1.3:5000/mydevice/${user?.userEmail}`);
      return res.data;
    } 
  })

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
         firstTimeRef.current = false;
         return;
      }
      refetch()
    }, [refetch])
  )

const viewDeviceDetails = (did) => {
  navigation.navigate('MyDeviceDetails', {deviceId: did})
}
  return (
    <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>

      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: SIZES.small, backgroundColor: COLORS.white500, paddingHorizontal: SIZES.small}}>
        <View style={{flexDirection: "column", justifyContent: "center", gap: 2}}>
          <Text style={{color: COLORS.slate300, fontSize: SIZES.medium}}>Welcome</Text>
          <Text style={{color: COLORS.slate500, fontSize: SIZES.xLarge, fontWeight: 600}}>{user?.userName}</Text>
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

      <View style={{paddingHorizontal: SIZES.small, backgroundColor: COLORS.white500}}>
      <View style={{flexDirection: "row", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "center"}}>
          <View style={{ borderRadius: SIZES.xSmall, flex: 1}}>
            <ImageBackground source={images.tokenQuantityBg} style={styles.backgroundImage}>
            <Image source={icons.diamond} style={styles.boxIcosn}/>
            <Text style={styles.balanceTitle}>Token</Text>
            <Text style={styles.balanceValue}>{user?.tokenQuantity}</Text>
            </ImageBackground>
          </View>
          <View style={{ borderRadius: SIZES.xSmall, flex: 1}}>
            <ImageBackground source={images.deviceQuantityBg} style={styles.backgroundImage}>
            <Image source={icons.deviceChip} style={styles.boxIcosn}/>
            <Text style={styles.balanceTitle}>Device</Text>
            <Text style={styles.balanceValue}>{user?.deviceQuantity}</Text>
            </ImageBackground>
          </View>
          <View style={{ borderRadius: SIZES.xSmall, flex: 1}}>
            <ImageBackground source={images.referenceQuantityBg} style={styles.backgroundImage}>
            <Image source={icons.usersGroup} style={styles.boxIcosn}/>
            <Text style={styles.balanceTitle}>Reference</Text>          
            <Text style={styles.balanceValue}>{user?.referenceQuantity}</Text>
            </ImageBackground>
          </View>
        </View>
        </View>

      <View style={{padding: SIZES.small, backgroundColor: COLORS.white500}}>
      <View style={{flexDirection: "row", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "center"}}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BuyToken')}>
          <Text style={styles.buttonText}>By Token</Text>
          <Image source={icons.shoppingCart} style={styles.buttonIcons}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddNewDevice')}>
          <Text style={styles.buttonText}>Add Device</Text>
          <Image source={icons.plus} style={styles.buttonIcons}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddReference')}>
          <Text style={styles.buttonText}>Add Ref</Text>
          <Image source={icons.userPlus} style={styles.buttonIcons}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingBottom: SIZES.xLarge, paddingHorizontal: SIZES.small, backgroundColor: COLORS.white500}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <Text style={{fontSize: SIZES.medium, fontWeight: 600, color: COLORS.slate500}}>My Device list</Text> 
        <TouchableOpacity onPress={() => navigation.navigate('Device')}>
        <Image source={icons.downArrow} style={{width: 18, height: 18, transform: [{ rotate: '-90deg' }], tintColor: COLORS.slate300}}/>
        </TouchableOpacity>
        </View>
        <View style={{paddingVertical: 20}}>
        {
          isLoading ? <View><ActivityIndicator /></View> : <View>
            {myDevice.length !== 0 ? <FlatList 
          data={myDevice}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <MyDeviceCrad viewDeviceDetails={viewDeviceDetails} item={item}/>
          )}
          refreshing={isLoading}
          // onRefresh={loadData}
        /> : <FlatList 
        data={[1]}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <View style={{minHeight: 200, alignItems: "center", justifyContent: "center"}}>
            <Text>Not Device Found</Text>
          </View>
        )}
        refreshing={isLoading}
        // onRefresh={loadData}
      />}
          </View>
        }
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
    gap: 2,
    flex: 1
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 600
  },
  buttonIcons: {
    width: 17, height: 17, tintColor: COLORS.white500
  }
})

export default Home;
