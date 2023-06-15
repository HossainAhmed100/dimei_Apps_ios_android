import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, images, SIZES, icons } from '../constants';
import MyDeviceCrad from '../components/Crads/MyDeviceCrad';
const AllDevice = () => {
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
  <View>
     <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          {/* <Image source={icons.search} style={{width: 30, height: 30, tintColor: COLORS.slate200}}/> */}
          <TextInput style={styles.searchInput} placeholder="Search UniId, Name, Brand. . . "/>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
        <Image source={icons.search} style={styles.filterBtnImage}/>
        </TouchableOpacity>
      </View>
  <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: COLORS.white500, paddingHorizontal: 10, paddingVertical: 10}}>
    {myPhoneList.map((item, index) => <MyDeviceCrad key={index} item={item}/>)}
  </ScrollView>
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

export default AllDevice