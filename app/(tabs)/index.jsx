import React from "react";
import { Text, View, TouchableOpacity, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { tabHome } from '../style/tabHome'


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
    <View style={tabHome.container}>
      {/* Header */}
      <View style={tabHome.header}>
        <View>
          <Text style={tabHome.greeting}>Good morning!</Text>
          <Text style={tabHome.date}>19 Sept, 2024</Text>
        </View>
        <Link href="/screen/addTask">
          <Ionicons name="add" size={24} color="black" />
        </Link>
      </View>

      {/* Summary Section */}
      <View style={tabHome.summaryContainer}>
        <View style={tabHome.summaryBox}>
          <Text style={tabHome.summaryText}>Assigned tasks</Text>
          <Text style={tabHome.summaryNumber}>21</Text>
        </View>
        <View style={tabHome.summaryBox}>
          <Text style={tabHome.summaryText}>Completed tasks</Text>
          <Text style={tabHome.summaryNumber}>31</Text>
        </View>
      </View>

      {/* Task Filter Tabs */}
      <View style={tabHome.tabsContainer}>
        <TouchableOpacity style={tabHome.tabButtonActive}>
          <Text style={tabHome.tabTextActive}>All tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tabHome.tabButton}>
          <Text style={tabHome.tabText}>In progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tabHome.tabButton}>
          <Text style={tabHome.tabText}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tabHome.taskCard}>
            <View style={tabHome.taskHeader}>
              <Text style={tabHome.taskTitle}>{item.title}</Text>
              <Text style={[tabHome.taskStatus, item.status === "New task" ? tabHome.newTask : tabHome.ongoingTask]}>
                {item.status}
              </Text>
            </View>
            <Text style={tabHome.taskDescription}>{item.description}</Text>
            <View style={tabHome.taskFooter}>
              <Text style={tabHome.taskCategory}>{item.category}</Text>
              <Text style={tabHome.dueDate}>{item.dueDate}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TabHome;
