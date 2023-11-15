import React, { useContext, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from "react-native";
import { COLORS, SIZES, images } from "../../constants";
import { Feather } from '@expo/vector-icons';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthProvider";
import { format } from "date-fns";

const TokenPurchaseHistory = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const {data: itemQuantity = [], refetch: fetchToken } = useQuery({ 
    queryKey: ['itemQuantity', user?.userEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.127:5000/useritemQuantity/${user?.userEmail}`);
      return res.data;
    } 
  })

  const { isLoading, data: trsnData = [], refetch } = useQuery({ 
    queryKey: ['trsnData'],
    queryFn: async () => {
      const res =  await axios.get(`http://192.168.0.127:5000/userTranstion/${user?.userEmail}`);
      return res.data;
    } 
  })
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Refresh the data
    await fetchToken(); // Refresh the data
    setRefreshing(false);
  };
 return(
  <View>
  <View style={{backgroundColor: COLORS.slate100, minHeight: "100%"}}>
      <ImageBackground source={images.patterns} style={style.imageBgContainer}>
      <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <View style={{alignItems: "center", justifyContent: "center"}}>
      <Text style={{fontSize: SIZES.medium, color: COLORS.blue100}}>Total Token</Text>
      <Text style={{fontSize: 50, color: COLORS.white500, fontWeight: 700}}>
        {itemQuantity ? itemQuantity?.tokenQuantity :<ActivityIndicator /> }
      </Text> 
      </View>
      <View style={style.actionBtnContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileShare')} style={style.actionButton}>
        <Feather name="arrow-down-circle" size={SIZES.large} color={COLORS.blue500} />
        <Text style={style.actionButtonText}>RECIEVE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BuyToken')} style={style.actionButton}>
        <Feather name="shopping-cart" size={SIZES.large} color={COLORS.blue500} />
        <Text style={style.actionButtonText}>BUY</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TokenTransferInput')} style={style.actionButton}>
        <Feather name="arrow-up-circle" size={SIZES.large} color={COLORS.blue500} />
        <Text style={style.actionButtonText}>SEND</Text>
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
      
      <View style={{paddingHorizontal: SIZES.small, minHeight: "100%"}}>
      <FlatList data={trsnData} keyExtractor={item => item.date}
        renderItem={({item}) => (<ListBox item={item}/>)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ rowGap: 10 }}
      />
      </View>
  </View>
  </View>
 )
};

const ListBox = ({item}) => (
  <View>
    <View style={style.activityListContainer}>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
      <Image source={{uri: item.userProfilePic}} style={{width: 50, height: 50, borderRadius: 10, resizeMode: "contain"}}/>
      <View style={{flexDirection: "column", alignItems: "flex-start", justifyContent: "center", marginLeft: 10}}>
        <Text style={{fontSize: SIZES.medium, color: COLORS.slate500, fontWeight: 500}}>{item.titleName}</Text>
        <Text style={style.deviceListText}>{item.status}</Text>
      </View>
    </View>
    <View style={{flexDirection: "column", alignItems: "flex-end", justifyContent: "center"}}>
      <Text style={{fontSize: SIZES.large, color: COLORS.slate500, fontWeight: 500}}>{item.transtionQuantity}</Text>
      {item?.date && <Text style={style.deviceListText}>{format(new Date(item?.date), 'yyyy-mm-dd hh:mm a')}</Text>}
    </View>
  </View>
  </View>
)

const style = StyleSheet.create({
  activityListContainer:{
    backgroundColor: COLORS.white500, 
    padding: SIZES.small, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    borderRadius: 4
  },
  imageBgContainer:{
    resizeMode: 'cover', 
    justifyContent: "center", 
    paddingVertical: SIZES.medium, 
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25, 
    overflow: "hidden"
  },
  actionBtnContainer:{
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: SIZES.small, 
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20, 
    overflow: "hidden", 
    margin: SIZES.medium, 
    flexWrap: "wrap"
  },
  actionButton:{
    backgroundColor: COLORS.white500, 
    padding: SIZES.small, 
    alignItems: "center", 
    justifyContent: "center", 
    flexDirection: "column", 
    borderRadius: SIZES.small, 
    flex: 1
  },
  actionButtonText:{
    fontSize: SIZES.small , 
    color: COLORS.blue500, 
    fontWeight: 700, 
    marginTop: 2
  },
  deviceListText:{
    marginBottom: 3, 
    color: COLORS.slate300, 
    fontSize: SIZES.small
  }
})

export default TokenPurchaseHistory;
