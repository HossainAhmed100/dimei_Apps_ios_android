import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import { COLORS, SIZES, images } from "../constants";
import { Feather } from '@expo/vector-icons';
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../FirebaseConfig";

const PurchaseHistory = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [trsnData, setTrnsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async (email) => {
    setIsLoading(true)
    await axios.get(`http://192.168.1.4:5000/userTranstion/`)
    .then((res) => {
      setTrnsData(res.data)
      setIsLoading(false)
    }) 
  }
  useEffect(() => {
    setIsLoading(true)
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if(user?.uid){
        const email = user.email; 
        setUser(user)
        fetchData(email)
      }
    })
  }, [])

 return(
  <View>
  <View style={{backgroundColor: COLORS.slate100, minHeight: "100%"}}>
      <ImageBackground source={images.patterns} style={{resizeMode: 'cover', justifyContent: "center", paddingVertical: SIZES.medium, borderBottomRightRadius: 25,borderBottomLeftRadius: 25, overflow: "hidden"}}>
      <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <View style={{alignItems: "center", justifyContent: "center"}}>
      <Text style={{fontSize: SIZES.medium, color: COLORS.blue100}}>Total Token</Text>
      <Text style={{fontSize: 50, color: COLORS.white500, fontWeight: 700}}>29</Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: SIZES.small, borderBottomRightRadius: 20,borderBottomLeftRadius: 20, overflow: "hidden", margin: SIZES.medium, flexWrap: "wrap"}}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileShare')} style={{backgroundColor: COLORS.white500, padding: SIZES.small, alignItems: "center", justifyContent: "center", flexDirection: "column", borderRadius: SIZES.small, flex: 1}}>
        <Feather name="arrow-down-circle" size={SIZES.large} color={COLORS.blue500} />
        <Text style={{fontSize: SIZES.small , color: COLORS.blue500, fontWeight: 700, marginTop: 2}}>RECIEVE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BuyToken')} style={{backgroundColor: COLORS.white500, padding: SIZES.small, alignItems: "center", justifyContent: "center", flexDirection: "column", borderRadius: SIZES.small, flex: 1}}>
        <Feather name="shopping-cart" size={SIZES.large} color={COLORS.blue500} />
        <Text style={{fontSize: SIZES.small , color: COLORS.blue500, fontWeight: 700, marginTop: 2}}>BUY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TokenTransferInput')} style={{backgroundColor: COLORS.white500, padding: SIZES.small, alignItems: "center", justifyContent: "center", flexDirection: "column", borderRadius: SIZES.small, flex: 1}}>
        <Feather name="arrow-up-circle" size={SIZES.large} color={COLORS.blue500} />
        <Text style={{fontSize: SIZES.small , color: COLORS.blue500, fontWeight: 700, marginTop: 2}}>SEND</Text>
        </TouchableOpacity>
      </View>
      </View>
      </ImageBackground>
      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <Text style={{color: COLORS.slate500, fontSize: SIZES.medium, fontWeight: 500, padding: SIZES.small}}>Recent Transection</Text>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
        <TouchableOpacity style={{padding: SIZES.small}}>
        <Feather name="sliders" style={{transform: [{ rotate: '90deg'}]}} size={SIZES.large} color={COLORS.slate500} />
        </TouchableOpacity>
        <TouchableOpacity style={{padding: SIZES.small}}>
        <Feather name="clock" size={SIZES.large} color={COLORS.slate500} />
        </TouchableOpacity>
        </View>
      </View>
      
      <View style={{paddingHorizontal: SIZES.small}}>
      <FlatList 
        data={trsnData}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ListBox item={item}/>
        )}
        refreshing={isLoading}
        onRefresh={fetchData}
        contentContainerStyle={{ rowGap: 10 }}
      />
      </View>
  </View>
  </View>
 )
};

const ListBox = ({item}) => (
  <View>
    <View style={{backgroundColor: COLORS.white500, padding: SIZES.small, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: SIZES.small,}}>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
      <Image source={{uri: item.userProfilePic}} style={{width: 50, height: 50, borderRadius: 10, resizeMode: "contain"}}/>
      <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "center", marginLeft: 10}}>
      <Text style={{fontSize: SIZES.medium, color: COLORS.slate500, fontWeight: 500}}>{item.userName}</Text>
      <Text style={{fontSize: SIZES.small, color: COLORS.slate300}}>{item.status}</Text>
    </View>
    </View>
    <View style={{flexDirection: "column", alignItems: "flex-end", justifyContent: "center"}}>
      <Text style={{fontSize: SIZES.large, color: COLORS.slate500, fontWeight: 700}}>{item.tokenQuantity}</Text>
      <Text style={{fontSize: SIZES.small, color: COLORS.slate300}}>{item.date}</Text>
    </View>
  </View>
  </View>
)

export default PurchaseHistory;
