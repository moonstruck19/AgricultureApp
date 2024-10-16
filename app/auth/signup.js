import { StyleSheet, Text, View, TextInput, Touchable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
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
})

const Register = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
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
            {errors.email && touched.email && (
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
            {errors.password && touched.password && (
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
            {errors.confirmPassword && touched.confirmPassword && (
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
    backgroundColor: '#FFFFFF',  // Clean white background for Apple style
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1C1C1E',  // Darker gray for the title
    marginBottom: 50,
    fontFamily: 'System',  // Apple default font
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
    borderColor: '#D1D1D6',  // Subtle light border
    borderRadius: 12,  // Rounded edges for Apple feel
    backgroundColor: '#F2F2F7',  // Light gray input background
    marginBottom: 20,
    fontSize: 16,
    color: '#1C1C1E',  // Dark gray input text
    fontFamily: 'System',  // Consistent with Apple's system font
  },
  button: {
    backgroundColor: '#007AFF',  // Apple's signature blue color for buttons
    paddingVertical: 14,
    paddingHorizontal: 90,
    borderRadius: 12,  // Rounded corners for a modern look
    marginTop: 10,
    shadowColor: '#000',  // Subtle shadow for depth
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
    color: '#FF3B30',  // Apple's red color for error messages
    fontSize: 14,
    marginBottom: 10,
  },
});
