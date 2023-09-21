import React from 'react'
import Main from '../screens/Main';
import Home from '../screens/Home';
import { icons } from '../constants';
import Search from '../screens/Search';
import Setting from '../screens/Setting';
import Payment from '../screens/Payment';
import TabNavigator from './TabNavigator';
import BuyToken from '../screens/BuyToken';
import AllDevice from '../screens/AllDevice';
import KYCVerifye from '../screens/KYCVerifye';
import ProfileShare from '../screens/ProfileShare';
import ResetPassword from '../screens/ResetPassword';
import AccountUpdate from '../screens/AccountUpdate';
import ProfileDetails from '../screens/ProfileDetails';
import TransferDevice from '../screens/TransferDevice';
import PrDeviceDetails from '../screens/PrDeviceDetails';
import PurchaseHistory from '../screens/PurchaseHistory';
import AddressReference from '../screens/AddressReference';
import VerifyDeviceAcceft from '../screens/VerifyDeviceAcceft';
import TokenTransferInput from '../screens/TokenTransferInput';
import AddDeviceIntoSellingList from '../screens/AddDeviceIntoSellingList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellingDeviceAction from '../screens/SellingDeviceAction';
import SellingDeviceDetails from '../screens/SellingDeviceDetails';
import ViewOwnerDetails from '../screens/ViewOwnerDetails';
import UpdateSellingPost from '../screens/DeviceSellScreen/UpdateSellingPost';
import ViewUserProfile from '../screens/UserAccount/ViewUserProfile';
import KYCPreview from '../screens/KYC/KYCPreview';
import SupportChat from '../screens/Messeging/SupportChat';
import ScreenHeaderBtn from '../components/Button/ScreenHeaderBtn';
import ScreenHeaderRightBtn from '../components/Button/ScreenHeaderRightBtn';
import EmailVerify from '../screens/VerifyScreen/EmailVerify';
import PhoneVerify from '../screens/VerifyScreen/PhoneVerify';
import AddPhotoForNewDevice from '../screens/AddNewDevice/AddPhotoForNewDevice';
import AddNewDevice from '../screens/AddNewDevice/AddNewDevice';
import AddDeviceInput from '../screens/AddNewDevice/AddDeviceInput';

const HomeNav = createNativeStackNavigator();


const HomeNavigation = () => {
    return (
      <HomeNav.Navigator  screenOptions={{ animation: "slide_from_right" }}>

        <HomeNav.Screen name="Home" component={TabNavigator} options={{ headerShown: false }}/>
        <HomeNav.Screen name="Payment" component={Payment} />
        <HomeNav.Screen name="Setting" component={Setting}/>
        <HomeNav.Screen name="AccountUpdate" component={AccountUpdate} />
        <HomeNav.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <HomeNav.Screen name="Home2" component={Home} options={{ headerShown: false }}/>
        <HomeNav.Screen name="Search" component={Search} options={{ headerShown: false }}/>
        <HomeNav.Screen name="Device" component={AllDevice} options={{ headerShown: false }}/>

        <HomeNav.Screen name="AddPhotoForNewDevice" component={AddPhotoForNewDevice}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Device Photo Upload',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />
        <HomeNav.Screen name="ViewOwnerDetails" component={ViewOwnerDetails}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Device Owner',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />
        <HomeNav.Screen name="KYCPreview" component={KYCPreview}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'ReSubmit KYC',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="ViewUserProfile" component={ViewUserProfile}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Profile View',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="SellDevice" component={AddDeviceIntoSellingList}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Write Device info',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="UpdateSellingPost" component={UpdateSellingPost}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Update Selling Post',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="SellingDeviceDetails" component={SellingDeviceDetails}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Device info',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="SellDeviceAction" component={SellingDeviceAction}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Select Device Photo',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="TransferDevice" component={TransferDevice}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Transfer Device',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="AddDeviceInput" component={AddDeviceInput}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Write Device info',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerRight: () => (<ScreenHeaderRightBtn iconUrl={icons.supportChat} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="KYCVerifye" component={KYCVerifye}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Verify Your KYC',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="ResetPassword" component={ResetPassword}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Reset Your Password',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="ProfileDetails" component={ProfileDetails}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Profile Details',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="MyDeviceDetails" component={PrDeviceDetails}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Device Details',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="TokenTransferInput" component={TokenTransferInput}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Token Transfer',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="ProfileShare" component={ProfileShare}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Share Your Profile',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="VerifyDeviceAccept" component={VerifyDeviceAcceft}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Accpet Device',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="BuyToken" component={BuyToken}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Buy New Token',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="AddNewDevice" component={AddNewDevice}
            options={{ 
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Add New Device',
              headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
              headerRight: () => (<ScreenHeaderRightBtn iconUrl={icons.supportChat} dimension="60%" />),
              headerTitleAlign: 'center',
              headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
            }}
          />

        <HomeNav.Screen name="SupportChat" component={SupportChat}
            options={{ 
              headerBackVisible: false,
              headerBackTitleVisible: false,
              title: 'Help and Support',
              headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
              headerTitleAlign: 'center',
              headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
            }}
          />

        <HomeNav.Screen name="EmailVerify" component={EmailVerify}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Email Verify',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="PhoneVerify" component={PhoneVerify}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Phone Verify',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="AddReference" component={AddressReference}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Add Reference',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />
        
        <HomeNav.Screen name="TokenPurchaseHistory" component={PurchaseHistory} 
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Token History',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />
      </HomeNav.Navigator>
    )
  }

export default HomeNavigation