import { StyleSheet } from "react-native";

export const addEmpStyles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14, 
        fontWeight: "500",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingVertical: 18, 
        paddingHorizontal: 15,
        fontSize: 16,
        height: 55,
        borderWidth: 1,
        borderColor: "#E5E5EA",
    },
    button: {
        width: "100%",
        paddingVertical: 18, // Increased padding for a larger button
        borderRadius: 10,
        backgroundColor: "#0a593c",
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