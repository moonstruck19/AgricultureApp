import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Link } from "expo-router";
import { myFarm } from '../style/myFarm'


const MyFarm = () => {
    const [activeTab, setActiveTab] = useState('Crops');
    const [dataCrop, setDataCrop] = useState([]);
    const [dataAnimal, setDataAnimal] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const localip = process.env.EXPO_PUBLIC_LOCAL_IP


    const fetchCrop = () => {
        fetch(`http://${localip}:5001/fetchCrop`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((dataCrop) => {
                setDataCrop(dataCrop.data)
            })
            .catch((error) => {
                console.error("Error fetching crops data: ", error)
            })
            .finally(() => setRefreshing(false))
    }

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
            .finally(() => setRefreshing(false))
    };

    useEffect(() => {
        fetchCrop()
        fetchAnimal()
    }, [])

    const onRefresh = () => {
        setRefreshing(true)
        fetchCrop()
        fetchAnimal()
    }

    const renderCard = ({ item }) => (
        <View style={myFarm.card}>
            <View style={myFarm.cardContent}>
                {activeTab === 'Crops' ? (
                    <>
                        <Text style={myFarm.cardTitle}>{item.crop_name}</Text>
                        <Text style={myFarm.cardDescription}>{item.crop_details}</Text>
                        <Text style={myFarm.cardDate}>{item.crop_date}</Text>
                    </>
                ) : (
                    <>
                        <Text style={myFarm.cardTitle}>{item.animal_name}</Text>
                        <Text style={myFarm.cardDescription}>{item.animal_details}</Text>
                        <Text style={myFarm.cardQuantity}>Quantity: {item.animal_quantity}</Text>
                        <Text style={myFarm.cardDate}>{item.animal_date}</Text>
                    </>
                )}
                <TouchableOpacity>
                    <Text style={myFarm.detailsButton}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const buttonText = activeTab === 'Crops' ? 'Add Crop' : 'Add Animal';
    const buttonPath = activeTab === 'Crops' ? '/screen/addCrop' : '/screen/addAnimal';

    return (
        <View style={myFarm.container}>
            <View style={myFarm.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab('Crops')} style={[myFarm.tab, activeTab === 'Crops' && myFarm.activeTab]}>
                    <Text style={activeTab === 'Crops' ? myFarm.activeTabText : myFarm.tabText}>Crops</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Animals')} style={[myFarm.tab, activeTab === 'Animals' && myFarm.activeTab]}>
                    <Text style={activeTab === 'Animals' ? myFarm.activeTabText : myFarm.tabText}>Animals</Text>
                </TouchableOpacity>
            </View>
            <Link href={buttonPath} style={myFarm.option}>
                <Text style={myFarm.optionText}>{buttonText}</Text>
            </Link>
            <FlatList
                data={activeTab === 'Crops' ? dataCrop : dataAnimal}
                renderItem={renderCard}
                keyExtractor={(item) => item._id}
                contentContainerStyle={myFarm.cardList}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
};

export default MyFarm;


