import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity, Alert, TextInput, FlatList, RefreshControl, Modal, Button } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Link } from 'expo-router'
import { myFarm } from '../style/myFarm'

const localip = process.env.EXPO_PUBLIC_LOCAL_IP

// const [refreshing, setRefreshing] = useState(false)


const Animal = () => {
    const [dataAnimal, setDataAnimal] = useState([])
    
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedAnimal, setSelectedAnimal] = useState("")
    const [aniName, setAniName] = useState("")
    const [aniDetails, setAniDetails] = useState("")
    const [aniQuantity, setAniQuantity] = useState("")
    
    const fetchAnimal = () => {
      // setRefreshing(true)
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
          // .finally(() => setRefreshing(false))
    }
    // const onRefreshAnimal = () => {
    //   setRefreshing(true)
    //   fetchAnimal()
    // }
      
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

    const handleEditAnimal = (data) => {
        console.log("Selected Animal: ", data);

        setSelectedAnimal(data);
        setAniDetails(data.animal_details);
        setAniQuantity(data.animal_quantity.toString());  
        setAniName(data.animal_name);
        setShowEditModal(true);
    }
    
    const handleSaveEditAnimal = async () => {
        const updatedAnimal = {
            animal_details: aniDetails,
            animal_quantity: aniQuantity,
            animal_name: aniName, 
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
      <ScrollView contentContainerStyle={myFarm.screen}
        
      >
        <TouchableOpacity style={myFarm.fab}>
          <Link href="../screen/addAnimal">
            <Ionicons name="add" size={24} color="white" />
          </Link>
        </TouchableOpacity>
        {dataAnimal.length > 0 ? (
          dataAnimal.map((animal, index) => (
            <View key={index} style={myFarm.card}>
              <Image source={{ uri: animal.animal_image }} style={myFarm.cardImage} />
              <View style={myFarm.cardContent}>
                <Text style={myFarm.cardTitle}>{animal.animal_name}</Text>
                <Text style={myFarm.cardText}>{animal.animal_details}</Text>
                <Text style={myFarm.cardQuantity}>Quantity: {animal.animal_quantity}</Text>
              </View>
              <View style={myFarm.cardActions}>
                <TouchableOpacity onPress={() => handleEditAnimal(animal)} style={myFarm.actionButton}>
                  <Ionicons name="create-outline" size={20} color="#4CAF50" />
                  <Text style={myFarm.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(animal._id)} style={myFarm.actionButton}>
                  <Ionicons name="trash-outline" size={20} color="#F44336" />
                  <Text style={myFarm.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={myFarm.noDataText}>No animal entries available.</Text>
        )}
        <Modal visible={showEditModal} animationType="slide" onRequestClose={() => setShowEditModal(false)}>
          <View style={myFarm.modalContainer}>
              <Text style={myFarm.modalTitle}>Edit Animal</Text>
              <TextInput 
                  style={myFarm.input} 
                  value={aniName} 
                  onChangeText={setAniName} 
                  placeholder="Name" 
              />
              <TextInput 
                  style={myFarm.input} 
                  value={aniDetails} 
                  onChangeText={setAniDetails} 
                  placeholder="Details" 
              />
              <TextInput
                  style={myFarm.input}
                  value={aniQuantity} 
                  onChangeText={setAniQuantity}
                  placeholder="Quantity"
                  keyboardType="numeric"
              />
              <Button title="Save" onPress={handleSaveEditAnimal} />
              <Button title="Cancel" onPress={() => setShowEditModal(false)} />
          </View>
        </Modal>
      </ScrollView>
    )
}

const Crop = () => {
    const [dataCrop, setDataCrop] = useState([])

    const [showEditModal, setShowEditModal] = useState(false)

    const [selectedCrop, setSelectedCrop] = useState("")
    const [cropName, setCropName] = useState("")
    const [cropDetails, setCropDetails] = useState("")

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
            // .finally(() => setRefreshing(false))

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
    // const onRefreshCrop = () => {
    //   setRefreshing(true)
    //   fetchCrop()
    // }

    const handleEditCrop = (data) => {
      setSelectedCrop(data);
      setCropName(data.crop_name);
      setCropDetails(data.crop_details)
      setShowEditModal(true);
    }
    const handleSaveEditCrop = async () => {
      const updatedCrop = {
        crop_name: cropName,
        crop_details: cropDetails,
      }
  
      try {
          const response = await fetch(`http://${localip}:5001/editCrop`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                  cropId: selectedCrop._id, 
                  updatedData: updatedCrop 
              }),
          });
  
          if (response.ok) {
              const updatedData = await response.json();
              setDataCrop((prevData) =>
                  prevData.map((crop) =>
                      crop._id === selectedCrop._id
                          ? { ...crop, ...updatedCrop }
                          : crop
                  )
              );
              setShowEditModal(false);
          } else {
              console.error("Error updating crop in database");
          }
      } catch (error) {
          console.error("Error updating crop:", error);
      }
  }

    useEffect(() => {
        fetchCrop()
    }, [])

    return (
        <ScrollView contentContainerStyle={myFarm.screen}>
            <TouchableOpacity style={myFarm.fab}>
                <Link href="../screen/addCrop">
                    <Ionicons name="add" size={24} color="white" />
                </Link>
            </TouchableOpacity>
            {dataCrop.length > 0 ? (
                dataCrop.map((crop, index) => (
                    <View key={index} style={myFarm.card}>
                      <Image source={{ uri: crop.crop_image }} style={myFarm.cardImage} />
                        <View style={myFarm.cardContent}>
                            <Text style={myFarm.cardTitle}>{crop.crop_name}</Text>
                            <Text style={myFarm.cardText}>{crop.crop_details}</Text>
                            <Text style={myFarm.cardDate}>{new Date(crop.crop_date).toLocaleDateString()}</Text>
                        </View>
                        <View style={myFarm.cardActions}>
                            <TouchableOpacity onPress={() => handleEditCrop(crop)} style={myFarm.actionButton}>
                                <Ionicons name="create-outline" size={20} color="#4CAF50" />
                                <Text style={myFarm.actionText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(crop._id)} style={myFarm.actionButton}>
                                <Ionicons name="trash-outline" size={20} color="#F44336" />
                                <Text style={myFarm.actionText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            ) : (
                <Text style={myFarm.noDataText}>No crop entries available.</Text>
            )}
          <Modal visible={showEditModal} animationType="slide" onRequestClose={() => setShowEditModal(false)}>
            <View style={myFarm.modalContainer}>
                <Text style={myFarm.modalTitle}>Edit Crop</Text>
                <TextInput 
                    style={myFarm.input} 
                    value={cropName} 
                    onChangeText={setCropName} 
                    placeholder="Name" 
                    editable={false}
                />
                <TextInput
                    style={myFarm.input}
                    value={cropDetails} 
                    onChangeText={setCropDetails}
                    placeholder="Details"
                />
                <Button title="Save" onPress={handleSaveEditCrop} />
                <Button title="Cancel" onPress={() => setShowEditModal(false)} />
            </View>
          </Modal>
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


