import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { Link } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const localip = process.env.EXPO_PUBLIC_LOCAL_IP;

const Animal = () => {
    const [dataAnimal, setDataAnimal] = useState([]);

    const fetchAnimal = () => {
        fetch(`http://${localip}:5001/fetchAnimal`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((dataAnimal) => {
                setDataAnimal(dataAnimal.data);
            })
            .catch((error) => {
                console.error("Error fetching animals data: ", error);
            });
    };

    useEffect(() => {
        fetchAnimal();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <Link href="../screen/addAnimal" style={styles.addIcon}>
                <Ionicons name="add" size={24} color="black" />
            </Link>
            {dataAnimal.map((animal, index) => (
                <View key={index} style={styles.animalContainer}>
                    <Text style={styles.animalName}>{animal.animal_name}</Text>
                    <Text style={styles.animalDetails}>{animal.animal_details}</Text>
                    <Text style={styles.animalQuantity}>Quantity: {animal.animal_quantity}</Text>
                    {animal.animal_image && (
                        <Image source={{ uri: animal.animal_image }} style={styles.animalImage} />
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIcon: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    animalContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: '90%',
        alignItems: 'center',
    },
    animalName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    animalDetails: {
        fontSize: 14,
        color: '#555',
    },
    animalQuantity: {
        fontSize: 14,
        color: '#555',
    },
    animalImage: {
        width: 200,
        height: 200,
        marginTop: 10,
    },
});

export default Animal;