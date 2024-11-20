import { Stack } from "expo-router";
import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="auth/signin" 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="auth/signup" 
                options={{
                    headerShown: false,
                }}
            />            
            <Stack.Screen 
                name="(tabs)" 
                options={{
                    headerShown: false,
                }}
            />            
            <Stack.Screen 
                name="screen/addTask" 
                options={{
                    headerShown: true,
                    title: 'New Task',
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: {
                        fontSize: 16
                    }
                }}
            />
            <Stack.Screen 
                name="auth/forgotPass" 
                options={{
                    headerShown: true,
                    title: 'Forgot Password',
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: {
                        fontSize: 16
                    }
                }}
            />
            <Stack.Screen 
                name="auth/verifyPass" 
                options={{
                    headerShown: true,
                    title: 'Reset Password',
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: {
                        fontSize: 16
                    }
                }}
            />
            <Stack.Screen 
                name="screen/addCrop" 
                options={{
                    headerShown: true,
                    title: 'New Crop',
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: {
                        fontSize: 16
                    }
                }}
            />            
            <Stack.Screen 
                name="screen/addAnimal" 
                options={{
                    headerShown: true,
                    title: 'New Animal',
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: {
                        fontSize: 16
                    }
                }}
            />
            <Stack.Screen 
                name="screen/addEmp" 
                options={{
                    headerShown: true,
                    title: 'New Employee',
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: {
                        fontSize: 16
                    }
                }}
            />
            <Stack.Screen 
                name="screen/addRevenue" 
                options={{
                    headerShown: true,
                    title: 'New Revenue',
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: {
                        fontSize: 16
                    }
                }}
            />
            <Stack.Screen 
                name="screen/addExpense" 
                options={{
                    headerShown: true,
                    title: 'New Expense',
                    headerBackTitle: 'Back',
                    headerBackTitleStyle: {
                        fontSize: 16
                    }
                }}
            />
        </Stack>
    );
}

export default RootLayout;
