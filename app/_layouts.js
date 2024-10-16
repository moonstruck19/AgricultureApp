// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomePage from './(tabs)';

import { Stack } from "expo-router"


// const Stack = createNativeStackNavigator();

// export default function RootLayout() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName='Home'>
//                 <Stack.Screen name = "Home" component={HomePage}/>
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen name = "home" options={{
                headerShown: false,
            }}/>
        </Stack>
    )
}
export default RootLayout