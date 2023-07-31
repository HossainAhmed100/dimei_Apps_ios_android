import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { COLORS, SIZES, icons } from '../constants';
import MyDeviceCrad from '../components/Crads/MyDeviceCrad';
const AllDevice = () => {

const [myDevice, setMyDevice] = useState('');
const [loading, setLoading] = useState(true)
const loadData = () => {
  setLoading(true);
  axios.get('http://192.168.1.4:5000/mydevice')
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
useEffect(() => {
  loadData()
}, []);
  return (
  <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
     <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          {/* <Image source={icons.search} style={{width: 30, height: 30, tintColor: COLORS.slate200}}/> */}
          <TextInput style={styles.searchInput} placeholder="Search UniId, Name, Brand. . . "/>
        </View>
        <TouchableOpacity style={styles.filterBtn}>
        <Image source={icons.search} style={styles.filterBtnImage}/>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <FlatList 
        style={{minHeight: "100%"}}
          data={myDevice}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <MyDeviceCrad item={item}/>
          )}
          refreshing={loading}
          onRefresh={loadData}
        />
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

export default AllDevice