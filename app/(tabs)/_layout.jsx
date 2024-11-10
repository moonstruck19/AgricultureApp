import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import TabHome from './index';
import Employee from './employee';
import Setting from './setting';
import Weather from './weather';
import MyFarm from './myFarm';
import Signin from '../auth/signin';

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={handleLogout}
          icon={() => <MaterialCommunityIcons name="logout" size={24} color="black" />}
        />
      </DrawerContentScrollView>
    );
  }

  return (
    <NavigationContainer independent={true}>
      {isLoggedIn ? (
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerShown: true,
            statusBarColor: '#fff',
            headerStyle: {
              backgroundColor: '#fff',
            },
            drawerStyle: {
              width: 250,
              backgroundColor: '#fff',
            },
            headerTintColor: '#007AFF',
            headerTitleAlign: 'center',
          }}
        >
          <Drawer.Screen
            name="Home"
            component={TabHome}
            options={{
              drawerIcon: (config) => <MaterialCommunityIcons name="home-outline" size={24} color="black" />,
            }}
          />
          <Drawer.Screen
            name="Farm"
            component={MyFarm}
            options={{
              drawerIcon: (config) => <MaterialCommunityIcons name="tree-outline" size={24} color="black" />,
            }}
          />
          <Drawer.Screen
            name="Weather"
            component={Weather}
            options={{
              drawerIcon: (config) => <MaterialCommunityIcons name="weather-cloudy" size={24} color="black" />,
            }}
          />
          <Drawer.Screen
            name="Employee"
            component={Employee}
            options={{
              drawerIcon: (config) => <MaterialCommunityIcons name="account-outline" size={24} color="black" />,
            }}
          />
          <Drawer.Screen
            name="Setting"
            component={Setting}
            options={{
              drawerIcon: (config) => <MaterialCommunityIcons name="decagram-outline" size={24} color="black" />,
            }}
          />
        </Drawer.Navigator>
      ) : (
        <Signin />
      )}
    </NavigationContainer>
  );
}
