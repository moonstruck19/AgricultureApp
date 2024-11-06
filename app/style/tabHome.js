import { StyleSheet } from "react-native";

export const tabHome = StyleSheet.create({
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