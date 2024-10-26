import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import TabHome from './index'
import Profile from './profile';
import Setting from './setting';
import Weather from './weather';
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function RootLayout() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
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
        <Drawer.Screen name="Home" component={TabHome} 
          options={{
            drawerIcon: config =>
            <MaterialCommunityIcons name="home-outline" size={24} color="black" />
          }}
        />
        <Drawer.Screen name="Profile" component={Profile} 
          options={{
            drawerIcon: config =>
            <MaterialCommunityIcons name="account-outline" size={24} color="black" />
          }}
        />
        <Drawer.Screen name="Weather" component={Weather} 
          options={{
            drawerIcon: config =>
            <MaterialCommunityIcons name="weather-cloudy" size={24} color="black" />
          }}
        />  
        <Drawer.Screen name="Setting" component={Setting} 
          options={{
            drawerIcon: config =>
            <MaterialCommunityIcons name="decagram-outline" size={24} color="black" />
          }}
        />       
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

