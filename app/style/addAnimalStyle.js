import { StyleSheet } from "react-native";

export const addAnimalStyle = StyleSheet.create({
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
    dateButton: {
      backgroundColor: "#fff",
      borderRadius: 15,
      padding: 15,
    },
  });