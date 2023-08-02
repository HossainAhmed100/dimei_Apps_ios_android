import { View, Text, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { AuthContext } from '../context/AuthProvider';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';

const MainNavigation = () => {
  const { user, userLoding } = useContext(AuthContext);

  if(userLoding){
    return(
      <View style={{flex: 1, justifyContent: "center", alighItems: "center"}}>
         <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ animation: "slide_from_right" }}>
    {user ? <Stack.Screen name="Inside" component={HomeNavigation} options={{headerShown: false}}/> : 
    <Stack.Screen name="Auth" component={AuthNavigation} options={{ headerShown: false }} />
    }
    </Stack.Navigator>
  )
}

export default MainNavigation