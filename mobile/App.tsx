import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFonts } from "expo-font";
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
//import Home from './src/screens/Home/Home';
export default function App() {
  
  return (
  
   <View className=" bg-white">
      <LoginScreen/>
    </View>
  );
}

