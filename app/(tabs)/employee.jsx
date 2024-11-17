import React, { useState, useEffect } from "react"
import { View, Text, TextInput, FlatList, RefreshControl, Modal, Button, TouchableOpacity } from "react-native"
import { Link } from "expo-router"
import { employee } from "../style/employee"
import { Alert } from "react-native"

const Employee = () => {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [empName, setEmpName] = useState("")
  const [empAge, setEmpAge] = useState("")
  const [empPhone, setEmpPhone] = useState("")
  const [empAddress, setEmpAddress] = useState("")
  const [empSalary, setEmpSalary] = useState("")
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP

  const fetchEmp = () => {
    setRefreshing(true)
    fetch(`http://${localip}:5001/fetchEmp`, { method: "GET" })
      .then((res) => res.json())
      .then((employees) => {
        setEmployees(employees.data)
        setFilteredEmployees(employees.data)
      })
      .catch((error) => {
        console.error("Error fetching Emp Data: ", error)
      })
      .finally(() => setRefreshing(false))
  }

  useEffect(() => {
    fetchEmp()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchEmp()
  }

  const handleSearch = (text) => {
    setSearchTerm(text)
    if (text) {
      const filtered = employees.filter((employee) =>
        employee.emp_name.toLowerCase().includes(text.toLowerCase())
      )
      setFilteredEmployees(filtered)
    } else {
      setFilteredEmployees(employees)
    }
  }

  const handleEdit = (employee) => {
    setSelectedEmployee(employee)
    setEmpName(employee.emp_name)
    setEmpAge(employee.emp_age.toString())
    setEmpPhone(employee.emp_phone.toString())
    setEmpAddress(employee.emp_address)
    setEmpSalary(employee.emp_salary.toString())
    setShowEditModal(true)
  }
  
  const handleSaveEdit = async () => {
    const updatedEmployee = {
      emp_name: empName,
      emp_age: parseInt(empAge),
      emp_phone: parseInt(empPhone),
      emp_address: empAddress,
      emp_salary: parseFloat(empSalary),
    }
  
    try {
      const response = await fetch(`http://${localip}:5001/editEmp`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          empId: selectedEmployee._id, 
          updatedData: updatedEmployee 
        }),
      })
  
      if (response.ok) {
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp._id === selectedEmployee._id ? { ...emp, ...updatedEmployee } : emp
          )
        )
        setShowEditModal(false)
      } else {
        console.error("Error updating employee in database")
      }
    } catch (error) {
      console.error("Error updating employee:", error)
    }
  }
  

  const handleDelete = async (empId) => {    
    Alert.alert("Confirm Delete", "Are you sure you want to delete this animal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(`http://${localip}:5001/deleteEmp`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ empId: empId }),
            })
      
            if (response.ok) {
              // Filter out the deleted employee from the local state
              setEmployees(employees.filter((employee) => employee._id !== empId))
            } else {
              console.error("Error deleting employee from database")
            }
          } catch (error) {
            console.error("Error deleting employee:", error)
          }
        },
      },
    ])
  }

  const renderEmployeeItem = ({ item }) => (
    <View style={employee.employeeItem}>
      <Text style={employee.employeeName}>{item.emp_name}</Text>
      <Text>Age: {item.emp_age}</Text>
      <Text>Phone: {item.emp_phone}</Text>
      <Text>Address: {item.emp_address}</Text>
      <Text>Salary: ${item.emp_salary}</Text>
      <View style={employee.buttonContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={employee.editButton}>
          <Text style={employee.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item._id)} style={employee.deleteButton}>
          <Text style={employee.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={employee.container}>
      <View style={employee.header}>
        <TextInput
          style={employee.searchBar}
          placeholder="Search by name"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <Link href="/screen/addEmp" style={employee.addButton}>
          <Text style={employee.addButtonText}>Add Employee</Text>
        </Link>
      </View>

      <FlatList
        data={filteredEmployees}
        renderItem={renderEmployeeItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={employee.listContainer}
        ListEmptyComponent={<Text style={employee.emptyText}>No employees found.</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      <Modal visible={showEditModal} animationType="slide" onRequestClose={() => setShowEditModal(false)}>
        <View style={employee.modalContainer}>
          <Text style={employee.modalTitle}>Edit Employee</Text>
          <TextInput 
            style={employee.input} 
            value={empName} 
            onChangeText={setEmpName} 
            placeholder="Name" 
          />
          <TextInput 
            style={employee.input} 
            value={empAge} 
            onChangeText={setEmpAge} 
            placeholder="Age" 
            keyboardType="numeric" 
          />
          <TextInput style={employee.input} value={empPhone} onChangeText={setEmpPhone} placeholder="Phone" />
          <TextInput style={employee.input} value={empAddress} onChangeText={setEmpAddress} placeholder="Address" />
          <TextInput style={employee.input} value={empSalary} onChangeText={setEmpSalary} placeholder="Salary" keyboardType="numeric" />
          <Button title="Save" onPress={handleSaveEdit} />
          <Button title="Cancel" onPress={() => setShowEditModal(false)} />
        </View>
      </Modal>
    </View>
  )
}

export default Employee

