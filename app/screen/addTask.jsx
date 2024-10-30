import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

const validationTask = Yup.object().shape({
  task_name: Yup.string().required('Task Name is required'),
  task_description: Yup.string().required('Task Description is required'),
  // task_member: Yup.string().required('Task Member is required'),
});

const handleAddMember = async (setFieldValue) => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === 'granted') {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name],
    });

    if (data.length > 0) {
      const selectedContact = data[0].name;

      setTaskMember(selectedContact);
      setFieldValue('task_member', selectedContact);
    } else {
      alert('No contacts found');
    }
  } else {
    alert('Permission to access contacts was denied');
  }
};

const AddTask = () => {
  const [taskDescription, setTaskDescription] = useState("")
  const [taskMember, setTaskMember] = useState("")


  const handleAddTask = async (values) => {
    try {
      const response = await fetch(`http://192.168.1.5:5001/addTask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task_name: values.task_name,
          task_description: values.task_description,
          task_member: values.task_member,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Task added successfully!");
      } else {
        alert(result.message || "Error adding task.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ task_name: "", task_description: "", task_member: "" }}
        onSubmit={(values) => handleAddTask(values)}
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
            <View style={styles.section}>
              <Text style={styles.label}>Title</Text>
              <View style={styles.inline}>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('task_name')}
                  onBlur={handleBlur('task_name')}
                  value={values.task_name}
                />
              </View>
              {touched.task_name && errors.task_name && (
                <Text style={styles.errorText}>{errors.task_name}</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                onChangeText={(text) => {
                  setTaskDescription(text);
                  handleChange('task_description')(text);
                }}
                onBlur={handleBlur('task_description')}
                style={styles.textArea}
                multiline={true}
                maxLength={45}
                value={values.task_description}
              />
              <Text style={styles.textCount}>{taskDescription.length}/45</Text>
              {touched.task_description && errors.task_description && (
                <Text style={styles.errorText}>{errors.task_description}</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Member</Text>
              <View style={styles.inline}>
                <View style={styles.assigned}>
                  <Ionicons name="person-circle" size={24} color="black" />
                  <Text style={styles.assignedText}>{taskMember}</Text>
                </View>
                <TouchableOpacity onPress={() => setTaskMember('New Member')}>
                  <Ionicons name="add" size={24} color="black" />
                </TouchableOpacity>
              </View>
              {touched.task_member && errors.task_member && (
                <Text style={styles.errorText}>{errors.task_member}</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Deadline</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleAddMember(setFieldValue)}>
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.assignedText}>{taskMember}</Text>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F8F8F8",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    height: 80,
    fontSize: 16,
  },
  textCount: {
    textAlign: "right",
    fontSize: 12,
    color: "#aaa",
    marginTop: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    flex: 1,
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  assigned: {
    flexDirection: "row",
    alignItems: "center",
  },
  assignedText: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#7f00ff",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});
