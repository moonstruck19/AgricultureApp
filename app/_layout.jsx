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
                    headerRight: () => 
                        (<Button 
                            title="Done"
                            color="#007AFF"
                        />),
                    headerBackTitleStyle: {
                        fontSize: 16
                    }
                }}
            />
        </Stack>
    );
}

export default RootLayout;
