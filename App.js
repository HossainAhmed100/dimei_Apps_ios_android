import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Main from "./screens/Main";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Search from "./screens/Search";
import Setting from "./screens/Setting";
import PurchaseHistory from "./screens/PurchaseHistory";
import AccountUpdate from "./screens/AccountUpdate";
import Payment from "./screens/Payment";
import TabNavigator from "./navigation/TabNavigator";
import Home from "./screens/Home";
import Shop from "./screens/Shop";
import AllDevice from "./screens/AllDevice";
import BuyToken from "./screens/BuyToken";
import AddNewDevice from "./screens/AddNewDevice";
import AddressReference from "./screens/AddressReference";
const Stack = createNativeStackNavigator();
import { icons } from "./constants";
import ScreenHeaderBtn from "./components/Button/ScreenHeaderBtn";
import ProfileShare from "./screens/ProfileShare";
import PrDeviceDetails from "./screens/PrDeviceDetails";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { ActivityIndicator, View } from "react-native";
import ProfileDetails from "./screens/ProfileDetails";
import ResetPassword from "./screens/ResetPassword";
import axios from "axios";
import KYCVerifye from "./screens/KYCVerifye";
import AddDeviceInput from "./screens/AddDeviceInput";
import TokenTransferInput from "./screens/TokenTransferInput";
import TransferDevice from "./screens/TransferDevice";

const InsideStack = createNativeStackNavigator();

function InsideLayout(){
  return(
    <InsideStack.Navigator  screenOptions={{ animation: "slide_from_right" }}>
      <InsideStack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
      <InsideStack.Screen
            name="TransferDevice"
            component={TransferDevice}
            options={{ 
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Transfer Device',
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                headerStyle: {
                  shadowColor: 'transparent', // this covers iOS
                  elevation: 0, // this covers Android
                }
              }
              
            }}
          />
      <InsideStack.Screen
            name="AddDeviceInput"
            component={AddDeviceInput}
            options={{ 
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Write Device info',
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                headerStyle: {
                  shadowColor: 'transparent', // this covers iOS
                  elevation: 0, // this covers Android
                }
              }
              
            }}
          />
      <InsideStack.Screen
            name="KYCVerifye"
            component={KYCVerifye}
            options={{ 
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'KYC Verification',
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                headerStyle: {
                  shadowColor: 'transparent', // this covers iOS
                  elevation: 0, // this covers Android
                }
              }
              
            }}
          />
      <InsideStack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{ 
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Reset Password',
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                headerStyle: {
                  shadowColor: 'transparent', // this covers iOS
                  elevation: 0, // this covers Android
                }
              }
              
            }}
          />
      <InsideStack.Screen
            name="ProfileDetails"
            component={ProfileDetails}
            options={{ 
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Profile Details',
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                headerStyle: {
                  shadowColor: 'transparent', // this covers iOS
                  elevation: 0, // this covers Android
                }
              }
              
            }}
          />
      <InsideStack.Screen
            name="Home2"
            component={Home}
            options={{ headerShown: false }}
          />
       <InsideStack.Screen
            name="MyDeviceDetails"
            component={PrDeviceDetails}
            options={{ 
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Device Details',
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                headerStyle: {
                  shadowColor: 'transparent', // this covers iOS
                  elevation: 0, // this covers Android
                }
              }
              
            }}
          />
        <InsideStack.Screen
            name="TokenTransferInput"
            component={TokenTransferInput}
            options={{ 
             
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Token Transfer',
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                headerStyle: {
                  shadowColor: 'transparent', // this covers iOS
                  elevation: 0, // this covers Android
                }
              }
              
            }}
          />
        <InsideStack.Screen
            name="ProfileShare"
            component={ProfileShare}
            options={{ 
             
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Profile QR Code',
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                headerStyle: {
                  shadowColor: 'transparent', // this covers iOS
                  elevation: 0, // this covers Android
                }
              }
              
            }}
          />
        
        <InsideStack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
        <InsideStack.Screen
            name="Device"
            component={AllDevice}
            options={{ headerShown: false }}
          />
        <InsideStack.Screen
            name="BuyToken"
            component={BuyToken}
            options={{ 
             
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Buy New Token',
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                headerStyle: {
                  shadowColor: 'transparent', // this covers iOS
                  elevation: 0, // this covers Android
                }
              }
              
            }}
          />
        <InsideStack.Screen
            name="AddNewDevice"
            component={AddNewDevice}
            options={{ 
             
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Add New Device',
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
              ),
              headerRight: () => (
                <ScreenHeaderBtn iconUrl={icons.alert} dimension="60%" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                headerStyle: {
                  shadowColor: 'transparent', // this covers iOS
                  elevation: 0, // this covers Android
                }
              }
              
            }}
          />
        <InsideStack.Screen
            name="AddReference"
            component={AddressReference}
            options={{ 
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Add Reference',
              headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                headerStyle: {
                  shadowColor: 'transparent', // this covers iOS
                  elevation: 0, // this covers Android
                }
              }
              
            }}
          />
          <InsideStack.Screen name="Payment" component={Payment} />
          <InsideStack.Screen name="AccountUpdate" component={AccountUpdate} />
          <InsideStack.Screen name="TokenPurchaseHistory" component={PurchaseHistory} 
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Token History',
            headerLeft: () => (
              <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />
            ),
            headerTitleAlign: 'center',
            headerStyle: {
              headerStyle: {
                shadowColor: 'transparent', // this covers iOS
                elevation: 0, // this covers Android
              }
            }
            
          }}
          />
          <InsideStack.Screen name="Setting" component={Setting} />
          <InsideStack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />
    </InsideStack.Navigator>
  )
}

const AuthRoute = createNativeStackNavigator();

function AuthLayout(){
  return(
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

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("Auth state changed");
      if(user?.uid){
        const email = user.email; 
        setUser(user)
        axios.get(`http://192.168.1.4:5000/signleUser/${email}`)  
      }
      setIsLoading(false)
    })
  }, [])
  if(isLoading){
    return(
      <View style={{flex: 1, justifyContent: "center", alighItems: "center"}}>
         <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>
        <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ animation: "slide_from_right" }}>
        {user ? <Stack.Screen name="Inside" component={InsideLayout} options={{headerShown: false}}/> : 
        <Stack.Screen name="Auth" component={AuthLayout} options={{ headerShown: false }} />
       }
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
