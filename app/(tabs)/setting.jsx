import React, { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native"

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [email, setEmail] = useState("")
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
      })

      const data = await response.json()

      if (data.status === "ok") {
        Alert.alert("Success", data.message)
      } else {
        Alert.alert("Error", data.message)
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Something went wrong!")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Old Password"
        value={oldPassword}
        secureTextEntry
        onChangeText={setOldPassword}
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        secureTextEntry
        onChangeText={setNewPassword}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 30,
    textAlign: "center",
    color: "#1C1C1E",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#1C1C1E",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    backgroundColor: "#0a593c",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
})
