import React, { useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, StyleSheet, Pressable, FlatList, useWindowDimensions, Linking} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import axios from 'axios';
import { Divider } from '@rneui/themed';
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { format } from 'date-fns';

const SellingDeviceDetails = ({navigation, route}) => {
  const {width} = useWindowDimensions();
  const deviceId = route.params.deviceId;
  const firstTimeRef = useRef(true)

  const { isLoading, data: myDevice = [], refetch } = useQuery({ 
    queryKey: ['myDevice', deviceId], 
    queryFn: async () => {
      const res = await axios.get(`http://192.168.0.163:5000/getSellingDevcieDetails/${deviceId}`);
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


  const clickToPhoneCall = (phoneNumber) => {

    Linking.openURL(`tel:${phoneNumber}`)

  }

  const message = (did) => {

    navigation.navigate('DeviceSellingChat', {
      deviceId: did,
      deviceImg: myDevice?.deviceIamges[0],
      devciePrice: myDevice?.devciePrice,
      sellingTitle: myDevice?.sellingTitle,
    })

  }
  
  const devicePrice = myDevice?.devciePrice;
  const formattedPrice = devicePrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <View>
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: COLORS.white500, minHeight: "100%"}}>
    
    {myDevice?.deviceIamges && 
    <ImageSilderShow myDevice={myDevice} width={width}/>
    }
    <Divider />
    <View>
    <View style={{padding: 10, gap: 4, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
    <View>
    <Text style={{fontSize: SIZES.large, color: COLORS.slate500, fontWeight: 600}}>Tk. {formattedPrice}</Text>
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
      {myDevice?.createdAt && <Text style={{fontSize: 14, color: COLORS.slate300, fontWeight: 400}}>{format(new Date(myDevice?.createdAt), 'hh:mm a')}</Text>}
      </View>
    </View>
    <Divider />
    </View>
     <View style={{paddingVertical: 20, paddingHorizontal: 10, }}>
        {
          isLoading ? <ActivityIndicator size={"large"}/> : <PhoneDetailsList item={myDevice}/>
        }
      </View>
      <Divider />
      <View style={{padding: 10, marginBottom: 100}}>
      <Text style={{fontSize: SIZES.medium, color: COLORS.slate500, fontWeight: 500}}>Description</Text>
      <View style={{paddingVertical: 6}}>
      <Text style={{fontSize: 14, color: COLORS.slate300, fontWeight: 400, lineHeight: 20}}>
      {myDevice?.deviceDescription}
      </Text>
      </View>
      </View>

    </ScrollView>

      <View style={{position: "absolute", bottom: 0, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: COLORS.blue500, flex: 1, padding: 10}}>
        <View style={{flexDirection: "column", alignItems: "flex-start", paddingHorizontal: SIZES.xSmall}}>
        <Text style={{color: COLORS.blue200, fontSize: SIZES.xSmall}}>Price</Text>
        <Text style={{color: COLORS.white500, fontSize: SIZES.medium, fontWeight: 700}}>৳{formattedPrice} Taka</Text>
        </View>
        <View style={{flexDirection: "row", gap: 10, marginRight: 10}}>
        <TouchableOpacity onPress={() => clickToPhoneCall("01850563626")} style={styles.bottonActionBtn}>
        <Ionicons name="call" size={SIZES.large} color={COLORS.blue500} />
          <Text style={styles.bottonActionBtnText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => message(deviceId)} style={styles.bottonActionBtn}>
          <AntDesign name="wechat" size={SIZES.large} color={COLORS.blue500} />
          <Text style={styles.bottonActionBtnText}>Chat</Text>
        </TouchableOpacity>
        </View>
      </View>
      </View>
  )
}

const PhoneDetailsList = ({item}) => (
    <View style={{flexDirection: "column", gap: 10}}>
      <View style={styles.listItem}>
      <Text style={styles.listItemTextTitle}>Model Name :</Text>
      <Text style={styles.listItemText}>{item?.deviceModelName}</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemTextTitle}>Brand :</Text>
      <Text style={styles.listItemText}>{item?.deviceBrand}</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemTextTitle}>Ram :</Text>
      <Text style={styles.listItemText}>{item?.ram} GB</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemTextTitle}>Rom :</Text>
      <Text style={styles.listItemText}>{item?.storage} GB</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemTextTitle}>Color Varient :</Text>
      <Text style={styles.listItemText}>{item?.colorVarient}</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemTextTitle}>Have Original Box :</Text>
      <Text style={styles.listItemText}>{item?.haveOriginalBox ? "Yes" : "No"}</Text>
      </View>
      <View style={styles.listItem}>
      <Text style={styles.listItemTextTitle}>Battery :</Text>
      <Text style={styles.listItemText}>{item?.battery}</Text>
      </View>
    </View>
  )

const ImageSilderShow = ({myDevice, width}) => (
  <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={myDevice?.deviceIamges}
      keyExtractor={(item, index) => `${index}`}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={{ width: width, height: 230, resizeMode: "contain"}} />
      )}
      pagingEnabled
      bounces={false}
    /> 
)
  
  const styles = StyleSheet.create({
    listItem: {
      flexDirection: "row", 
      alignItems: "center", 
      justifyContent: 'space-between'
    },
    listItemText: {
      color: COLORS.slate500, 
      fontWeight: 500
    },
    listItemTextTitle: {
      color: COLORS.slate300
    },
    bottonActionBtn: {
      alignItems: "center", 
      justifyContent: "center", 
      flexDirection: "row", 
      paddingHorizontal: SIZES.large, 
      paddingVertical: SIZES.xSmall, 
      backgroundColor: COLORS.white500, 
      borderRadius: 10, 
      gap: 5
    },
    bottonActionBtnText: {
      color: COLORS.blue500, 
      fontSize: SIZES.medium
    }
  })

export default SellingDeviceDetails