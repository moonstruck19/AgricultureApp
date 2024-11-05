import { StyleSheet } from "react-native";

export const employee = StyleSheet.create({
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
    input: {
      backgroundColor: "#fff",
      borderRadius: 15,
      padding: 15,
      fontSize: 16,
      flex: 1,
      borderWidth: 1,
      borderColor: "#E5E5EA",
    },
    button: {
      width: "100%",
      paddingVertical: 15,
      borderRadius: 10,
      backgroundColor: "#34C759",
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