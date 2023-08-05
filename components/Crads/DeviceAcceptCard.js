import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { COLORS, SIZES } from '../../constants';
import { Divider } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DeviceAcceptCard = ({item, acceotDevice}) => {
  return (
    <View style={styles.cardContainer}>
     <View style={{alignItems: "center", justifyContent: "center", width: "100%"}}>
     {item?.devicePicture &&  <Image
      source={{ uri: item?.devicePicture }}
      width={120}
      height={140}
      resizeMode="cover"
      style={{
        borderRadius: 4,
      }}
    />}
     </View>
      <View>
      <PhoneDetailsList item={item}/>
      <TransferDeviceAction acceotDevice={acceotDevice} item={item}/>
      </View>
  </View>
  )
}




const PhoneDetailsList = ({item}) => (
    <View style={{flexDirection: "column", width: "100%"}}>
      <Divider />
      <View style={styles.listItem}>
      <Text>Owner :</Text>
      <TouchableOpacity style={styles.profileButton}>
      {item?.ownerPicture && <Image source={{uri: item?.ownerPicture}} style={{borderRadius:50, width: 20, height: 20}}/>}
      <Text>{item?.ownerName}</Text>
      </TouchableOpacity>
      </View>
      <Divider />
      <View style={styles.listItem}>
      <Text>Model Name :</Text>
      <Text>{item?.deviceModelName}</Text>
      </View>
      <Divider />
      <View style={styles.listItem}>
      <Text>Brand :</Text>
      <Text>{item?.brand}</Text>
      </View>
      <Divider />
      <View style={styles.listItem}>
      <Text>Color Varient :</Text>
      <Text>{item?.colorVarient}</Text>
      </View>
      <Divider />
      <View style={styles.listItem}>
      <Text>Ram & Storage:</Text>
     <Text>{item?.ram} - {item?.storage}</Text>
      </View>
      <Divider />
      <View style={styles.listItem}>
      <Text>Status :</Text>
      <Text>{item?.deviceStatus}</Text>
      </View>
      <Divider />
    </View>
  )
const TransferDeviceAction = ({item, acceotDevice}) => (
    <View style={{flexDirection: "row", width: "100%", alignItems: "center", padding: 10, gap: 10}}>
     <TouchableOpacity onPress={() => acceotDevice(item?._id)} style={[styles.deviceActionButton, {backgroundColor: COLORS.blue500}]}>
        <Text style={{color: COLORS.white500, fontWeight: 600}}>Accept</Text>
        <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={SIZES.large} color={COLORS.white500} />
     </TouchableOpacity>
     <TouchableOpacity style={[styles.deviceActionButton, {backgroundColor: COLORS.red200}]}>
        <Text style={{color: COLORS.red500, fontWeight: 600}}>Cencel</Text>
        <MaterialCommunityIcons name="window-close" size={SIZES.large} color={COLORS.red500} />
     </TouchableOpacity>
    </View>
  )

const styles = StyleSheet.create({
    deviceActionButton: {
    padding: SIZES.small, 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "center",
    gap: 5,
    borderRadius: 10,
    flex: 1
    },
    profileButton:{
        paddingHorizontal: 6,
        paddingVertical: 5,
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "center",
        borderRadius: 50,
        gap: 5
    },
    cardContainer:{
        borderWidth: 1, 
        borderRadius: SIZES.xSmall, 
        flexDirection: "column", 
        justifyContent: "center", 
        marginBottom: SIZES.xSmall,
        overflow: "hidden",
        borderColor: COLORS.slate200
    },
    listItem: {flexDirection: "row", alignItems: "center", justifyContent: 'space-between', padding: 10}
})

export default DeviceAcceptCard