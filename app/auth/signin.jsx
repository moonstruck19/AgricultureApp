import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import Config from "react-native-config"


const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email().label("Email"),
  password: Yup.string().required('Password is required').min(4).label("Password"),
})

const Signin = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const localip = process.env.EXPO_PUBLIC_LOCAL_IP
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Formik
        initialValues={{ email: "test3@gmail.com", password: "111111" }}
        onSubmit={async (values) => {
          try {
            const response = await fetch(`http://${localip}:5001/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_email: values.email,
                user_password: values.password,
              }),
            })

            const data = await response.json()
            if (data.status === "ok") {
              router.push("/(tabs)")
            } else {
              setErrorMessage(data.message || "Login failed. Please try again.")
            }
          } catch (error) {
            setErrorMessage("An error occurred. Please try again later.")
            console.log(error)
          }
        }}
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
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
  )
}

export default Signin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 50,
    color: '#1C1C1E',
    fontFamily: 'System',
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
    borderColor: '#D1D1D6',
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    marginBottom: 20,
    fontSize: 16,
    color: '#1C1C1E',
    fontFamily: 'System',
  },
  button: {
    backgroundColor: '#0a593c',
    paddingVertical: 15,
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
  signupText: {
    marginTop: 20,
    fontSize: 16,
    color: '#1C1C1E',
  },
  signupLink: {
    color: '#0a593c',
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 10,
  },
})
