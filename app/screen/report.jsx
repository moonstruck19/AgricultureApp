import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const localip = process.env.EXPO_PUBLIC_LOCAL_IP;
const screenWidth = Dimensions.get('window').width;

const Report = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    try {
      const response = await fetch(`http://${localip}:5001/fetchReport`, {
        method: 'GET',
      });
      const data = await response.json();
      if (response.ok) {
        setReportData(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
      setError('Error fetching report data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00A86B" />
        <Text>Loading report data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const chartData = {
    labels: ['Revenue', 'Expense', 'Profit'],
    datasets: [
      {
        data: [reportData.totalRevenue, reportData.totalExpense, reportData.profit],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Financial Report</Text>
      <Text style={styles.label}>Total Revenue: ${reportData.totalRevenue.toFixed(2)}</Text>
      <Text style={styles.label}>Total Expense: ${reportData.totalExpense.toFixed(2)}</Text>
      <Text style={styles.label}>Profit: ${reportData.profit.toFixed(2)}</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginVertical: 5,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'center',
  },
});

export default Report;