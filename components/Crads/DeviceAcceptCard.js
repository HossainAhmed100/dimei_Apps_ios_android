import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native'
import { COLORS, SIZES } from '../../constants';
import { Divider } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DeviceAcceptCard = ({item, acceotDevice, viewProfile, viewDeviceDetails}) => {
  return (
    <View style={[styles.cardContainer, {borderColor: item?.newOwnerClaim ? COLORS.red200 : COLORS.slate200}]}>
     <View style={{alignItems: "center", justifyContent: "center", width: "100%"}}>
     {item?.devicePicture && 
     <Image source={{ uri: item?.devicePicture }} width={120} height={140} resizeMode="cover" style={{ borderRadius: 4, }} />}
     </View>
      <View>
      <PhoneDetailsList item={item} viewProfile={viewProfile}/>
      <TransferDeviceAction viewDeviceDetails={viewDeviceDetails} acceotDevice={acceotDevice} item={item}/>
      </View>
  </View>
  )
}




const PhoneDetailsList = ({item, viewProfile}) => (
    <View style={{flexDirection: "column", width: "100%"}}>
      <Divider />
      <View style={styles.listItem}>
      <Text>Owner Status:</Text>
      {item?.newOwnerClaim ? 
      <Text style={{backgroundColor: COLORS.red200, paddingVertical: 4, fontSize: 12, paddingHorizontal: 10, borderRadius: 4, color: COLORS.red500}}>Unauthorised Activity</Text> :
      <Text style={{backgroundColor: COLORS.green200, paddingVertical: 4, fontSize: 12, paddingHorizontal: 10, borderRadius: 4, color: COLORS.green500}}>Good</Text>
      }
      </View>
      <Divider />
      <View style={styles.listItem}>
      <Text>Owner :</Text>
      <TouchableOpacity onPress={() => viewProfile(item?.ownerEmail)} style={styles.profileButton}>
      {item?.ownerPicture && <Image source={{uri: item?.ownerPicture}} style={{borderRadius:4, width: 20, height: 20}}/>}
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
const TransferDeviceAction = ({item, acceotDevice, viewDeviceDetails}) => (
    <View style={{flexDirection: "row", width: "100%", alignItems: "center", padding: 10, gap: 10}}>
    <TouchableOpacity onPress={() => viewDeviceDetails(item?.deviceId, item?.ownerEmail)} style={[styles.deviceActionButton]}>
       <Text style={{color: COLORS.blue500, fontWeight: 600}}>View Device Details</Text>
       {/* <Feather name="arrow-right-circle" size={SIZES.large} color={COLORS.blue500} /> */}
    </TouchableOpacity>
     <TouchableOpacity onPress={() => acceotDevice(item?._id)} style={[styles.deviceActionButton, {backgroundColor: COLORS.blue500}]}>
        <Text style={{color: COLORS.white500, fontWeight: 600}}>Accept</Text>
        <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={SIZES.large} color={COLORS.white500} />
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
    },
    listItem: {flexDirection: "row", alignItems: "center", justifyContent: 'space-between', padding: 10}
})

export default DeviceAcceptCard