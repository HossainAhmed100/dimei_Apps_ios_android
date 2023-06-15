import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home2 from "../screens/Home";
import Setting from "../screens/Setting";
import { icons, COLORS, SIZES } from '../constants';
import { Image } from "react-native";
import Shop2 from "../screens/Shop";
import AllDevice2 from "../screens/AllDevice";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.blue500,
        tabBarInactiveTintColor: COLORS.slate300,
        tabBarStyle: {
          backgroundColor: "white",
          height: 60,
          borderTopLeftRadius: SIZES.xLarge,
          borderTopRightRadius: SIZES.xLarge,
          position: "absolute",
          overflow: "hidden",
        },
      }}
    >
      <Tab.Screen
        name="Home2"
        component={Home2}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={icons.home} style={{width: size, height: size, tintColor: color}}/>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="All Devices"
        component={Shop2}
        options={{
          tabBarIcon: ({ color, size  }) => (
            <Image source={icons.shop} style={{width: size, height: size, tintColor: color}}/>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="My Device"
        component={AllDevice2}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={icons.search} style={{width: size, height: size, tintColor: color}}/>
          )
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={icons.Profile} style={{width: size, height: size, tintColor: color}}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
};


export default TabNavigator;