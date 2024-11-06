import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addTask } from '../style/addTask';

const validationTask = Yup.object().shape({
  task_name: Yup.string().required('Task Name is required'),
  task_description: Yup.string().required('Task Description is required'),
});

const AddTask = () => {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskMember, setTaskMember] = useState("");
  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP;

  const fetchEmp = async () => {
    try {
      const response = await fetch(`http://${localip}:5001/fetchEmp`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error("Error fetching Emp Data: ", error);
    }
  };

  const handleOpenModal = async () => {
    await fetchEmp();  // Fetch employee data when opening modal
    setModalVisible(true);
  };

  const handleSelectMember = (member) => {
    setTaskMember(member.emp_name);  // Set selected employee as task member
    setModalVisible(false);  // Close modal after selection
  };

  const handleAddTask = async (values) => {
    try {
      const response = await fetch(`http://${localip}:5001/addTask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_name: values.task_name,
          task_description: values.task_description,
          task_member: taskMember,
        }),
      });

      if (response.ok) {
        alert("Task added successfully!");
      } else {
        const result = await response.json();
        alert(result.message || "Error adding task.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <View style={addTask.container}>
      <Formik
        initialValues={{ task_name: "", task_description: "", task_member: "" }}
        onSubmit={handleAddTask}
        validationSchema={validationTask}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={addTask.section}>
              <Text style={addTask.label}>Title</Text>
              <TextInput
                style={addTask.input}
                onChangeText={handleChange('task_name')}
                onBlur={handleBlur('task_name')}
                value={values.task_name}
              />
              {touched.task_name && errors.task_name && (
                <Text style={addTask.errorText}>{errors.task_name}</Text>
              )}
            </View>

            <View style={addTask.section}>
              <Text style={addTask.label}>Description</Text>
              <TextInput
                onChangeText={(text) => {
                  setTaskDescription(text);
                  handleChange('task_description')(text);
                }}
                onBlur={handleBlur('task_description')}
                style={addTask.textArea}
                multiline={true}
                maxLength={45}
                value={values.task_description}
              />
              <Text style={addTask.textCount}>{taskDescription.length}/45</Text>
              {touched.task_description && errors.task_description && (
                <Text style={addTask.errorText}>{errors.task_description}</Text>
              )}
            </View>

            <View style={addTask.section}>
              <Text style={addTask.label}>Member</Text>
              <View style={addTask.inline}>
                <View style={addTask.assigned}>
                  <Ionicons name="person-circle" size={24} color="black" />
                  <Text style={addTask.assignedText}>{taskMember}</Text>
                </View>
                <TouchableOpacity onPress={handleOpenModal}>
                  <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            <Modal visible={isModalVisible} animationType="slide">
              <View style={addTask.modalContainer}>
                <Text style={addTask.modalTitle}>Select a Member</Text>
                <FlatList
                  data={employees}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={addTask.employeeItem}
                      onPress={() => handleSelectMember(item)}
                    >
                      <Text style={addTask.employeeName}>{item.emp_name}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={addTask.modalClose}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <TouchableOpacity onPress={handleSubmit} style={addTask.button}>
              <Text style={addTask.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddTask;
