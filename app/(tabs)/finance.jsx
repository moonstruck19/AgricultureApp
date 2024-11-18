import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl, Modal, TextInput, Button, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { Link } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Report from '../screen/report';


const localip = process.env.EXPO_PUBLIC_LOCAL_IP;

const Revenue = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [dataRevenue, setDataRevenue] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRevenue, setSelectedRevenue] = useState(null);
  const [reType, setReType] = useState("");
  const [reQuantity, setReQuantity] = useState("");
  const [rePrice, setRePrice] = useState("");

  const fetchRevenue = async () => {
    try {
      const response = await fetch(`http://${localip}:5001/fetchRevenue`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setDataRevenue(data.data || []);
      } else {
        console.error("Error fetching revenue data:", data.message);
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchRevenue();
    setRefreshing(false);
  };

  const handleEdit = (revenue) => {
    setSelectedRevenue(revenue);
    setReType(revenue.re_type);
    setReQuantity(revenue.re_quantity);
    setRePrice(revenue.re_price);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    const updatedRevenue = {
      re_type: reType,
      re_quantity: reQuantity,
      re_price: rePrice,
    };

    try {
      const response = await fetch(`http://${localip}:5001/editRevenue`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ revenueId: selectedRevenue._id, updatedData: updatedRevenue }),
      });

      if (response.ok) {
        setDataRevenue((prevData) =>
          prevData.map((revenue) =>
            revenue._id === selectedRevenue._id ? { ...revenue, ...updatedRevenue } : revenue
          )
        );
        setShowEditModal(false);
      } else {
        console.error("Error updating revenue in database");
      }
    } catch (error) {
      console.error("Error updating revenue:", error);
    }
  };

  const handleDelete = async (revenueId) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(`http://${localip}:5001/deleteRevenue`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ revenueId: revenueId }),
            });

            if (response.ok) {
              setDataRevenue(dataRevenue.filter((revenue) => revenue._id !== revenueId));
            } else {
              console.error("Error deleting revenue from database");
            }
          } catch (error) {
            console.error("Error deleting revenue:", error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchRevenue();
  }, []);

  return (
    <ScrollView
      style={finance.screen}
      contentContainerStyle={finance.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <TouchableOpacity style={finance.fab}>
        <Link href="../screen/addRevenue">
          <Ionicons name="add" size={24} color="white" />
        </Link>
      </TouchableOpacity>
      {dataRevenue.length > 0 ? (
        dataRevenue.map((data, index) => (
          <View key={index} style={finance.card}>
            <Text>Date: {new Date(data.re_date).toLocaleString()}</Text>
            <Text>Type: {data.re_type}</Text>
            <Text>Quantity: {data.re_quantity}</Text>
            <Text>Revenue: ${data.re_price}</Text>
            <View style={finance.buttonContainer}>
              <TouchableOpacity
                style={finance.editButton}
                onPress={() => handleEdit(data)}
              >
                <Text style={finance.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={finance.deleteButton}
                onPress={() => handleDelete(data._id)}
              >
                <Text style={finance.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={finance.noData}>No revenue entries available.</Text>
      )}

      <Modal visible={showEditModal} animationType="slide">
        <View style={finance.modalContainer}>
          <Text style={finance.modalTitle}>Edit Revenue</Text>
          <Text>Type of Revenue</Text>
          <TextInput
            style={finance.input}
            value={reType}
            onChangeText={setReType}
            placeholder="Type"
            editable={false}
          />
          <Text>Quantity</Text>
          <TextInput
            style={finance.input}
            value={reQuantity}
            onChangeText={setReQuantity}
            placeholder="Quantity"
            keyboardType="numeric"
            editable={false}
          />
          <Text>Price</Text>
          <TextInput
            style={finance.input}
            value={rePrice}
            onChangeText={setRePrice}
            placeholder="Price"
            keyboardType="numeric"
          />
          <Button title="Save" onPress={handleSaveEdit} />
          <Button title="Cancel" onPress={() => setShowEditModal(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const Expense = () => {
  const [dataExpense, setDataExpense] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [exType, setExType] = useState("");
  const [exQuantity, setExQuantity] = useState("");
  const [exPrice, setExPrice] = useState("");

  const fetchExpense = async () => {
    try {
      const response = await fetch(`http://${localip}:5001/fetchExpense`, {
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setDataExpense(data.data || []);
      } else {
        console.error("Error fetching expenses:", data.message);
      }
    } catch (error) {
      console.error("Error fetching Expense data:", error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchExpense();
    setRefreshing(false);
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense);
    setExType(expense.ex_type);
    setExQuantity(expense.ex_quantity);
    setExPrice(expense.ex_price);
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    const updatedExpense = {
      ex_type: exType,
      ex_quantity: parseInt(exQuantity),
      ex_price: parseFloat(exPrice),
    };

    try {
      const response = await fetch(`http://${localip}:5001/editExpense`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          expenseId: selectedExpense._id, 
          updatedData: updatedExpense 
        }),
      });

      if (response.ok) {
        setDataExpense((prevData) =>
          prevData.map((expense) =>
            expense._id === selectedExpense._id ? { ...expense, ...updatedExpense } : expense
          )
        );
        setShowEditModal(false);
      } else {
        console.error("Error updating expense in database");
      }
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDelete = async (exId) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this expense?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(`http://${localip}:5001/deleteExpense`, {
              method: "DELETE",
              headers: { 
                "Content-Type": "application/json" 
              },
              body: JSON.stringify({ expenseId: exId }),
            });

            if (response.ok) {
              setDataExpense(dataExpense.filter((expense) => expense._id !== exId));
            } else {
              console.error("Error deleting expense from database");
            }
          } catch (error) {
            console.error("Error deleting expense:", error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  return (
    <ScrollView
      style={finance.screen}
      contentContainerStyle={finance.contentContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <TouchableOpacity style={finance.fab}>
        <Link href="../screen/addExpense">
          <Ionicons name="add" size={24} color="white" />
        </Link>
      </TouchableOpacity>
      {dataExpense.length > 0 ? (
        dataExpense.map((data, index) => (
          <View key={index} style={finance.card}>
            <Text>Date: {new Date(data.ex_date).toLocaleString()}</Text>
            <Text>Type: {data.ex_type}</Text>
            <Text>Quantity: {data.ex_quantity}</Text>
            <Text>Expense: ${data.ex_price}</Text>
            <View style={finance.buttonContainer}>
              <TouchableOpacity
                style={finance.editButton}
                onPress={() => handleEdit(data)}
              >
                <Text style={finance.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={finance.deleteButton}
                onPress={() => handleDelete(data._id)}
              >
                <Text style={finance.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={finance.noData}>No expense entries available.</Text>
      )}

      <Modal visible={showEditModal} animationType="slide">
        <View style={finance.modalContainer}>
          <Text style={finance.modalTitle}>Edit Expense</Text>
          <Text>Type of Expense</Text>
          <TextInput
            style={finance.input}
            value={exType}
            onChangeText={setExType}
            placeholder="Type"
            editable={false}
          />
          <Text>Quantity</Text>
          <TextInput
            style={finance.input}
            value={exQuantity}
            onChangeText={setExQuantity}
            placeholder="Quantity"
            keyboardType="numeric"
            maxLength={4}
            editable={false}
          />
          <Text>Price</Text>
          <TextInput
            style={finance.input}
            value={exPrice}
            onChangeText={setExPrice}
            placeholder="Price"
            keyboardType="numeric"
          />
          <Button title="Save" onPress={handleSaveEdit} />
          <Button title="Cancel" onPress={() => setShowEditModal(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const Statistical = () => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Financial Report</Text>
      <Text style={styles.label}>Total Revenue: ${reportData.totalRevenue.toFixed(2)}</Text>
      <Text style={styles.label}>Total Expense: ${reportData.totalExpense.toFixed(2)}</Text>
      <Text style={styles.label}>Profit: ${reportData.profit.toFixed(2)}</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const Finance = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#00A86B',
          tabBarInactiveTintColor: '#7D7D7D',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 5,
          },
          headerStyle: {
            backgroundColor: '#0a593c',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tab.Screen
          name="Revenue"
          component={Revenue}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="attach-money" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Expense"
          component={Expense}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="attach-money" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Statistical"
          component={Report}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="bar-chart" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Finance;

const styles = StyleSheet.create({
  // screen: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: '#333',
  //   marginBottom: 10,
  // },
  screen: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  fab: {
    position: 'absolute',
    bottom: 20, // Position above the bottom of the screen
    right: 20,  // Position to the right
    backgroundColor: '#0A593C',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10,
},

  content: {
    fontSize: 18,
    color: '#555',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  contentContainer: {
    alignItems: 'center',
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
  noData: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adds a semi-transparent background
    padding: 20,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  editButton: {
    backgroundColor: "#0a593c",
    padding: 5,
    borderRadius: 5
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 5,
    borderRadius: 5
  },
  buttonText: {
    color: "#fff"
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  cancelButton: {
    backgroundColor: "#f44336", // Red color for Cancel
  },
  buttonText: {
    color: "#4caf50",
    fontSize: 16,
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginVertical: 5,
  },
});
