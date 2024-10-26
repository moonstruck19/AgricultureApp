import { StyleSheet, Text, View, Alert, SafeAreaView, ActivityIndicator, ScrollView, RefreshControl, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

const openWeatherKey = 'ca0a5e7f252676cb6415682e10892670';
let url = `https://api.openweathermap.org/data/2.5/weather?`;

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadForecast = async () => {
        setRefreshing(true);
        const { status } =  await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission was denied');
            setRefreshing(false);
            return;
        }

        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        const response = await fetch(`${url}lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&appid=${openWeatherKey}`);
        const data = await response.json();

        if (!response.ok) {
            Alert.alert('Error fetching weather data');
        } else {
            setForecast(data);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        loadForecast();
    }, []);

    if (!forecast) {
        return (
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator size="large" color="#1e90ff" />
            </SafeAreaView>
        );
    }

    const weather = forecast.weather[0];
    const temperature = forecast.main.temp;
    const feelsLike = forecast.main.feels_like;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadForecast} />
                }
                contentContainerStyle={styles.scrollView}
            >
                <Text style={styles.title}>Current Weather</Text>
                <Text style={styles.subtitle}>Your Location</Text>

                <View style={styles.weatherContainer}>
                    <Image 
                        source={{ uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png` }}
                        style={styles.weatherIcon}
                    />
                    <Text style={styles.weatherDescription}>{weather.description}</Text>
                    <Text style={styles.temperature}>{temperature.toFixed(1)}°C</Text>
                    <Text style={styles.feelsLike}>Feels like {feelsLike.toFixed(1)}°C</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Weather;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f5',
    },
    scrollView: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 34,
        fontWeight: '600',
        color: '#1e90ff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
        textAlign: 'center',
    },
    weatherContainer: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    weatherIcon: {
        width: 100,
        height: 100,
    },
    weatherDescription: {
        fontSize: 20,
        color: '#555',
        marginVertical: 5,
        textTransform: 'capitalize',
    },
    temperature: {
        fontSize: 48,
        fontWeight: '300',
        color: '#1e90ff',
    },
    feelsLike: {
        fontSize: 16,
        color: '#777',
    },
});
