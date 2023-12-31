import React from 'react'
import Main from '../screens/Main';
import Home from '../screens/Home';
import { icons } from '../constants';
import Setting from '../screens/Setting';
import TabNavigator from './TabNavigator';
import BuyToken from '../screens/TokenUtil/BuyToken';
import AllDevice from '../screens/AllDevice';
import ProfileShare from '../screens/UserAccount/ProfileShare';
import ResetPassword from '../screens/Authentaction/ResetPassword';
import PrDeviceDetails from '../screens/PrDeviceDetails';
import AddressReference from '../screens/AddressReference';
import VerifyDeviceAcceft from '../screens/VerifyScreen/VerifyDeviceAcceft';
import TokenTransferInput from '../screens/TokenUtil/TokenTransferInput';
import AddDeviceIntoSellingList from '../screens/SellNewDevice/AddDeviceIntoSellingList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellingDeviceAction from '../screens/SellNewDevice/SellingDeviceAction';
import SellingDeviceDetails from '../screens/SellNewDevice/SellingDeviceDetails';
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
import DeviceSellingChat from '../screens/Messeging/DeviceSellingChat';
import DaynamicChatHeader from '../components/Crads/DaynamicChatHeader';
import MyProfile from '../screens/UserAccount/MyProfile';
import TokenPurchaseHistory from '../screens/TokenUtil/TokenPurchaseHistory';
import TransferDevice from '../screens/TransferDevice';
import DeviceLostScreen from '../screens/DeviceLostScreen';
import NewDevcieAddTermsandCondition from '../screens/PrivicyPolicy/NewDevcieAddTermsandCondition';
import ViewDeviceDetails from '../screens/ViewDeviceDetails';
import Claimownershipagain from '../screens/ClaimOwnerShipAgain/Claimownershipagain';
import ViewDeviceOwnerInfo from '../screens/ViewDeviceOwnerInfo';
import DeviceActivity from '../screens/DeviceActivity/DeviceActivity';

const HomeNav = createNativeStackNavigator();


const HomeNavigation = () => {
    return (
      <HomeNav.Navigator  screenOptions={{ animation: "slide_from_right" }}>

        <HomeNav.Screen name="Home" component={TabNavigator} options={{ headerShown: false }}/>
        <HomeNav.Screen name="Setting" component={Setting}/>
        <HomeNav.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <HomeNav.Screen name="Home2" component={Home} options={{ headerShown: false }}/>
        <HomeNav.Screen name="Device" component={AllDevice} options={{ headerShown: false }}/>

        <HomeNav.Screen name="ViewDeviceOwnerInfo" component={ViewDeviceOwnerInfo}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Device Owner Info',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="Claimownershipagain" component={Claimownershipagain}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Claim Ownership',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="NewDevcieAddTermsandCondition" component={NewDevcieAddTermsandCondition}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Terms & Condition',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />
        <HomeNav.Screen name="DeviceLostScreen" component={DeviceLostScreen}
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Lost Device',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="DeviceSellingChat" component={DeviceSellingChat}
          options={({ route }) => ({ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitle: () => (<DaynamicChatHeader route={route} iconUrl={icons.supportChat} dimension="60%" />),
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          })}
        />

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

        <HomeNav.Screen name="MyProfile" component={MyProfile}
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

        <HomeNav.Screen name="ViewDeviceDetails" component={ViewDeviceDetails}
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
        
        <HomeNav.Screen name="TokenPurchaseHistory" component={TokenPurchaseHistory} 
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'Token History',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />

        <HomeNav.Screen name="DeviceActivity" component={DeviceActivity} 
          options={{ 
            headerBackVisible: false,
            headerBackTitleVisible: false,
            title: 'All Devcie Activity',
            headerLeft: () => ( <ScreenHeaderBtn iconUrl={icons.arrowLeft} dimension="60%" />),
            headerTitleAlign: 'center',
            headerStyle: {headerStyle: { shadowColor: 'transparent', elevation: 0,}}
          }}
        />
      </HomeNav.Navigator>
    )
  }

export default HomeNavigation