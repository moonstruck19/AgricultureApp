import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

const addEmp = () => {
  return (
    <View>
      <Text>addEmp</Text>
    </View>
  )
}

export default addEmp

const styles = StyleSheet.create({})