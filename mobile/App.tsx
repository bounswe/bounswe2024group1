import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFonts } from "expo-font";
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import Home from './src/screens/Home/Home';

import Results from './src/screens/Results/Results';
import { NavigationContainer } from '@react-navigation/native';
import Title from './src/components/Title';
import 'react-native-gesture-handler';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() { 
  
  return (
  
   <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName='LoginScreen'>
      <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      <Stack.Screen name="HomeScreen" component={Home}/>
      <Stack.Screen name="Results" component={Results}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

