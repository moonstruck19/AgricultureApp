import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, TextInput, FlatList, RefreshControl, Modal, Button } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Link } from 'expo-router'
import { addAnimalStyle } from "../style/addAnimalStyle";

const localip = process.env.EXPO_PUBLIC_LOCAL_IP


const Animal = () => {
    const [dataAnimal, setDataAnimal] = useState([])
    
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedAnimal, setSelectedAnimal] = useState("")
    const [aniName, setAniName] = useState("")
    const [aniDetails, setAniDetails] = useState("")
    const [aniQuantity, setAniQuantity] = useState("")
    // const [aniImage, setAniImage] = useState("")
    
    const fetchAnimal = () => {
        fetch(`http://${localip}:5001/fetchAnimal`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data && data.data) {
              setDataAnimal(data.data)  
            } else {
              console.error("Error: Animals data not found in response")
              setDataAnimal([]) 
            }
          })
          .catch((error) => {
            console.error("Error fetching animals data: ", error)
            setDataAnimal([]) 
          })
    }
      
    const handleDelete = (animalId) => {
      Alert.alert("Confirm Delete", "Are you sure you want to delete this animal?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            fetch(`http://${localip}:5001/deleteAnimal`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ animalId }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.message === "Animal deleted successfully") {
                  Alert.alert("Success", data.message)
                  fetchAnimal() // Refresh the list
                } else {
                  Alert.alert("Error", data.message)
                }
              })
              .catch((error) => {
                console.error("Error deleting animal: ", error)
                Alert.alert("Error", "Could not delete animal.")
              })
          },
        },
      ])
    }

    const handleEdit = (data) => {
        console.log("Selected Animal: ", data);

        setSelectedAnimal(data);
        setAniDetails(data.animal_details);
        setAniQuantity(data.animal_quantity.toString());  // Ensure it's a string
        setAniName(data.animal_name);
        setShowEditModal(true);
    }
    
    const handleSaveEdit = async () => {
        const updatedAnimal = {
            animal_details: aniDetails,
            animal_quantity: aniQuantity,
            animal_name: aniName, // Corrected the key name here
        }
    
        try {
            const response = await fetch(`http://${localip}:5001/editAnimal`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    animalId: selectedAnimal._id, 
                    updatedData: updatedAnimal 
                }),
            });
    
            if (response.ok) {
                const updatedData = await response.json();
                setDataAnimal((prevData) =>
                    prevData.map((animal) =>
                        animal._id === selectedAnimal._id
                            ? { ...animal, ...updatedAnimal }
                            : animal
                    )
                );
                setShowEditModal(false);
            } else {
                console.error("Error updating animal in database");
            }
        } catch (error) {
            console.error("Error updating animal:", error);
        }
    }
    
    useEffect(() => {
      fetchAnimal()
    }, [])
  
    return (
      <ScrollView contentContainerStyle={styles.screen}>
        <TouchableOpacity style={styles.fab}>
          <Link href="../screen/addAnimal">
            <Ionicons name="add" size={24} color="white" />
          </Link>
        </TouchableOpacity>
        {dataAnimal.length > 0 ? (
          dataAnimal.map((animal, index) => (
            <View key={index} style={styles.card}>
              <Image source={{ uri: animal.animal_image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{animal.animal_name}</Text>
                <Text style={styles.cardText}>{animal.animal_details}</Text>
                <Text style={styles.cardQuantity}>Quantity: {animal.animal_quantity}</Text>
              </View>
              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => handleEdit(animal)} style={styles.actionButton}>
                  <Ionicons name="create-outline" size={20} color="#4CAF50" />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(animal._id)} style={styles.actionButton}>
                  <Ionicons name="trash-outline" size={20} color="#F44336" />
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No animal entries available.</Text>
        )}
        <Modal visible={showEditModal} animationType="slide" onRequestClose={() => setShowEditModal(false)}>
        <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Animal</Text>
            <TextInput 
                style={styles.input} 
                value={aniName} 
                onChangeText={setAniName} 
                placeholder="Name" 
            />
            <TextInput 
                style={styles.input} 
                value={aniDetails} 
                onChangeText={setAniDetails} 
                placeholder="Details" 
            />
            <TextInput
                style={styles.input}
                value={aniQuantity} 
                onChangeText={setAniQuantity}
                placeholder="Quantity"
                keyboardType="numeric"
            />
            <Button title="Save" onPress={handleSaveEdit} />
            <Button title="Cancel" onPress={() => setShowEditModal(false)} />
        </View>
        </Modal>
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
    const handleDelete = (cropId) => {
        Alert.alert("Confirm Delete", "Are you sure you want to delete this crop?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              fetch(`http://${localip}:5001/deleteCrop`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cropId }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.message === "Crop deleted successfully") {
                    Alert.alert("Success", data.message)
                    fetchCrop() // Refresh the list
                  } else {
                    Alert.alert("Error", data.message)
                  }
                })
                .catch((error) => {
                  console.error("Error deleting crop: ", error)
                  Alert.alert("Error", "Could not delete crop.")
                })
            },
          },
        ])
      }

    useEffect(() => {
        fetchCrop()
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.screen}>
            <TouchableOpacity style={styles.fab}>
                <Link href="../screen/addCrop">
                    <Ionicons name="add" size={24} color="white" />
                </Link>
            </TouchableOpacity>
            {dataCrop.length > 0 ? (
                dataCrop.map((crop, index) => (
                    <View key={index} style={styles.card}>
                      <Image source={{ uri: crop.crop_image }} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{crop.crop_name}</Text>
                            <Text style={styles.cardText}>{crop.crop_details}</Text>
                            <Text style={styles.cardDate}>{new Date(crop.crop_date).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.cardActions}>
                            <TouchableOpacity onPress={() => handleEdit(crop._id)} style={styles.actionButton}>
                                <Ionicons name="create-outline" size={20} color="#4CAF50" />
                                <Text style={styles.actionText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(crop._id)} style={styles.actionButton}>
                                <Ionicons name="trash-outline" size={20} color="#F44336" />
                                <Text style={styles.actionText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={styles.noDataText}>No crop entries available.</Text>
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
                    tabBarActiveTintColor: '#0A593C',
                    tabBarInactiveTintColor: '#AAAAAA',
                    tabBarStyle: {
                        backgroundColor: '#F5F5F5',
                        borderTopWidth: 0,
                        elevation: 5,
                    },
                    headerStyle: {
                        backgroundColor: '#0A593C',
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleAlign: 'center',
                }}
            >
                <Tab.Screen
                    name="Animal"
                    component={Animal}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="cow" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Crop"
                    component={Crop}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons name="grass" size={24} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default MyFarm

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#0A593C',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#0A593C',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContent: {
        flex: 1,
        marginLeft: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    cardText: {
        fontSize: 14,
        color: '#555555',
    },
    cardQuantity: {
        fontSize: 14,
        color: '#888888',
    },
    cardDate: {
        fontSize: 12,
        color: '#AAAAAA',
    },
    cardImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#EEEEEE',
    },
    noDataText: {
        fontSize: 16,
        color: '#888888',
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: "#fff"
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: "bold"
    },
    input: {
      backgroundColor: "#F8F8F8",
      padding: 10,
      marginVertical: 5,
      borderRadius: 5,
      borderColor: "#E5E5EA",
      borderWidth: 1
    },
})
