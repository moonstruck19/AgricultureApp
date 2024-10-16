// import { Tabs } from "expo-router";
const { Tabs } = require("expo-router")
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Icon from "react-native-vector-icons/FontAwesome";

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen 
                name="index" 
                options={{headerShown: false, title: "Home",
                tabBarIcon:({color}) => {<FontAwesome name="home" size={24} color="black" />}
                }}/>
            <Tabs.Screen 
                name="profile" 
                options={{headerShown: false, title: "Profile",
                tabBarIcon:({color}) => {<FontAwesome name="user" size={24} color="black" />}
                }}/>
             <Tabs.Screen 
                name="setting" 
                options={{headerShown: false, title: "Setting",
                tabBarIcon:({color}) => {<FontAwesome name="code" size={24} color="black" />}
                }}/>
        </Tabs>
    )
}