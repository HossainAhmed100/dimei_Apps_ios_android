import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AuthProvider from "./context/AuthProvider";
import MainNavigation from "./navigation/MainNavigation";


const queryClient = new QueryClient();



const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFC" }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <MainNavigation />
          </AuthProvider>
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
