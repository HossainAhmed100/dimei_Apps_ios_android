import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';


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
    </AuthRoute.Navigator>
  )
}

export default AuthNavigation