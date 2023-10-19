import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Authentaction/Login';
import Register from '../screens/Authentaction/Register';
import NIDPhotoUpload from '../screens/KYC/NIDPhotoUpload';
import NIDDetailsShow from '../screens/KYC/NIDDetailsShow';
import ScreenHeaderBtn from '../components/Button/ScreenHeaderBtn';
import { icons } from '../constants';
import AditionalEnfoSelection from '../screens/KYC/AditionalEnfoSelection';
import ProfilePhotoSelection from '../screens/KYC/ProfilePhotoSelection';


const AuthRoute = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <AuthRoute.Navigator screenOptions={{ animation: "slide_from_right" }}>
      <AuthRoute.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthRoute.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <AuthRoute.Screen
        name="NidPhotoUpload"
        component={NIDPhotoUpload}
        options={{ headerShown: false }}
      />
      <AuthRoute.Screen
        name="NIDDetailsShow"
        component={NIDDetailsShow}
        options={{ 
          headerBackVisible: false,
          headerBackTitleVisible: false,
          title: 'NID Scanned Details',
          headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
          headerTitleAlign: 'center',
          headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
        }}
      />
      <AuthRoute.Screen
        name="AditionalEnfoSelection"
        component={AditionalEnfoSelection}
        options={{ 
          headerBackVisible: false,
          headerBackTitleVisible: false,
          title: 'Aditional info',
          headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
          headerTitleAlign: 'center',
          headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
        }}
      />
      <AuthRoute.Screen
        name="ProfilePhotoSelection"
        component={ProfilePhotoSelection}
        options={{ 
          headerBackVisible: false,
          headerBackTitleVisible: false,
          title: 'Photo',
          headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
          headerTitleAlign: 'center',
          headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
        }}
      />
    </AuthRoute.Navigator>
  )
}

export default AuthNavigation