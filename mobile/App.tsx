import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Title from "./src/components/Title";
import Home from "./src/screens/Home/Home";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen";
import Results from "./src/screens/Results/Results";
import BookmarksScreen from "./src/screens/Bookmarks/Bookmarks";
import "react-native-gesture-handler";
import Registration from "@/src/screens/Registeration/Registration";
import TabNav from '@/src/components/TabNav.tsx'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
   
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="LoginScreen"
      >
       <Stack.Screen name="HomeScreen" component={TabNav} />
       {/*Remember to change this back to login screen*/}     
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Registration" component={Registration} />
       { /* <Stack.Screen name="HomeScreen" component={Home} />*/}
        <Stack.Screen name="Results" component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
