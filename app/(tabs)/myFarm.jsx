import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, RefreshControl } from 'react-native';
import { Link } from "expo-router";

const MyFarm = () => {
    const [activeTab, setActiveTab] = useState('Crops');
    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = () => {
        fetch("http://192.168.1.5:5001/fetchCrop", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data, "Crop");
                setData(data.data);
            })
            .catch((error) => {
                console.error("Error fetching crops data:", error);
            })
            .finally(() => setRefreshing(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const renderCard = ({ item }) => (
        <View style={styles.card}>
            {/* <Image source={{ uri: `${item.image || '/Tai Lieu Hoc Phan/DACN2/Agriculture/assets/images/default.png'}` }} style={styles.cardImage} /> */}
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.crop_name}</Text>
                <Text style={styles.cardDescription}>{item.crop_details}</Text>
                <Text style={styles.cardDate}>{item.crop_date}</Text>
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
                data={data}
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
    cardImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 15,
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
