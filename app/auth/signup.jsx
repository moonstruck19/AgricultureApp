import { StyleSheet, Text, View, TextInput, Touchable } from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email().label("Email"),
  password: Yup.string()
    .required('Password is required')
    .min(4)
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Register = () => {
  const handleRegister = async (values) => {
    try {
      const response = await fetch(`http://192.168.1.5:5001/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: values.email,
          user_password: values.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert(result.message || "An error occurred during registration.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={(values) => handleRegister(values)}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
        }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#A1A1A6"
              onChangeText={handleChange("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#A1A1A6"
              onChangeText={handleChange("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#A1A1A6"
              onChangeText={handleChange("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 50,
    fontFamily: 'System',
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D1D1D6',
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    marginBottom: 20,
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: 'System',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 90,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'System',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 10,
  },
});
