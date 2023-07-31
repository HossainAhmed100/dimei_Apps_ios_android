import { View, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SIZES, icons } from '../constants';
import AddReferenceCard from '../components/Crads/AddReferenceCard';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import axios from 'axios';




const AddressReference = () => {
  const [user, setUser] = useState(null);
  const [trsnData, setTrnsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true)
    await axios.get(`http://192.168.1.4:5000/userReference/`)
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
      }
    })
    fetchData()
  }, [])
  return (
    <View style={styles.container}>
      <View style={{padding: SIZES.small}}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Image source={icons.search} style={{width: 30, height: 30, tintColor: COLORS.slate200}}/>
          <TextInput style={styles.searchInput} placeholder="Search with ID, Number, email..."/>
        </View>
        <TouchableOpacity onPress={() => checkImeiPress()} style={styles.filterBtn}>
        <Image source={icons.search} style={styles.filterBtnImage}/>
        </TouchableOpacity>
      </View>
      <View style={{gap: 10}}>
      <FlatList 
        data={trsnData}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <AddReferenceCard item={item}/>
        )}
        refreshing={isLoading}
        onRefresh={fetchData}
        contentContainerStyle={{ rowGap: 10 }}
      />
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white500,
    minHeight: "100%"
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.white500,
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
    padding: 10
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
})

export default AddressReference