import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES, icons, images } from '../constants'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const AddNewDevice = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [showText, setShowText] = useState(false);
  const checkImeiPress = () => {
    setLoading(true);
    setShowText(false);
    setTimeout(() => {
      setLoading(false);
      setShowText(true);
    }, 3000);
  };
  const handleHidePress = () => {
    setShowText(false);
    setLoading(false);
  };
  return (
    <ScrollView style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
    <View style={{paddingHorizontal: SIZES.large}}>
      <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}> 
          {/* <Image source={icons.search} style={{width: 30, height: 30, tintColor: COLORS.slate200}}/> */}
          <TextInput style={styles.searchInput} placeholder="Enter IMEI e.g. 123456789012347"/>
        </View>
        <TouchableOpacity onPress={() => checkImeiPress()} style={styles.filterBtn}>
        <Image source={icons.search} style={styles.filterBtnImage}/>
        </TouchableOpacity>
      </View>
      
      {loading && <ActivityIndicator />}
      {showText &&  <View style={{borderWidth: 1, borderColor: COLORS.slate200, borderRadius: SIZES.small, marginVertical: SIZES.medium}}>
      <View style={{flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: SIZES.medium}}>
      <Image source={images.iphone13pro} style={{width: 120, height: 140, borderRadius: 4, marginRight: 10, resizeMode: "cover"}}/>
      </View>
      <View>
      <Text style={styles.dText}>Model : iPhone 13 Pro</Text>
      <Text style={styles.dText}>3.5mm jack : No</Text>
      <Text style={styles.dText}>Colors : Silver</Text>
      <Text style={styles.dText}>MISC Model : A2638</Text>
      <Text style={styles.dText}>Internal Ram : 6GB</Text>
      <Text style={styles.dText}>Battery Helth : 85%</Text>
      <Text style={styles.dText}>Weight : 204 g (7.20 oz)</Text>
      <Text style={styles.dText}>Internal Storage : 128GB</Text>
      <Text style={styles.dText}>Announced : 2021, September 14</Text>
      <Text style={styles.dText}>Chipset : Apple A15 Bionic (5 nm)</Text>
      <Text style={styles.dText}>GPU : Apple GPU (5-core graphics)</Text>
      <Text style={styles.dText}>SIM : Nano-SIM and eSIM or Dual SIM</Text>
      <Text style={styles.dText}>Battery : 128GBLi-Ion 3095 mAh, non-removable</Text>
      </View>

      <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: SIZES.medium, padding: SIZES.medium, borderTopColor: COLORS.slate200, borderTopWidth: 1,}}>
      <TouchableOpacity onPress={() => handleHidePress()} style={{alignItems: "center", justifyContent: "center", padding: SIZES.xSmall, backgroundColor: COLORS.red500, borderRadius: SIZES.small, flex: 1, flexDirection: "row"}}>
      <Ionicons name="close-outline" size={20} color={COLORS.white500} />
          <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AddDeviceInput")} style={{alignItems: "center", justifyContent: "center", padding: SIZES.xSmall, backgroundColor: COLORS.blue500, borderRadius: SIZES.small, flex: 1, flexDirection: "row"}}>
          <Text style={{color: COLORS.white500, fontSize: SIZES.medium}}>Add now</Text>
      <Ionicons name="add" size={20} color={COLORS.white500} />
      </TouchableOpacity>
      </View>
      </View>
}
      
     
      </View>
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.white500,
    paddingVertical: 10,
    justifyContent: "space-between",
    marginVertical: SIZES.small
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
    paddingHorizontal: SIZES.small,
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
    width: 25,
    height: 30,
    resizeMode: "contain",
    tintColor: COLORS.white500,
  },
  dText: {
    borderTopColor: COLORS.slate200,
    borderTopWidth: 1,
    padding: SIZES.xSmall
  }
})


export default AddNewDevice