import React from 'react';
import { StyleSheet, Text,View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const localip = process.env.EXPO_PUBLIC_LOCAL_IP;

// Validation schema
const VerifyPassSchema = Yup.object().shape({
  verificationCode: Yup.string()
    .length(4, 'OTP must be exactly 4 digits')
    .required('OTP is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const VerifyPass = () => {
 const handleVerify = async (values) => {
    console.log('Submitting values:', values); // Check form data
    try {
      const response = await fetch(`http://${localip}:5001/verifyPass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resettoken: values.verificationCode,
          new_password: values.newPassword,
        }),
      });
  
      const data = await response.json();
      console.log("Response Data:", data);
  
      if (response.ok) {
        Alert.alert('Success', 'Password has been reset successfully!');
      } else {
        console.error('Error response:', data);
        Alert.alert('Error', data.message || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Error in handleVerify:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  }; 
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Account</Text>
      <Formik
        initialValues={{ verificationCode: '', newPassword: '', confirmPassword: '' }}
        validationSchema={VerifyPassSchema}
        onSubmit={handleVerify}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            {/* OTP Field */}
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              onChangeText={handleChange('verificationCode')}
              onBlur={handleBlur('verificationCode')}
              value={values.verificationCode}
              keyboardType="number-pad"
              maxLength={4}
            />
            {errors.verificationCode && touched.verificationCode && (
              <Text style={styles.errorText}>{errors.verificationCode}</Text>
            )}

            {/* New Password Field */}
            <TextInput
              style={styles.input}
              placeholder="New Password"
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              value={values.newPassword}
              secureTextEntry
            />
            {errors.newPassword && touched.newPassword && (
              <Text style={styles.errorText}>{errors.newPassword}</Text>
            )}

            {/* Confirm Password Field */}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default VerifyPass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#d1d1d1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '400',
    color: '#333',
  },
  errorText: {
    color: '#FF3B30', 
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#0A593C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
