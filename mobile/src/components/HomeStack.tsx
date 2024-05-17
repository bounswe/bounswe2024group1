import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/Home/Home";
const Stack = createNativeStackNavigator()
export default function HomeStack() {
   
    return (
      <Stack.Navigator initialRouteName="HomeScreen">
         <Stack.Screen name="HomeScreen" component={Home} />
       
      </Stack.Navigator>
    )
}