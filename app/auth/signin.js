import { StyleSheet, Text, View, TextInput, Pressable, Touchable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email().label("Email"),
  password: Yup.string().required('Password is required').min(4).label("Password"),
})

const Signin = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Formik
        initialValues={{email: "hung@gmail.com", password: "1234"}}
        onSubmit={(values) => {
            console.log(values)
            router.push("/(tabs)")
          }
        }
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
              placeholderTextColor="#C7C7CC" 
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
              placeholderTextColor="#C7C7CC"
              onChangeText={handleChange("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <Text style={styles.signupText}>
        Don’t have an account? 
        <Pressable>
            <Link href="./signup" style={styles.signupLink}>
                Sign Up
            </Link>
        </Pressable>
      </Text>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',  // Soft white background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 50,
    color: '#1C1C1E',  // Dark gray for the title
    fontFamily: 'System', // Apple default font
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#D1D1D6',  // Soft gray border
    borderRadius: 12,  // More rounded edges
    backgroundColor: '#F2F2F7',  // Light gray background
    marginBottom: 20,
    fontSize: 16,
    color: '#1C1C1E',  // Darker gray text
    fontFamily: 'System',
  },
  button: {
    backgroundColor: '#007AFF',  // Apple's standard blue for buttons
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 12,  // Rounded button
    marginTop: 10,
    shadowColor: '#000', // Light shadow to give a subtle 3D effect
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
  signupText: {
    marginTop: 20,
    fontSize: 16,
    color: '#1C1C1E',
  },
  signupLink: {
    color: '#007AFF',  // Same blue for links
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',  // Apple's red for errors
    fontSize: 14,
    marginBottom: 10,
  },
});
