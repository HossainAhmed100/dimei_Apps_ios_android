import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from 'react';
import { icons, COLORS, SIZES } from '../constants';
import DeviceCard from "../components/Crads/DeviceCard";

const Shop = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("iphone");
  const [refreshing, setRefreshing] = useState(false);
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setRefreshing(true);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const shuffledData = shuffleArray(data.data);
        setData(shuffledData);
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
        setRefreshing(false);
      });
  };

  const handleRefresh = () => {
    if (!refreshing) {
      fetchData();
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <View style={{backgroundColor: COLORS.white500}}>
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
          key={2}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => <DeviceCard key={item} />}
          contentContainerStyle={{ columnGap: 12 }}
         
          />
        ) : (
          <FlatList
          key={2}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item, index) => item.slug.toString()}
          renderItem={({ item }) => <DeviceCard item={item} />}
          contentContainerStyle={{ rowGap: 12, columnGap: 12 }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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