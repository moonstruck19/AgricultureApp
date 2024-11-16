import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP


  const handleChangePassword = async () => {
    try {
      const response = await fetch(`http://${localip}:5001/changePass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_email: email,
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        Alert.alert("Success", data.message);
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Something went wrong!", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        value={oldPassword}
        secureTextEntry
        onChangeText={setOldPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        secureTextEntry
        onChangeText={setNewPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
