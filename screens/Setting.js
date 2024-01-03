import React, { useContext, useState } from "react";
import { View, Text, ScrollView, Image, Switch, StyleSheet } from "react-native";
import { COLORS, SIZES, icons, images } from '../constants';
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

  const navigateScreen = (uri) => {
    if(uri){
      navigation.navigate(uri)
    }else{
      console.log("No Uri")
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ paddingVertical: 8, paddingHorizontal: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate('MyProfile')} style={{backgroundColor: "white",borderRadius: 10,padding: 10,marginBottom: 10,}}>
          <View style={{flexDirection: "row",alignItems: "center",gap: 10,justifyContent: "center",}}>
            {user?.userProfilePic ? <Image source={{uri: user?.userProfilePic}} style={{resizeMode: "cover",width: 50,height: 50,borderRadius: 50,}}/> : <Image
            source={images.profile} style={{resizeMode: "cover",width: 50,height: 50,borderRadius: 50,}}/>}
            <View style={{flex: 1,flexDirection: "column",alignItems: "flex-start",gap: 1,}}>
              <Text style={{ fontWeight: 500, fontSize: 16 }} numberOfLines={2}>{user?.userName}</Text>
              <Text style={{ fontSize: 12, color: "#6B7280" }}>{user?.userPhone}</Text>
            </View>
            <Image source={icons.edit} style={{ tintColor: "#B0B0B0", width: 24, height: 24 }}/>
          </View>
        </TouchableOpacity>
        <View style={styles.navigationBoxContainer}>
          <SettingNavigateBtn 
          iconName={icons.deviceActivity} 
          btnText={"Device Activity"} 
          navigateUri={"DeviceActivity"} 
          navigateScreen={navigateScreen}
          />
          <Divider />
          <SettingNavigateBtn 
          iconName={icons.Profile} 
          btnText={"Reference"} 
          navigateUri={"AddReference"} 
          navigateScreen={navigateScreen}
          />
          <Divider />
          <SettingNavigateBtn 
          iconName={icons.reset} 
          btnText={"Reset Password"} 
          navigateUri={"ResetPassword"} 
          navigateScreen={navigateScreen}
          />
          <Divider />
          <SettingNavigateBtn 
          iconName={icons.cart} 
          btnText={"Token History"} 
          navigateUri={"TokenPurchaseHistory"} 
          navigateScreen={navigateScreen}
          />
          <Divider />
        </View>
        <View style={styles.navigationBoxContainer}>
          <SettingNavigateBtn 
            iconName={icons.share} 
            btnText={"Share this app"} 
            navigateUri={false} 
            navigateScreen={navigateScreen}
          />
          <Divider />
          <SettingNavigateBtn 
            iconName={icons.usersGroup} 
            btnText={"Community"} 
            navigateUri={false} 
            navigateScreen={navigateScreen}
          />
          <Divider />
          <TouchableOpacity onPress={toggleTheme} style={styles.navigationItem}>
            <View style={styles.navigationItemTextandIcon}>
              <Image source={isDarkMode ? icons.moon : icons.sun} style={styles.navigationItemIcon}/>
              <Text style={styles.navigationItemText}>{isDarkMode ? "Dark Mode" : "Light Mode"}</Text>
            </View>
            <Switch
              style={{ height: 30 }}
              trackColor={{ true: COLORS.blue200 }}
              thumbColor={isDarkMode ? COLORS.blue500 : "#fff"}
              onValueChange={toggleTheme}
              value={isDarkMode}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.navigationBoxContainer}>
          <SettingNavigateBtn 
            iconName={icons.reportFlag} 
            btnText={"Help and Support"} 
            navigateUri={false} 
            navigateScreen={navigateScreen}
          />
          <Divider />
          <SettingNavigateBtn 
            iconName={icons.chart} 
            btnText={"Report Problem"} 
            navigateUri={false} 
            navigateScreen={navigateScreen}
          />
          <Divider />
          <SettingNavigateBtn 
            iconName={icons.document} 
            btnText={"Terms & Conditions"} 
            navigateUri={false} 
            navigateScreen={navigateScreen}
          />
        </View>
      <View style={{backgroundColor: "white",borderRadius: 10,marginBottom: 80,padding: 10,}}>
        <TouchableOpacity onPress={() => sinOut()} style={styles.logOutBtn}>
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

const SettingNavigateBtn = ({iconName, btnText, navigateUri, navigateScreen}) => (
  <TouchableOpacity onPress={() => navigateScreen(navigateUri)} style={styles.navigationItem}>
    <View style={styles.navigationItemTextandIcon}>
      <Image source={iconName} style={styles.navigationItemIcon}/>
      <Text style={styles.navigationItemText}>{btnText}</Text>
    </View>
    <Feather name="chevron-right" size={24} color="#B0B0B0" />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  logOutBtn: {
    paddingVertical: 13,paddingHorizontal: 15,backgroundColor: COLORS.red200,borderRadius: SIZES.small
  },
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
