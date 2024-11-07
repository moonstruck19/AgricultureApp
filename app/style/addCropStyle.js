import { StyleSheet } from "react-native";

export const addCropStyles = StyleSheet.create({
    container: {
      paddingTop: 10,
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: "#fff8f0", // Soft off-white for a clean look
    },
    section: {
      marginBottom: 25,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: "#3A3A3C", // Darker, muted grey for text
      marginBottom: 6,
    },
    textArea: {
      backgroundColor: "#fff8f0",
      borderRadius: 12,
      padding: 15,
      height: 90,
      fontSize: 16,
      color: "#3A3A3C",
      borderWidth: 1,
      borderColor: "#E5E5EA", // Light border to mimic Apple input style
    },
    textCount: {
      textAlign: "right",
      fontSize: 12,
      color: "#8E8E93", // Muted grey for secondary text
      marginTop: 5,
    },
    input: {
      backgroundColor: "#fff8f0",
      borderRadius: 12,
      padding: 15,
      fontSize: 16,
      color: "#3A3A3C",
      borderWidth: 1,
      borderColor: "#E5E5EA",
      flex: 1,
    },
    inline: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      width: "100%",
      paddingVertical: 14,
      borderRadius: 12,
      backgroundColor: "#0a593c",
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "600",
      letterSpacing: 0.5,
    },
    errorText: {
      color: "#FF3B30", // Apple’s error red
      fontSize: 13,
      marginTop: 5,
    },
    dateButton: {
      backgroundColor: "#fff8f0",
      borderRadius: 12,
      padding: 15,
      borderWidth: 1,
      borderColor: "#E5E5EA",
      justifyContent: "center",
    },
  });