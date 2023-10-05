import React, { useContext, useState } from "react";
import { View, Text, ScrollView, Image, Switch, StyleSheet } from "react-native";
import { COLORS, SIZES, icons } from '../constants';
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthProvider";
import { Divider } from "@rneui/themed";

const Setting = ({navigation}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const sinOut = () => {
    logOut()
    .then(() => {
      alert("Log out Successfull");
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ paddingVertical: 8, paddingHorizontal: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileDetails')} style={{backgroundColor: "white",borderRadius: 10,padding: 10,marginBottom: 10,}}>
          <View style={{flexDirection: "row",alignItems: "center",gap: 10,justifyContent: "center",}}>
            {user?.userProfilePic ? <Image source={{uri: user?.userProfilePic}} style={{resizeMode: "cover",width: 50,height: 50,borderRadius: 50,}}/> : <Image
            source={require("../assets/images/profile.jpg")} style={{resizeMode: "cover",width: 50,height: 50,borderRadius: 50,}}/>}
            <View style={{flex: 1,flexDirection: "column",alignItems: "flex-start",gap: 1,}}>
              <Text style={{ fontWeight: 500, fontSize: 16 }} numberOfLines={2}>{user?.userName}</Text>
              <Text style={{ fontSize: 12, color: "#6B7280" }}>{user?.userPhone}</Text>
            </View>
            <Image source={require("../assets/icons/edit.png")} style={{ tintColor: "#B0B0B0", width: 24, height: 24 }}/>
          </View>
        </TouchableOpacity>
        <View style={styles.navigationBoxContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Device')} style={styles.navigationItem}>
              <View style={styles.navigationItemTextandIcon}>
                <Image source={icons.chip} style={styles.navigationItemIcon}/>
                <Text style={styles.navigationItemText}>All Devices</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => navigation.navigate('AddReference')} style={styles.navigationItem}>
              <View style={styles.navigationItemTextandIcon}>
                <Image source={icons.Profile} style={styles.navigationItemIcon}/>
                <Text style={styles.navigationItemText}>Reference</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')} style={styles.navigationItem}>
              <View style={styles.navigationItemTextandIcon}>
                <Image source={icons.reset} style={styles.navigationItemIcon}/>
                <Text style={styles.navigationItemText}>Reset Password</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={() => navigation.navigate('TokenPurchaseHistory')} style={styles.navigationItem}>
              <View style={styles.navigationItemTextandIcon}>
                <Image source={icons.cart} style={styles.navigationItemIcon}/>
                <Text style={styles.navigationItemText}>Token Purchase History</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        </View>
        <View style={styles.navigationBoxContainer}>
          <TouchableOpacity style={styles.navigationItem}>
              <View style={styles.navigationItemTextandIcon}>
                <Image source={icons.share} style={styles.navigationItemIcon}/>
                <Text style={styles.navigationItemText}>Share this app</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={styles.navigationItem}>
              <View style={styles.navigationItemTextandIcon}>
                <Image source={icons.usersGroup} style={styles.navigationItemIcon}/>
                <Text style={styles.navigationItemText}>Community</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity onPress={toggleTheme} style={styles.navigationItem}>
              <View style={styles.navigationItemTextandIcon}>
                <Image source={icons.moon} style={styles.navigationItemIcon}/>
                <Text style={styles.navigationItemText}>Dark Mode</Text>
              </View>
              <Switch
                style={{ height: 30 }}
                trackColor={{ true: "#20E86C" }}
                thumbColor={isDarkMode ? "#0F6831" : "#fff"}
                onValueChange={toggleTheme}
                value={isDarkMode}
              />
          </TouchableOpacity>
        </View>
        <View style={styles.navigationBoxContainer}>
          <TouchableOpacity style={styles.navigationItem}>
              <View style={styles.navigationItemTextandIcon}>
                <Image source={icons.reportFlag} style={styles.navigationItemIcon}/>
                <Text style={styles.navigationItemText}>Help and Support</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={styles.navigationItem}>
              <View style={styles.navigationItemTextandIcon}>
                <Image source={icons.chart} style={styles.navigationItemIcon}/>
                <Text style={styles.navigationItemText}>Report Problem</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={styles.navigationItem}>
              <View style={styles.navigationItemTextandIcon}>
                <Image source={icons.document} style={styles.navigationItemIcon}/>
                <Text style={styles.navigationItemText}>Terms & Conditions</Text>
              </View>
              <Feather name="chevron-right" size={24} color="#B0B0B0" />
          </TouchableOpacity>
        </View>
      <View style={{backgroundColor: "white",borderRadius: 10,marginBottom: 80,padding: 10,}}>
        <TouchableOpacity onPress={() => sinOut()} style={{paddingVertical: 13,paddingHorizontal: 15,backgroundColor: COLORS.red200,borderRadius: SIZES.small}}>
          <View style={{flexDirection: "row",alignItems: "center",gap: 10,justifyContent: "center",}}>
          <Text style={{ fontSize: SIZES.medium, color:COLORS.red500, fontWeight: 600 }}>Log out</Text>
          <Feather name="log-in" size={SIZES.large} color={COLORS.red500} />
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 14, color: "#5C5C5C", textAlign: "center", marginVertical: SIZES.xSmall }}>Version 0.0.1</Text>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  navigationItem: {
    gap: 10,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  navigationItemTextandIcon: {
    gap: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  navigationBoxContainer:{
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: SIZES.small
  },
  navigationItemText:{fontSize: 14, color: "#5C5C5C"},
  navigationItemIcon:{tintColor: "#5C5C5C", width: 20, height: 20},
})

export default Setting;
