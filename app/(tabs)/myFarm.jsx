import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Link } from "expo-router";

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
                setDataCrop(dataCrop.data);
            })
            .catch((error) => {
                console.error("Error fetching crops data: ", error);
            })
            .finally(() => setRefreshing(false));
    };

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
            })
            .finally(() => setRefreshing(false));
    };

    useEffect(() => {
        fetchCrop();
        fetchAnimal();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchCrop();
        fetchAnimal();
    };

    const renderCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {activeTab === 'Crops' ? (
                    <>
                        <Text style={styles.cardTitle}>{item.crop_name}</Text>
                        <Text style={styles.cardDescription}>{item.crop_details}</Text>
                        <Text style={styles.cardDate}>{item.crop_date}</Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.cardTitle}>{item.animal_name}</Text>
                        <Text style={styles.cardDescription}>{item.animal_details}</Text>
                        <Text style={styles.cardQuantity}>Quantity: {item.animal_quantity}</Text>
                        <Text style={styles.cardDate}>{item.animal_date}</Text>
                    </>
                )}
                <TouchableOpacity>
                    <Text style={styles.detailsButton}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const buttonText = activeTab === 'Crops' ? 'Add Crop' : 'Add Animal';
    const buttonPath = activeTab === 'Crops' ? '/screen/addCrop' : '/screen/addAnimal';

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => setActiveTab('Crops')} style={[styles.tab, activeTab === 'Crops' && styles.activeTab]}>
                    <Text style={activeTab === 'Crops' ? styles.activeTabText : styles.tabText}>Crops</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Animals')} style={[styles.tab, activeTab === 'Animals' && styles.activeTab]}>
                    <Text style={activeTab === 'Animals' ? styles.activeTabText : styles.tabText}>Animals</Text>
                </TouchableOpacity>
            </View>
            <Link href={buttonPath} style={styles.option}>
                <Text style={styles.optionText}>{buttonText}</Text>
            </Link>
            <FlatList
                data={activeTab === 'Crops' ? dataCrop : dataAnimal}
                renderItem={renderCard}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.cardList}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
};

export default MyFarm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f5',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        backgroundColor: '#ffffff',
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#34c759',
    },
    tabText: {
        fontSize: 16,
        color: '#8e8e93',
    },
    activeTabText: {
        fontSize: 16,
        color: '#34c759',
        fontWeight: '600',
    },
    option: {
        backgroundColor: '#34c759',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardList: {
        padding: 10,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    cardDescription: {
        fontSize: 14,
        color: '#8e8e93',
        marginVertical: 5,
    },
    cardQuantity: {
        fontSize: 14,
        color: '#8e8e93',
    },
    cardDate: {
        fontSize: 12,
        color: '#8e8e93',
    },
    detailsButton: {
        fontSize: 14,
        color: '#34c759',
        marginTop: 10,
    },
});
