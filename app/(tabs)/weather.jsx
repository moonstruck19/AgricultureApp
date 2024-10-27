import { StyleSheet, Text, View, Alert, SafeAreaView, ActivityIndicator, ScrollView, RefreshControl, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import * as Location from 'expo-location';

const openWeatherKey = 'ca0a5e7f252676cb6415682e10892670';
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?`;
const lang = 'en'

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [locationName, setLocationName] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    const loadWeatherData = async () => {
        setRefreshing(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission was denied');
                setRefreshing(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            const { latitude, longitude } = location.coords;

            // Fetch current weather
            const currentResponse = await fetch(`${currentWeatherUrl}lat=${latitude}&lon=${longitude}&lang=${lang}&units=metric&appid=${openWeatherKey}`);
            const currentData = await currentResponse.json();
            if (currentResponse.ok) {
                setForecast(currentData);
                setLocationName(`${currentData.name}, ${currentData.sys.country}`);
                // console.log(currentData)
            } else {
                throw new Error("Could not fetch current weather data");
            }

            // Fetch 5-day forecast
            const forecastResponse = await fetch(`${forecastUrl}lat=${latitude}&lon=${longitude}&lang=${lang}&units=metric&appid=${openWeatherKey}`);
            const forecastData = await forecastResponse.json();
            if (forecastResponse.ok) {
                setForecast(prevState => ({ ...prevState, daily: forecastData.list.filter((item, index) => index % 8 === 0) }));
            } else {
                throw new Error("Could not fetch forecast data");
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        loadWeatherData();
    }, []);

    if (!forecast) {
        return (
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator size="large" color="#1e90ff" />
            </SafeAreaView>
        );
    }

    const weather = forecast.weather[0]
    const temperature = forecast.main.temp
    const feelsLike = forecast.main.feels_like
    const humidity = forecast.main.humidity
    const windSpeed = forecast.wind.speed
    const rainVolume = forecast.rain ? forecast.rain["1h"] : 0

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadWeatherData} />
                }
                contentContainerStyle={styles.scrollView}
            >
                <Text style={styles.location}>{locationName}</Text>
                <View style={styles.weatherContainer}>
                    <Image 
                        source={{ uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png` }}
                        style={styles.weatherIcon}
                    />
                    <Text style={styles.temperature}>{temperature.toFixed(1)}°C</Text>
                    <Text style={styles.weatherDescription}>{weather.description}</Text>
                    <Text style={styles.feelsLike}>Feels like {feelsLike.toFixed(1)}°C</Text>
                </View>

                <View style={styles.weatherInfo}>
                    <View style={styles.windSpeed}>
                        <MaterialCommunityIcons name="weather-windy" size={24} color="black" />
                        <Text>{windSpeed}km/h</Text>
                        <Text>Speed</Text>
                    </View>

                    <View style={styles.humidity}>
                        <Entypo name="air" size={24} color="black" />
                        <Text>{humidity}%</Text>
                        <Text>Humidity</Text>
                    </View>

                    <View style={styles.rainVolume}>
                        <MaterialCommunityIcons name="weather-rainy" size={24} color="black" />
                        <Text>{rainVolume}%</Text>
                        <Text>Rain</Text>
                    </View>
                </View>

                <View style={styles.dailyForecastContainer}>
                    <View style={styles.dailyForecast}>
                        <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="black" />
                        <Text style={styles.dailyForecastTitle}>Next 5 day</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {forecast.daily ? forecast.daily.map((day, index) => (
                            <View key={index} style={styles.dailyItem}>
                                <Text>{new Date(day.dt * 1000).toLocaleDateString(`${lang}`, { weekday: 'short' })}</Text>
                                <Image
                                    source={{ uri: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png` }}
                                    style={styles.dailyIcon}
                                />
                                <Text>{day.main.temp.toFixed(1)}°C</Text>
                            </View>
                        )) : <Text style={{color: '#ffffff'}}>Loading forecast...</Text>}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Weather;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e293b',
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    location: {
        textAlign: 'center',
        fontSize: 22,
        color: '#000',
        marginTop: 30,
    },
    weatherContainer: {
        alignItems: 'center',
        marginTop: 5,
    },
    weatherIcon: {
        width: 220,
        height: 220,
    },
    temperature: {
        fontSize: 48,
        color: '#000',
        fontWeight: '500',
        marginBottom: 20,
        marginTop: -20,
    },
    weatherDescription: {
        fontSize: 20,
        color: '#000',
        textTransform: 'capitalize',
    },
    feelsLike: {
        fontSize: 16,
        color: '#a1a1aa',
        marginTop: 5,
        marginBottom: 20,
    },
    weatherInfo: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#f0f0f5',
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        width: '100%',
        alignSelf: 'center',
    },
    windSpeed: {
        alignItems: 'center',
    },
    humidity: {
        alignItems: 'center',
    },
    rainVolume: {
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    infoLabel: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    dailyForecastContainer: {
        alignSelf: 'center',
        marginTop: 30,
    },
    dailyForecast: {
        flexDirection: "row",
    },
    dailyForecastTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: '#000',
        marginBottom: 30,
        marginLeft: 10,
    },
    dailyItem: {
        alignItems: 'center',
        marginRight: 20,
    },
    dailyIcon: {
        width: 50,
        height: 50,
    },
});
