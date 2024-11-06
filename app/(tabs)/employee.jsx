import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, RefreshControl } from "react-native";
import { Link } from "expo-router";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP;

  const fetchEmp = () => {
    setRefreshing(true);
    fetch(`http://${localip}:5001/fetchEmp`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((employees) => {
        setEmployees(employees.data);
        setFilteredEmployees(employees.data); // Set both lists on fetch
      })
      .catch((error) => {
        console.error("Error fetching Emp Data: ", error);
      })
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchEmp();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEmp(); // Call fetchEmp with parentheses
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text) {
      const filtered = employees.filter((employee) =>
        employee.emp_name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  };

  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem}>
      <Text style={styles.employeeName}>{item.emp_name}</Text>
      <Text>Age: {item.emp_age}</Text>
      <Text>Phone: {item.emp_phone}</Text>
      <Text>Address: {item.emp_address}</Text>
      <Text>Salary: ${item.emp_salary}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <Link href="/screen/addEmp" style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Employee</Text>
        </Link>
      </View>

      <FlatList
        data={filteredEmployees}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item._id} // Adjusted keyExtractor
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No employees found.</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default EmployeeList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  searchBar: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#E5E5EA",
    borderWidth: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#34C759",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  listContainer: {
    paddingBottom: 20,
  },
  employeeItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderColor: "#E5E5EA",
    borderWidth: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  emptyText: {
    textAlign: "center",
    color: "#aaa",
    fontSize: 16,
    marginTop: 20,
  },
});
