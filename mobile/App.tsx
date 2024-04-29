import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useFonts } from "expo-font";
import LoginScreen from './src/screens/LoginScreen/LoginScreen';
import Home from './src/screens/Home/Home';
import Results from './src/screens/Results/Results';
import Title from './src/components/Title';
export default function App() {
  
  return (
  
   <View className=" bg-white">
      
      <Results/>
    </View>
  );
}

