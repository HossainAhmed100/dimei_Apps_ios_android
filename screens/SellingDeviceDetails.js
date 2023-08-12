import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, StyleSheet, Pressable} from 'react-native';
import React, { useCallback, useRef } from 'react';
import { COLORS, SIZES } from '../constants';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import { Feather } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';


const SellingDeviceDetails = ({navigation, route}) => {
    const queryClient = useQueryClient()
  const deviceId = route.params.deviceId ;
  const firstTimeRef = useRef(true)

  const { isLoading, data: myDevice = [], refetch } = useQuery({ 
    queryKey: ['myDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.1.5:5000/getSellingDevcieDetails/${deviceId}`);
      return res.data;
    } 
  });

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
         firstTimeRef.current = false;
         return;
      }
      refetch()
    }, [refetch])
  );
  


  return (
    <ScrollView style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
    {myDevice?.deviceIamges &&  <Image source={{uri: myDevice?.deviceIamges[0].uploadUrl}} style={{width: "100%", height: 250, resizeMode: "contain"}}/>}
    <Divider />
    <View>
    <View style={{padding: 10, gap: 4, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
    <View>
    <Text style={{fontSize: SIZES.large, color: COLORS.slate500, fontWeight: 600}}>Tk. {myDevice?.devciePrice}</Text>
    <Text style={{fontSize: SIZES.medium, color: COLORS.slate300, fontWeight: 600}}>{myDevice?.sellingTitle}</Text>
    </View>
    <Pressable style={{backgroundColor: COLORS.slate100, borderRadius: 10, padding: 10, alignItems: "center", justifyContent: "center"}}>
    <Feather name="heart" size={24} color={COLORS.slate300}/>
    </Pressable>
    </View>
    <Divider />
    <View style={{padding: 10, flexDirection: "column"}}>
      <View style={{flexDirection: "row", alignItems: "center"}}>
      <Text style={{fontSize: SIZES.small, color: COLORS.slate300, fontWeight: 500}}>Owner  -  </Text>
      <Text style={{fontSize: SIZES.medium, color: COLORS.slate500, fontWeight: 500}}>{myDevice?.ownerName}</Text>
      </View>
      <View style={{flexDirection: "row", alignItems: "center"}}>
      <Text style={{fontSize: 14, color: COLORS.slate300, fontWeight: 400}}>{myDevice?.listingAddress} - </Text>
      <Text style={{fontSize: 14, color: COLORS.slate300, fontWeight: 400}}>{format(new Date(myDevice?.createdAt), 'hh:mm a')}</Text>
      </View>
    </View>
    <Divider />
    </View>
     <View style={{padding: 10, }}>
        {
          isLoading ? <ActivityIndicator size={"large"}/> : <PhoneDetailsList item={myDevice}/>
        }
      </View>
      <Divider />
      <View style={{padding: 10, }}>
      <Text style={{fontSize: SIZES.medium, color: COLORS.slate500, fontWeight: 500}}>Description</Text>
      <Text style={{fontSize: 14, color: COLORS.slate300, fontWeight: 400, lineHeight: 20}}>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
      </Text>
      </View>
    </ScrollView>
  )
}

const PhoneDetailsList = ({item}) => (
    <View style={{flexDirection: "column", gap: 10}}>
      <View style={styles.listItem}>
      <Text style={styles.listItemText}>Model Name :</Text>
      <Text style={styles.listItemText}>{item?.deviceModelName}</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemText}>Brand :</Text>
      <Text style={styles.listItemText}>{item?.deviceBrand}</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemText}>Ram :</Text>
      <Text style={styles.listItemText}>{item?.ram} GB</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemText}>Rom :</Text>
      <Text style={styles.listItemText}>{item?.storage} GB</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemText}>Color Varient :</Text>
      <Text style={styles.listItemText}>{item?.colorVarient}</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemText}>Have Original Box :</Text>
      <Text style={styles.listItemText}>{item?.haveOriginalBox ? "Yes" : "No"}</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemText}>Battery :</Text>
      <Text style={styles.listItemText}>{item?.battery}</Text>
      </View>
    </View>
  )
  
  const styles = StyleSheet.create({
    listItem: {flexDirection: "row", alignItems: "center", justifyContent: 'space-between'},
    listItemText: {color: COLORS.slate500, fontWeight: 500},
  })

export default SellingDeviceDetails