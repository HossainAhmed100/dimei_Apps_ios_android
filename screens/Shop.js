import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from 'react';
import { icons, COLORS, SIZES } from '../constants';
import DeviceCard from "../components/Crads/DeviceCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Shop = ({navigation, route}) => {

  const [searchInput, setSearchInput] = useState("iphone");
  const [refreshing, setRefreshing] = useState(false);
  const url = `http://192.168.1.4:5000/getAllSellingDevice`;

  const { isLoading, data: sellingDeviceList = [], refetch } = useQuery({ 
    queryKey: ['sellingDeviceList', refreshing], 
    queryFn: async () => {
      const res = await axios.get(url);
      return res.data;
    } 
  })
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // Refresh the data
    setRefreshing(false);
  };

  const viewDeviceDetails = (did) => {
    navigation.navigate('SellingDeviceDetails', {deviceId: did})
  }

  return (
    <View style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
      <View  style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 5, backgroundColor: COLORS.white500, borderColor: COLORS.slate200, borderBottomWidth: 1, borderTopWidth: 1, paddingVertical: 15, paddingHorizontal: 10}}>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5}}>
          <Image source={icons.location} style={{width: 20, height: 20, resizeMode: "cover", tintColor: COLORS.blue500}}/>
          <Text style={{fontSize: SIZES.medium, color: COLORS.slate300}}>Jatrabari</Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5}}>
          <Text style={{fontSize: SIZES.medium, color: COLORS.slate300}}>Found 12,600 Device </Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Image source={icons.search} style={{width: 30, height: 30, tintColor: COLORS.slate200}}/>
          <TextInput style={styles.searchInput} placeholder="Search Devices. . . "/>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
        <Image source={icons.filter} style={styles.filterBtnImage}/>
        </TouchableOpacity>
      </View>
      <View  style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tabBtn}>
          <Text style={styles.tabBtnText}>Brand: Apple</Text>
          <Image source={icons.close} style={styles.tabBtnIcon}/>
        </View>
        <View style={styles.tabBtn}>
          <Text style={styles.tabBtnText}>Apple 130 Pro max</Text>
          <Image source={icons.close} style={styles.tabBtnIcon}/>
        </View>
        <View style={styles.tabBtn}>
          <Text style={styles.tabBtnText}>Storage: 128GB</Text>
          <Image source={icons.close} style={styles.tabBtnIcon}/>
        </View>
        </ScrollView>
      </View>
    <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
        {isLoading ? (
         <FlatList
         numColumns={2}
         showsVerticalScrollIndicator={false}
         data={[1,2,3,4]}
         keyExtractor={(item) => item}
         renderItem={({ item }) => (
          <View style={styles.loadingCardContainer}>
           <View style={{padding: 6,width: "100%", gap: 4 }}>
           <View style={{width: "100%", backgroundColor: COLORS.slate100, height: 150, borderRadius: 6}}></View>
           <View style={{backgroundColor: COLORS.slate100, height: 15, borderRadius: 4}}></View>
           <View style={{backgroundColor: COLORS.slate100, height: 15, borderRadius: 4}}></View>
           </View>
           </View>
         )}
         contentContainerStyle={{ rowGap: 12, columnGap: 12 }}
         refreshControl={
           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
         }
       />
        ) : (
          <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={sellingDeviceList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <DeviceCard viewDeviceDetails={viewDeviceDetails} item={item} />}
          contentContainerStyle={{ rowGap: 12, columnGap: 12 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingCardContainer:{
    borderWidth: 1, 
    borderColor: COLORS.slate100, 
    borderRadius: SIZES.xSmall, 
    flexDirection: "column", 
    alignItems: "flex-start", 
    overflow: "hidden",
    width: "48%",
    margin: "1%",
},
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.white500,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  searchWrapper: {
    borderWidth: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexGrow: 1,
    marginRight: 10,
    borderRadius: SIZES.small,
    borderColor: COLORS.slate200,
    backgroundColor: COLORS.white500,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    paddingHorizontal: SIZES.medium,
  },
  filterBtn: {
    alignItems: "center", 
    justifyContent: "center", 
    backgroundColor: COLORS.blue500, 
    borderRadius: SIZES.small,
    padding: 8,
    width: 50,
    height: 50
  },
  filterBtnImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: COLORS.white500,
  },
  tabContainer:{
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    gap: 5, 
    backgroundColor: COLORS.white500, 
    paddingVertical: 5, 
    paddingHorizontal: 10
  },
  tabBtn:{
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center", 
    gap: 5, 
    paddingHorizontal: 10, 
    paddingVertical: 7,
    borderRadius: SIZES.xSmall, borderWidth: 1, 
    borderColor: COLORS.slate200, marginRight: 10
  },
  tabBtnText:{fontSize: SIZES.small, color: COLORS.slate500},
  tabBtnIcon:{width: 15, height: 15, resizeMode: "cover", tintColor: COLORS.slate500},
})



export default Shop