import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// Define components for Revenue, Expense, and Statistical screens
const Revenue = () => (
  <View style={styles.screen}>
    {/* <Text style={styles.title}>Revenue</Text> */}
    <Text style={styles.content}>Revenue Data: $10,000</Text>
  </View>
);

const Expense = () => (
  <View style={styles.screen}>
    {/* <Text style={styles.title}>Expense</Text> */}
    <Text style={styles.content}>Expense Data: $4,000</Text>
  </View>
);

const Statistical = () => (
  <View style={styles.screen}>
    {/* <Text style={styles.title}>Statistical</Text> */}
    <Text style={styles.content}>Profit: $6,000</Text>
  </View>
);

// Initialize the bottom tab navigator
const Tab = createBottomTabNavigator();

const Finance = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#00A86B', // Green tint for active tab
          tabBarInactiveTintColor: '#7D7D7D', // Gray tint for inactive tab
          tabBarStyle: {
            backgroundColor: '#F8F8F8', // Light background color
            borderTopWidth: 0,
            elevation: 5,
          },
          headerStyle: {
            backgroundColor: '#00A86B', // Dark green header
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
        // tabBarOptions={{ showLabel: false }}
      >
        <Tab.Screen 
            name="Revenue" 
            component={Revenue} 
            options={{
                tabBarLabel: 'Revenue',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="attach-money" size={24} color="black" />
                ),
            }}
        />
        <Tab.Screen 
            name="Expense" 
            component={Expense} 
            options={{
                tabBarLabel: 'Expense',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="attach-money" size={24} color="black" />
                ),
            }}
        />
        <Tab.Screen 
            name="Statistical" 
            component={Statistical}
            options={{
                tabBarLabel: 'Statistical',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="attach-money" size={24} color="black" />
                ),
            }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Finance;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8', // Light background for each screen
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    color: '#555',
  },
});
