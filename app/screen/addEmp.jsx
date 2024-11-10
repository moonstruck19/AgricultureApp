import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addEmpStyles } from '../style/addEmpStyle'

const validationaddEmpStyles = Yup.object().shape({
  emp_name: Yup.string().max(100, 'Name is too long').required('Name is required'),
  emp_age: Yup.string().required('Age is required').max(2, 'Age should be realistic'),
  emp_phone: Yup.string()
  .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
  .required('Phone number is required'),
  emp_address: Yup.string().required('Address is required').max(100, 'Address is too long'),
  emp_salary: Yup.number().required('Salary is required').min(1000, 'Salary too low').max(5000, 'Salary too high'),
});

const addEmp = () => {
  const [empDetails, setEmpDetails] = useState("");
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP;

  const handleAddaddEmpStyles = async (values) => {
    try {
      const response = await fetch(`http://${localip}:5001/addEmp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emp_name: values.emp_name,
          emp_age: values.emp_age,
          emp_phone: values.emp_phone,
          emp_address: values.emp_address,
          emp_salary: values.emp_salary,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("addEmpStyles added successfully!");
      } else {
        alert(result.message || "Error adding addEmpStyles.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <View style={addEmpStyles.container}>
      <Formik
        initialValues={{ emp_name: "", emp_age: "", emp_phone: "", emp_address: "", emp_salary: "" }}
        onSubmit={(values) => handleAddaddEmpStyles(values)}
        validationSchema={validationaddEmpStyles}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={addEmpStyles.section}>
              <Text style={addEmpStyles.label}>Name</Text>
              <TextInput
                style={addEmpStyles.input}
                onChangeText={handleChange('emp_name')}
                onBlur={handleBlur('emp_name')}
                value={values.emp_name}
              />
              {touched.emp_name && errors.emp_name && (
                <Text style={addEmpStyles.errorText}>{errors.emp_name}</Text>
              )}
            </View>

            <View style={addEmpStyles.section}>
              <Text style={addEmpStyles.label}>Age</Text>
              <TextInput
                style={addEmpStyles.input}
                keyboardType="numeric"
                onChangeText={handleChange('emp_age')}
                onBlur={handleBlur('emp_age')}
                value={values.emp_age}
              />
              {touched.emp_age && errors.emp_age && (
                <Text style={addEmpStyles.errorText}>{errors.emp_age}</Text>
              )}
            </View>

            <View style={addEmpStyles.section}>
              <Text style={addEmpStyles.label}>Phone</Text>
              <TextInput
                style={addEmpStyles.input}
                keyboardType="phone-pad"
                onChangeText={handleChange('emp_phone')}
                onBlur={handleBlur('emp_phone')}
                value={values.emp_phone}
              />
              {touched.emp_phone && errors.emp_phone && (
                <Text style={addEmpStyles.errorText}>{errors.emp_phone}</Text>
              )}
            </View>

            <View style={addEmpStyles.section}>
              <Text style={addEmpStyles.label}>Address</Text>
              <TextInput
                style={addEmpStyles.input}
                onChangeText={handleChange('emp_address')}
                onBlur={handleBlur('emp_address')}
                value={values.emp_address}
              />
              {touched.emp_address && errors.emp_address && (
                <Text style={addEmpStyles.errorText}>{errors.emp_address}</Text>
              )}
            </View>

            <View style={addEmpStyles.section}>
              <Text style={addEmpStyles.label}>Salary</Text>
              <TextInput
                style={addEmpStyles.input}
                keyboardType="numeric"
                onChangeText={handleChange('emp_salary')}
                onBlur={handleBlur('emp_salary')}
                value={values.emp_salary}
              />
              {touched.emp_salary && errors.emp_salary && (
                <Text style={addEmpStyles.errorText}>{errors.emp_salary}</Text>
              )}
            </View>

            <TouchableOpacity onPress={handleSubmit} style={addEmpStyles.button}>
              <Text style={addEmpStyles.buttonText}>CONFIRM</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default addEmp;
