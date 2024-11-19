import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'expo-router';

const localip = process.env.EXPO_PUBLIC_LOCAL_IP;

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

const ForgotPass = () => {
  const [loading, setLoading] = useState(false);

  // Function to handle the forgot password request
  const handleForgotPassword = async (values) => {
    setLoading(true); // Set loading to true while making the request
  
    try {
      const response = await fetch(`http://${localip}:5001/resetPassword`, {
        method: 'POST', // Changed to POST method
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email }), // Send email in request body
      });
  
      const responseText = await response.text(); // Get the raw response as text
      console.log('Response:', responseText); // Log the response
  
      // Try to parse JSON if the response is a valid JSON
      const data = JSON.parse(responseText);
  
      if (response.ok) {
        Alert.alert('Password Recovery', `Password reset link sent to ${values.email}`);
        // navigation.navigate('../auth/verifyPass');
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an issue sending the email');
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={handleForgotPassword}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading} 
            >
              {loading ? (
                <Text style={styles.buttonText}>Sending...</Text>
              ) : (
                <Text style={styles.buttonText}>Verify</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <TouchableOpacity style={styles.button}>
        <Link href="../auth/verifyPass" style={styles.buttonText}>Move to Reset page</Link>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: 300,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#0A593C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
