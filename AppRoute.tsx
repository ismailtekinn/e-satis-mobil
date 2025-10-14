import React, { useContext, useEffect, useRef, useState } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Help from "./screens/Help";
import ScrollableListScreen from "./screens/ScrolView";
import LoginScreen from "./screens/Login";
import MainPage from "./screens/MainPage";
import PurchaseForm from "./screens/PurchaseForm";
import NewSale from "./screens/NewSale";
import ReturnProduct from "./screens/ReturnProduct";
import ProductList from "./screens/ProductListScreen";
import AddNew from "./screens/AddNew";
import SelectProduct from "./screens/SelectProduct";
import AddCustomer from "./screens/AddCustomer";
import CustomerSelect from "./screens/CustomerSelect";
import Rapor from "./screens/Rapor";
import SaleProductList from "./screens/SaleProductList";
import AddSupplier from "./screens/AddSupplier";
import SalesEdit from "./screens/SalesEdit";
import AdminPage from "./screens/AdminPage";
import HomeScreen from "./screens/HomeScreen";
import ProductListScreen from "./screens/ProductListScreen";
import BasketCardScreen from "./screens/BasketCardScreen";
import StaffScreen from "./screens/StaffScreen";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import SalesScreen from "./screens/SalesScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CustomerSearchScreen from "./screens/CustomerSearchScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { useKullanici } from "./contex/kullaniciContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAutoLogin } from "./contex/settings/autoLoginContext";
import { login } from "./api/auth";
import { AutoLoginOption } from "./types/enums/settings";
import TriaSplashScreen from "./screens/TriaSplashScreen";

const Stack = createStackNavigator();

const AppRoute: React.FC = () => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const { userData, setUserData } = useKullanici()!;
  const { autoLogin } = useAutoLogin();
  const { handleLogin } = useKullanici();
  const [isReady, setIsReady] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const tryAutoLogin = async () => {
      setIsCheckingAuth(true);

      if (autoLogin === AutoLoginOption.Evet) {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedPassword = await AsyncStorage.getItem("password");

        if (storedUsername && storedPassword) {
          try {
            const response = await login({
              KullaniciKodu: storedUsername,
              Sifre: storedPassword,
            });
            await handleLogin(response);
          } catch (err) {
            console.error("Otomatik login hatası:", err);
            setUserData(undefined);
          }
        } else {
          setUserData(undefined);
        }
      } else {
        setUserData(undefined);
      }

      setIsCheckingAuth(false);
      setIsReady(true);
    };

    tryAutoLogin();
  }, [autoLogin]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // 2 saniye

    return () => clearTimeout(timer);
  }, []);
  if (!isReady || isCheckingAuth || showSplash) {
    return <TriaSplashScreen />;
  }

  console.log(
    "app route içinde autologin state i console yazdırılıyor: ",
    autoLogin
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
        <Stack.Navigator screenOptions={{ animationEnabled: false }}>
          {userData ? (
            <>
              <Stack.Screen
                name="MainPage"
                component={MainPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SalesScreen"
                component={SalesScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="StaffScreen"
                component={StaffScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ProductListScreen"
                component={ProductListScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TriaSplashScreen"
                component={TriaSplashScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="BasketCardScreen"
                component={BasketCardScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="PurchaseForm" component={PurchaseForm} />
              <Stack.Screen name="NewSale" component={NewSale} />
              <Stack.Screen name="SalesEdit" component={SalesEdit} />
              <Stack.Screen name="ReturnProduct" component={ReturnProduct} />
              <Stack.Screen name="SelectProduct" component={SelectProduct} />
              <Stack.Screen name="Help" component={Help} />
              <Stack.Screen name="AddNew" component={AddNew} />
              <Stack.Screen name="AddCustomer" component={AddCustomer} />
              <Stack.Screen name="AddSuplier" component={AddSupplier} />
              <Stack.Screen name="Rapor" component={Rapor} />
              <Stack.Screen
                name="SaleProductList"
                component={SaleProductList}
              />
              <Stack.Screen
                name="ScrollableListScreen"
                component={ScrollableListScreen}
              />
              <Stack.Screen
                name="CustomerSearchScreen"
                component={CustomerSearchScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

export default AppRoute;
