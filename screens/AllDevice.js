
import React, { useCallback, useContext, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Tab, TabView } from '@rneui/themed';
import axios from 'axios';
import { COLORS, SIZES, icons } from '../constants';
import MyDeviceCrad from '../components/Crads/MyDeviceCrad';
import DeviceAcceptCard from '../components/Crads/DeviceAcceptCard';
import { AuthContext } from '../context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';

const AllDevice = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const { user, userLoding } = useContext(AuthContext);
  const firstTimeRef = useRef(true)

  const { isLoading, isError, data: myDevice = [], refetch: refetchMyDevice } = useQuery({ 
    queryKey: ['myDevice', user?.userEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.1.2:5000/mydevice/${user?.userEmail}`);
      return res.data;
    } 
  })

  const { isLoading: reciveDeviceLoad, data: reciveDevice = [], refetch } = useQuery({ 
    queryKey: ['reciveDevice', user?.userEmail], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.1.2:5000/reciveTransferDevice/${user?.userEmail}`);
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
      refetchMyDevice()
    }, [refetch, refetchMyDevice])
  )

    const viewDeviceDetails = (did) => {
      navigation.navigate('MyDeviceDetails', {deviceId: did})
    }

    const acceotDevice = (did) => {
      navigation.navigate('VerifyDeviceAccept', {transferDeviceId: did})
    }
    return (
      <>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        containerStyle={(active) => ({
          backgroundColor: active ? COLORS.blue500 : COLORS.slate100,
        })}
        indicatorStyle={{
          backgroundColor: COLORS.blue200,
          height: 3,
        }}
      >
        <Tab.Item
          title="All Device"
          titleStyle={(active) => ({
              color: active ? COLORS.white500 : COLORS.slate500,
              fontSize: 12
          })}
        />
        <Tab.Item
          title="Recive Device"
          titleStyle={(active) => ({
              color: active ? COLORS.white500 : COLORS.slate500,
              fontSize: 12
          })}
        />
      </Tab>
  
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
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
          {
            !userLoding && <View style={{paddingHorizontal: SIZES.small}}>
            <FlatList 
            style={{minHeight: "100%"}}
            data={myDevice}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
                <MyDeviceCrad viewDeviceDetails={viewDeviceDetails} item={item}/>
            )}
            refreshing={isLoading}
            />
          </View>
          }
        </View>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
        <View style={{minHeight: "100%", backgroundColor: COLORS.white500}}>
          <View style={{padding: SIZES.small}}>
            <FlatList 
              style={{minHeight: "100%"}}
              data={reciveDevice}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                  <DeviceAcceptCard acceotDevice={acceotDevice} item={item}/>
              )}
              refreshing={reciveDeviceLoad}
              />
            </View>
        </View>
        </TabView.Item>
      </TabView>
    </>
    )
}

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: COLORS.white500,
    padding: SIZES.small,
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
  }
})

export default AllDevice