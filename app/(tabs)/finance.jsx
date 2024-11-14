import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons"
import { Link } from 'expo-router'

const localip = process.env.EXPO_PUBLIC_LOCAL_IP

const Revenue = () => {
  const [dataRevenue, setDataRevenue] = useState([])

  const fetchRevenue = () => {
    fetch(`http://${localip}:5001/fetchRevenue`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        setDataRevenue(data.data)
      })
      .catch((error) => {
        console.log("Error fetching revenue data: ", error)
      })
  }

  useEffect(() => {
    fetchRevenue()
  }, [])

  return (
    <View style={styles.screen}>
      <Link href="../screen/addRevenue">
        <Ionicons name="add" size={24} color="black" />
      </Link>
      {dataRevenue.length > 0 ? (
        dataRevenue.map((data, index) => (
          <View key={index} style={styles.card}>
            <Text>Date: {new Date(data.re_date).toLocaleString()}</Text>
            <Text>Type: {data.re_type}</Text>
            <Text>Revenue: ${data.re_price}</Text>
          </View>
        ))
      ) : (
        <Text>No revenue entries available.</Text>
      )}
    </View>
  )
}

const Expense = () => (
  <View style={styles.screen}>
    <Text style={styles.content}>Expense Data: $4,000</Text>
  </View>
)

const Statistical = () => (
  <View style={styles.screen}>
    <Text style={styles.content}>Profit: $6,000</Text>
  </View>
)

const Tab = createBottomTabNavigator()

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
      >
        <Tab.Screen name="Revenue" component={Revenue} />
        <Tab.Screen name="Expense" component={Expense} />
        <Tab.Screen name="Statistical" component={Statistical} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Finance

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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
})
