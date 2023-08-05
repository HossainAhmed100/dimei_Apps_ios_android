
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';
import Setting from '../screens/Setting';
import PurchaseHistory from '../screens/PurchaseHistory';
import AccountUpdate from '../screens/AccountUpdate';
import Payment from '../screens/Payment';
import AddressReference from '../screens/AddressReference';
import AddNewDevice from '../screens/AddNewDevice';
import BuyToken from '../screens/BuyToken';
import AllDevice from '../screens/AllDevice';
import Main from '../screens/Main';
import ProfileShare from '../screens/ProfileShare';
import TokenTransferInput from '../screens/TokenTransferInput';
import PrDeviceDetails from '../screens/PrDeviceDetails';
import ProfileDetails from '../screens/ProfileDetails';
import ResetPassword from '../screens/ResetPassword';
import KYCVerifye from '../screens/KYCVerifye';
import AddDeviceInput from '../screens/AddDeviceInput';
import TransferDevice from '../screens/TransferDevice';
import TabNavigator from './TabNavigator';
import Home from '../screens/Home';
import ScreenHeaderBtn from '../components/Button/ScreenHeaderBtn';
import { icons } from '../constants';
import VerifyDeviceAcceft from '../screens/VerifyDeviceAcceft';
import AddDeviceIntoSellingList from '../screens/AddDeviceIntoSellingList';

const HomeNav = createNativeStackNavigator();


const HomeNavigation = () => {
    return (
      <HomeNav.Navigator  screenOptions={{ animation: "slide_from_right" }}>
        <HomeNav.Screen
              name="Home"
              component={TabNavigator}
              options={{ headerShown: false }}
        />
        <HomeNav.Screen
              name="SellDevice"
              component={AddDeviceIntoSellingList}
              options={{ 
                headerBackVisible: false,
                headerBackTitleVisible: false,
                title: 'Sell This Device',
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
        <HomeNav.Screen
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
        <HomeNav.Screen
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
        <HomeNav.Screen
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
        <HomeNav.Screen
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
        <HomeNav.Screen
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
        <HomeNav.Screen
              name="Home2"
              component={Home}
              options={{ headerShown: false }}
            />
         <HomeNav.Screen
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
          <HomeNav.Screen
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
          <HomeNav.Screen
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
          
          <HomeNav.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
          <HomeNav.Screen
              name="Device"
              component={AllDevice}
              options={{ headerShown: false }}
            />
          <HomeNav.Screen
              name="VerifyDeviceAccept"
              component={VerifyDeviceAcceft}
              options={{ 
                headerBackVisible: false,
                headerBackTitleVisible: false,
                title: 'Accept Device',
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
          <HomeNav.Screen
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
          <HomeNav.Screen
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
          <HomeNav.Screen
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
            <HomeNav.Screen name="Payment" component={Payment} />
            <HomeNav.Screen name="AccountUpdate" component={AccountUpdate} />
            <HomeNav.Screen name="TokenPurchaseHistory" component={PurchaseHistory} 
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
            <HomeNav.Screen name="Setting" component={Setting} />
            <HomeNav.Screen
              name="Search"
              component={Search}
              options={{ headerShown: false }}
            />
      </HomeNav.Navigator>
    )
  }

export default HomeNavigation