import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const AddTask = () => {
  const [taskDescription, settaskDescription] = useState("Mobile App Interface Optimization");
  const [taskName, settaskName] = useState("App Enhancements");
  const [taskMember, settaskMember] = useState("Guzman Nura");
  const [deadline, setDeadline] = useState("October 15, 2023");

  // onDateChange(date) {
  //   this.setState({
  //     selectedStartDate: date,
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Task Name</Text>
        <View style={styles.inline}>
          <TextInput value={taskName} style={styles.input} />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Task Description</Text>
        <TextInput
          value={taskDescription}
          onChangeText={settaskDescription}
          style={styles.textArea}
          multiline={true}
          maxLength={45}
        />
        <Text style={styles.textCount}>{taskDescription.length}/45</Text>
      </View>

      {/* Assigned to */}
      <View style={styles.section}>
        <Text style={styles.label}>Member</Text>
        <View style={styles.inline}>
          <View style={styles.assigned}>
            <Ionicons name="person-circle" size={24} color="black" />
            <Text style={styles.assignedText}>{taskMember}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Deadline */}
      <View style={styles.section}>
        <Text style={styles.label}>Deadline</Text>
        {/* <CalendarPicker onDateChange={this.onDateChange} /> */}
      </View>

      {/* Create button */}
      {/* <TouchableOpacity style={styles.buttonContainer}>
        <LinearGradient
          colors={["#7f00ff", "#e100ff"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Create new tasks</Text>
        </LinearGradient>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#F8F8F8",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  draftText: {
    color: "#7f00ff",
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 10,
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
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    flex: 1,
  },
  inline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addNew: {
    color: "#7f00ff",
    fontSize: 16,
    marginLeft: 10,
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
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default AddTask;
