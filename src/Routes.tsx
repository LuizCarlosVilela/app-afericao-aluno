import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';

//Components
import DrawerContent from '@components/DrawerContent';
import ReadQRCode from '@components/ReadQRCode';

//States
import { useAuth } from '@states/auth';

//Pages
import Welcome from '@pages/Welcome';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';
import Home from '@pages/Home';
import QRCodeValidation from '@pages/QRCodeValidation';
import WalletQRCode from '@pages/WalletQRCode';
import Vehicle from '@pages/Vehicle';
import Checkin from '@pages/Checkin';
import AllCheckin from '@pages/AllCheckin';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Routes() {
  const { auth, checkLoggedUser } = useAuth();

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    checkLoggedUser();
  }, []);

  useEffect(() => {
    if (!auth.loading) {
      SplashScreen.hideAsync();
    }
  }, [auth]);

  if (auth.loading) return null;

  return (
    <NavigationContainer>
      {auth.signed ? <App /> : <Public />}
    </NavigationContainer>
  );
}

function Public() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Checkin" component={Checkin} />
      <Drawer.Screen name="AllCheckin" component={AllCheckin} />
      <Drawer.Screen name="Vehicle" component={Vehicle} />
      <Drawer.Screen name="QRCodePage" component={QRCodeValidation} />
      <Drawer.Screen name="ReadQRCode" component={ReadQRCode} />
      <Drawer.Screen name="WalletQRCode" component={WalletQRCode} />
    </Drawer.Navigator>
  );
}
