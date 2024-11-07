import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl, Modal, Button } from "react-native";
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { tabHome } from "../style/tabHome";

const TabHome = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP;

  const fetchTask = () => {
    setLoading(true);
    fetch(`http://${localip}:5001/fetchTask`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((tasks) => {
        setTasks(tasks.data);
      })
      .catch((error) => {
        console.error("Error fetching task data: ", error);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTask();
  };

  const handleStatusChange = (status) => {
    if (!selectedTask) return;

    fetch(`http://${localip}:5001/updateTask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId: selectedTask._id, status }),
    })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === selectedTask._id ? { ...task, status } : task
          )
        );
        setSelectedTask((prevTask) => ({ ...prevTask, status }));
      })
      .catch((error) => console.error("Error updating task status: ", error));
  };

  return (
    <View style={tabHome.container}>
      <View style={tabHome.header}>
        <View>
          <Text style={tabHome.greeting}>Good morning!</Text>
          <Text style={tabHome.date}>{new Date().toLocaleDateString()}</Text>
        </View>
        <Link href="/screen/addTask">
          <Ionicons name="add" size={24} color="black" />
        </Link>
      </View>

      <View style={tabHome.summaryContainer}>
        <View style={tabHome.summaryBox}>
          <Text style={tabHome.summaryText}>Assigned tasks</Text>
          <Text style={tabHome.summaryNumber}>{tasks.length}</Text>
        </View>
        <View style={tabHome.summaryBox}>
          <Text style={tabHome.summaryText}>Completed tasks</Text>
          <Text style={tabHome.summaryNumber}>
            {tasks.filter((task) => task.status === "Completed").length}
          </Text>
        </View>
      </View>

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

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedTask(item);
                setShowModal(true);
              }}
            >
              <View style={tabHome.taskCard}>
                <View style={tabHome.taskHeader}>
                  <Text style={tabHome.taskTitle}>{item.task_name}</Text>
                  <Text
                    style={[
                      tabHome.taskStatus,
                      item.task_status === "New task" ? tabHome.newTask : tabHome.ongoingTask,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
                <Text style={tabHome.taskDescription}>{item.task_description}</Text>
                <View style={tabHome.taskFooter}>
                  <Text style={tabHome.dueDate}>{item.task_date_start}</Text>
                  <Text style={tabHome.dueDate}>{item.task_date_end}</Text>
                  <Text style={tabHome.dueDate}>{item.task_member}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={tabHome.modalContainer}>
          <View style={tabHome.modalContent}>
            {selectedTask && (
              <>
                <Text style={tabHome.taskTitle}>{selectedTask.task_name}</Text>
                <Text>{selectedTask.task_description}</Text>
                <Text>Start Date: {selectedTask.task_date_start}</Text>
                <Text>End Date: {selectedTask.task_date_end}</Text>
                <Text>Assigned to: {selectedTask.task_member}</Text>

                <Text style={tabHome.dropdownLabel}>Mark as Completed:</Text>
                <Picker
                  selectedValue={selectedTask.status === "Completed" ? "Yes" : "No"}
                  style={tabHome.picker}
                  onValueChange={(value) =>
                    handleStatusChange(value === "Yes" ? "Completed" : "In progress")
                  }
                >
                  <Picker.Item label="No" value="No" />
                  <Picker.Item label="Yes" value="Yes" />
                </Picker>

                <Button title="Close" onPress={() => setShowModal(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TabHome;
