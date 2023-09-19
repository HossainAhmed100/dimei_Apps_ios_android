import React, { useContext } from "react";
import { View, Text, ImageBackground, TouchableOpacity, Image, FlatList } from "react-native";
import { COLORS, SIZES, images } from "../../constants";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider } from "@rneui/base";
const ViewUserProfile = ({navigation, route}) => {
    const userEmail = route.params.userEmail;
    const { isLoading, isError, data: user = [], error } = useQuery({ 
        queryKey: [userEmail],
        queryFn: async () => {
          const res =  await axios.get(`http://192.168.1.4:5000/signleUser/${userEmail}`);
          return res.data;
        } 
      })
  
return(
    <View style={{backgroundColor: COLORS.slate100, minHeight: "100%", padding: 10, gap: 10}}>
    <View style={styles.profileCard}>
    <View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 15}}>
    {user?.userProfilePic && <Image source={{uri: user?.userProfilePic}} style={{width: 100, height:130, borderRadius: 10,  resizeMode: "cover"}}/>}
    <View style={{flex: 1, gap: 10}}>
    <View style={{gap: 2}}>
    <Text style={{fontSize: 20, fontWeight: 600, color: "#3B3C35"}}>{user?.userName}</Text>
    <Text style={{fontSize: 16, color: "#808080", fontWeight: "400", fontSize: 14}}>ID: {user?.userAccountId}</Text>
    </View>
    <View style={{flex: 1, backgroundColor: COLORS.slate100, borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 15}}>
    <View style={styles.verifyList}>
    <Text style={styles.verifyListText}>KYC</Text>
    {user?.verifyedStatus?.kycverifyed ? <MaterialCommunityIcons name="check-decagram" size={20} color={COLORS.green500} /> : 
    <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.red500} />}
    </View>
    <View style={styles.verifyList}>
    <Text style={styles.verifyListText}>Email</Text>
    {user?.verifyedStatus?.emailverifyed ? <MaterialCommunityIcons name="check-decagram" size={20} color={COLORS.green500} /> : 
    <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.red500} />}
    </View>
    <View style={styles.verifyList}>
    <Text style={styles.verifyListText}>Phone</Text>
    {user?.verifyedStatus?.phoneverifyed ? <MaterialCommunityIcons name="check-decagram" size={20} color={COLORS.green500} /> : 
    <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.red500} />}
    </View>
    </View>
    </View>
    </View>
    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10}}>
        <TouchableOpacity style={styles.buttonWithOutBackground}>
        <Text style={{color: COLORS.slate400, fontWeight: 500}}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWithBackground}>
            <Text style={{color: COLORS.white500, fontWeight: 500}}>Follow</Text>
        </TouchableOpacity>
    </View>
    </View>
    <View style={styles.userInfoCard}>
    <OwnerInfo user={user}/>
    </View>
    </View>
    )
    };
    

const OwnerInfo = ({user}) => (
    <View style={{ flexDirection: "column",  width: "100%"}}>
      <View style={styles.listItem}>
      <Text>User Name :</Text>
      <Text>{user.userName}</Text>
      </View>
      <Divider />
      <View style={styles.listItem}>
      <Text>User ID :</Text>
      <Text>{user.userAccountId}</Text>
      </View>
      <Divider />
      <View style={styles.listItem}>
      <Text>User Phone :</Text>
      <Text>{user.userPhone}</Text>
      </View>
      <Divider />
      <View style={styles.listItem}>
      <Text>User Email :</Text>
      <Text>{user.userEmail}</Text>
      </View>
      <Divider />
      <View style={styles.listItem}>
      <Text>User Address :</Text>
      <Text style={styles.listItemAddress}>{user.userAddress}</Text>
      </View>
    </View>
  )
  
  
  const styles = StyleSheet.create({
    listItem: {
        paddingVertical: 10,
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: 'space-between', 
    },
    listItemAddress: {
        width: 155
    },
    imageBackground:{
        resizeMode: 'cover', 
        justifyContent: "center", 
        paddingVertical: SIZES.medium, 
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20, 
        overflow: "hidden",
        padding: 15,
    },
    verifyList:{
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        justifyContent: "center",
    },
    verifyListText:{
        fontSize: 14, color: COLORS.slate300
    },
    profileCard:{
        backgroundColor: COLORS.white500,
        padding: 15,
        borderRadius: 10,
        gap: 15,
    },
    userInfoCard:{
        backgroundColor: COLORS.white500,
        padding: 15,
        borderRadius: 10,
        gap: 15,
    },
    buttonWithBackground:{
        borderColor: COLORS.blue500, 
        borderWidth: 1, 
        borderRadius: 4, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        alignItems: "center", 
        flex:1, 
        backgroundColor: COLORS.blue500
    },
    buttonWithOutBackground:{
        borderColor: COLORS.slate200, 
        borderWidth: 1, 
        borderRadius: 4, 
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        alignItems: "center", 
        flex:1
    }
  })

export default ViewUserProfile;