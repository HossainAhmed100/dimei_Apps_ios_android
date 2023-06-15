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
import { COLORS, icons } from "./constants";
import ScreenHeaderBtn from "./components/Button/ScreenHeaderBtn";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
          
        <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
        <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
        <Stack.Screen
            name="Device"
            component={AllDevice}
            options={{ headerShown: false }}
          />
        <Stack.Screen
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
        <Stack.Screen
            name="AddNewDevice"
            component={AddNewDevice}
          />
        <Stack.Screen
            name="AddReference"
            component={AddressReference}
          />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Account Update" component={AccountUpdate} />
          <Stack.Screen name="Purchase History" component={PurchaseHistory} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home2"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
