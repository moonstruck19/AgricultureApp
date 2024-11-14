import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons"
import { Link } from 'expo-router'

const localip = process.env.EXPO_PUBLIC_LOCAL_IP

const Animal = () => {
    const [dataAnimal, setDataAnimal] = useState([])

    const fetchAnimal = () => {
        fetch(`http://${localip}:5001/fetchAnimal`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((dataAnimal) => {
                setDataAnimal(dataAnimal.data)
            })
            .catch((error) => {
                console.error("Error fetching animals data: ", error)
            })
    }

    useEffect(() => {
        fetchAnimal()
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <Link href="../screen/addAnimal" style={styles.addIcon}>
                <Ionicons name="add" size={24} color="black" />
            </Link>
            <Text style={styles.title}>Animal Entries</Text>
            {dataAnimal.length > 0 ? (
                dataAnimal.map((data, index) => (
                    <View key={index} style={styles.card}>
                        <Text>Name: {data.animal_name}</Text>
                        <Text>Details: {data.animal_details}</Text>
                        <Text>Quantity: {data.animal_quantity}</Text>
                        <Text>Date: {new Date(data.animal_date).toLocaleString()}</Text>
                    </View>
                ))
            ) : (
                <Text>No animal entries available.</Text>
            )}
        </ScrollView>
    )
}

const Crop = () => {
    const [dataCrop, setDataCrop] = useState([])

    const fetchCrop = () => {
        fetch(`http://${localip}:5001/fetchCrop`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((dataCrop) => {
                setDataCrop(dataCrop.data)
            })
            .catch((error) => {
                console.error("Error fetching crop data: ", error)
            })
    }

    useEffect(() => {
        fetchCrop()
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <Link href="../screen/addCrop" style={styles.addIcon}>
                <Ionicons name="add" size={24} color="black" />
            </Link>
            <Text style={styles.title}>Crop Entries</Text>
            {dataCrop.length > 0 ? (
                dataCrop.map((data, index) => (
                    <View key={index} style={styles.card}>
                        <Text>Name: {data.crop_name}</Text>
                        <Text>Details: {data.crop_details}</Text>
                        <Text>Date: {new Date(data.crop_date).toLocaleString()}</Text>
                    </View>
                ))
            ) : (
                <Text>No crop entries available.</Text>
            )}
        </ScrollView>
    )
}

const Tab = createBottomTabNavigator()

const MyFarm = () => {
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#00A86B',
                    tabBarInactiveTintColor: '#7D7D7D',
                    tabBarStyle: {
                        backgroundColor: '#F8F8F8',
                        borderTopWidth: 0,
                        elevation: 5,
                    },
                    headerStyle: {
                        backgroundColor: '#00A86B',
                    },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                }}
            >
                <Tab.Screen name="Animal" component={Animal} />
                <Tab.Screen name="Crop" component={Crop} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MyFarm

const styles = StyleSheet.create({
    screen: {
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: '#F0F4F8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    addIcon: {
        position: 'absolute',
        top: 10,
        right: 20,
        padding: 10,
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
