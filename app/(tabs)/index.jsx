import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Link } from "expo-router";


const tasks = [
  {
    id: "1",
    title: "Homepage Redesign",
    description: "Redesign the homepage of our website...",
    status: "New task",
    dueDate: "October 15, 2023",
    category: "Website Revamp"
  },
  {
    id: "2",
    title: "Mobile App Interface",
    description: "Optimize the user interface for our mobile app...",
    status: "On going",
    dueDate: "October 15, 2023",
    category: "App Enhancements"
  },
  {
    id: "3",
    title: "E-commerce Checkout",
    description: "Redesign the checkout process for our e-commerce platform...",
    status: "New task",
    dueDate: "December 10, 2023",
    category: "Checkout Optimization"
  },
];

const TabHome = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.date}>19 Sept, 2024</Text>
        </View>
        <Link href="/screen/addTask">
          <Ionicons name="add" size={24} color="black" />
        </Link>
      </View>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>Assigned tasks</Text>
          <Text style={styles.summaryNumber}>21</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryText}>Completed tasks</Text>
          <Text style={styles.summaryNumber}>31</Text>
        </View>
      </View>

      {/* Task Filter Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tabButtonActive}>
          <Text style={styles.tabTextActive}>All tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>In progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={[styles.taskStatus, item.status === "New task" ? styles.newTask : styles.ongoingTask]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <View style={styles.taskFooter}>
              <Text style={styles.taskCategory}>{item.category}</Text>
              <Text style={styles.dueDate}>{item.dueDate}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#777",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  summaryText: {
    fontSize: 14,
    color: "#777",
  },
  summaryNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
  },
  tabButtonActive: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#6a4bff",
    borderRadius: 20,
  },
  tabText: {
    color: "#333",
    fontSize: 14,
  },
  tabTextActive: {
    color: "#fff",
    fontSize: 14,
  },
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  taskStatus: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    textAlign: "center",
  },
  newTask: {
    backgroundColor: "#6a4bff",
    color: "#fff",
  },
  ongoingTask: {
    backgroundColor: "#ffaf3e",
    color: "#fff",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  taskFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskCategory: {
    fontSize: 12,
    color: "#999",
  },
  dueDate: {
    fontSize: 12,
    color: "#999",
  },
});

export default TabHome;
