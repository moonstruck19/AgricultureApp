import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Link } from "expo-router";

const Employee = () => {
  return (
    <View>
      <View>
        <Text>Search Employee</Text>
        <Link href="/screen/addEmp">
          <Ionicons name="add" size={24} color="black" />
        </Link>
      </View>
    </View>
  )
}

export default Employee

const styles = StyleSheet.create({})