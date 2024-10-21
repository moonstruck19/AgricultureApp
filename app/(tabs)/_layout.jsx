import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import TabHome from './index'
import Profile from './profile';
import Setting from './setting';
import Icon from "react-native-vector-icons/FontAwesome";
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
              <Icon name="home" size={30} color="#000" />
          }}
        />
        <Drawer.Screen name="Profile" component={Profile} 
          options={{
            drawerIcon: config =>
              <Icon name="user" size={38} color="#000" />
          }}
        />
        <Drawer.Screen name="Setting" component={Setting} 
          options={{
            drawerIcon: config =>
              <Icon name="gear" size={30} color="#000" />
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

