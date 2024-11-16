import React, { useEffect, useState, useRef } from "react"
import { Text, View, TouchableOpacity, FlatList, 
  ActivityIndicator, RefreshControl, Modal, Button, Animated, TextInput } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { PanGestureHandler, State } from "react-native-gesture-handler"
import { tabHome } from "../style/tabHome"
import { Alert } from "react-native"

const TabHome = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP

  const translateX = useRef({})
  const buttonOpacity = useRef({})

  const fetchTask = () => {
    setLoading(true)
    fetch(`http://${localip}:5001/fetchTask`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((tasks) => {
        setTasks(tasks.data)
        tasks.data.forEach((task) => {
          translateX.current[task._id] = new Animated.Value(0)
          buttonOpacity.current[task._id] = new Animated.Value(0)
        })
      })
      .catch((error) => {
        console.error("Error fetching task data: ", error)
        alert("Failed to load tasks.")
      })
      .finally(() => {
        setLoading(false)
        setRefreshing(false)
      })
  }

  useEffect(() => {
    fetchTask()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchTask()
  }

  const handleStatusChange = async (status) => {
    if (!selectedTask) return

    const updatedStatus = status === "yes" ? "Completed" : "In progress"
    try {
      const response = await fetch(`http://${localip}:5001/updateTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: selectedTask._id, task_status: updatedStatus }),
      })

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === selectedTask._id ? { ...task, task_status: updatedStatus } : task
          )
        )
        setSelectedTask({ ...selectedTask, task_status: updatedStatus })
        setShowModal(false)
      } else {
        console.error("Error updating task status in database")
      }
    } catch (error) {
      console.error("Error updating task status: ", error)
    }
  }

  const handleEdit = (task) => {
    console.log("Edit Task:", task)
    setTaskName(task.task_name)
    setTaskDescription(task.task_description)
    setSelectedTask(task)
    setShowEditModal(true)
  }

  const handleSaveEdit = async () => {
    const updatedTask = {
      ...selectedTask,
      task_name: taskName,
      task_description: taskDescription,
    }
  
    try {
      const response = await fetch(`http://${localip}:5001/editTask`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId: selectedTask._id, updatedData: updatedTask }),  // Ensure you use `updatedData` here as per your API
      })
  
      const responseData = await response.json()
      console.log('Response Status:', response.status)
      console.log('Response Data:', responseData)
  
      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === selectedTask._id ? updatedTask : task
          )
        )
        setShowEditModal(false)
      } else {
        console.error("Error updating task in database:", responseData)
        alert(`Error: ${responseData.message || 'Unknown error occurred'}`)
      }
    } catch (error) {
      console.error("Error updating task:", error)
      alert(`Error: ${error.message}`)
    }
  }
  
  const handleDelete = async (taskId) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this animal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await fetch(`http://${localip}:5001/deleteTask`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ taskId: taskId }),
            })
      
            setTasks(tasks.filter((task) => task._id !== taskId))
          } catch (error) {
            console.error("Error deleting task:", error)
          }
        },
      },
    ])
  }

  const renderTaskItem = ({ item }) => {
    const onGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: translateX.current[item._id] } }],
      { useNativeDriver: true }
    )

    const onHandlerStateChange = ({ nativeEvent }) => {
      if (nativeEvent.state === State.END) {
        const shouldShowButtons = nativeEvent.translationX < -50

        // Animate the swipe and button opacity
        Animated.parallel([
          Animated.timing(translateX.current[item._id], {
            toValue: shouldShowButtons ? -100 : 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(buttonOpacity.current[item._id], {
            toValue: shouldShowButtons ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start()
      }
    }

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedTask(item)
          setShowModal(true)
        }}
      >
        <View style={tabHome.container}>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <Animated.View
              style={[tabHome.taskCard, { transform: [{ translateX: translateX.current[item._id] }] }]}
            >
              <View style={tabHome.taskHeader}>
                <Text style={tabHome.taskTitle}>{item.task_name}</Text>
                <Text
                  style={[
                    tabHome.taskStatus,
                    item.task_status === "Completed" ? tabHome.newTask : tabHome.ongoingTask,
                  ]}
                >
                  {item.task_status}
                </Text>
              </View>
              <Text style={tabHome.taskDescription}>{item.task_description}</Text>
              <View style={tabHome.taskFooter}>
                <Text style={tabHome.dueDate}>
                  {new Date(item.task_date_start).toLocaleDateString()}
                </Text>
                <Text style={tabHome.dueDate}>
                  {new Date(item.task_date_end).toLocaleDateString()}
                </Text>
                <Text style={tabHome.dueDate}>{item.task_member}</Text>
              </View>
            </Animated.View>
          </PanGestureHandler>

          <Animated.View style={[tabHome.swipeOptions, { opacity: buttonOpacity.current[item._id] }]}>
            <TouchableOpacity
              onPress={() => handleEdit(item)}
              style={[tabHome.swipeButton, tabHome.editButton]}
            >
              <Text style={tabHome.swipeText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDelete(item._id)}
              style={[tabHome.swipeButton, tabHome.deleteButton]}
            >
              <Text style={tabHome.swipeText}>Delete</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={tabHome.container}>
      <View style={tabHome.header}>
        <View>
          <Text style={tabHome.greeting}>Halo!</Text>
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
            {tasks.filter((task) => task.task_status === "Completed").length}
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
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item._id}
          renderItem={renderTaskItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}

      {/* Edit Modal */}
      <Modal visible={showEditModal} animationType="fade" onRequestClose={() => setShowEditModal(false)}>
        <View style={tabHome.modalContainer}>
          <Text style={tabHome.modalTitle}>Edit Task</Text>
          <Text style={tabHome.modalLabel}>Task Name</Text>
          <TextInput
            style={tabHome.input}
            value={taskName}
            onChangeText={setTaskName}
          />
          <Text style={tabHome.modalLabel}>Task Description</Text>
          <TextInput
            style={tabHome.input}
            value={taskDescription}
            onChangeText={setTaskDescription}
          />
          <Button title="Save" onPress={handleSaveEdit} />
          <Button title="Cancel" onPress={() => setShowEditModal(false)} />
        </View>
      </Modal>

      {/* Modal for Status Change */}
      <Modal visible={showModal} animationType="fade" onRequestClose={() => setShowModal(false)}>
        <View style={tabHome.modalContainer}>
          <Text style={tabHome.modalTitle}>Change Task Status</Text>
          <View style={tabHome.modalButtons}>
            <Button style={tabHome.modalButtons} title="Completed" onPress={() => handleStatusChange("yes")} />
            <Button style={tabHome.modalButtons} title="In Progress" onPress={() => handleStatusChange("no")} />
          </View>
          <Button title="Cancel" onPress={() => setShowEditModal(false)} />
        </View>
      </Modal>
    </View>
  )
}

export default TabHome
