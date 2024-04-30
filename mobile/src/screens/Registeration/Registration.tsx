import { useNavigation } from "@react-navigation/native";
import React, { Component, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { z } from "zod";
import { navigation } from "react-native";
import useAuthStore, { signup } from "@/src/services/auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  // State variable to hold the password
  const [password, setPassword] = useState("");
  const [firstName, setName] = useState("")
  const [lastName, setLastname] = useState("")
  const [country, setCountry] = useState("")
  const [username, setUsername] = useState("")
  // State variable to track password visibility
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errors, setErrors] = useState({ email: [], password: [] });
  // Function to toggle the password visibility state
  const handleSignup = async () => {
    try {
      await signup({
        username,
        email,
        password,
        firstName,
        lastName,
        country,
      });
     // Alert.alert("Success", "You have been registered successfully!");
      navigation.navigate('Login'); // Assuming you have a login screen to navigate to
    } catch (error) {
      //Alert.alert("Registration Failed", error.message);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

 

  return (
    <View className="w-screen h-screen bg-white flex-col justify-center px-6 ">
      <View>
        <View className="pl-10">
          <Text className="text-sm">Welcome back!👋</Text>
          <Text className="fond-bold text-xl mt-1">Login to your account</Text>
        </View>
        <View className="px-4">
        <View className="mt-2">
            <Text>Name</Text>
            <View className="p-2 rounded border-2 border-solid h-11 mt-2">
              <TextInput
                textContentType="name"
                autoCapitalize={"none"}
                className="w-96"
                placeholder="Type here to translate!"
                onChangeText={(firstNameame) => setName(firstName)}
              />
            </View>
          </View>
          <View className="mt-2">
            <Text>Surname</Text>
            <View className="p-2 rounded border-2 border-solid h-11 mt-2">
              <TextInput
                textContentType="name"
                autoCapitalize={"none"}
                className="w-96"
                placeholder="Type here to translate!"
                onChangeText={(lastName) => setLastname(lastName)}
              />
            </View>
          </View>
            <View className="mt-2">
            <Text>Surname</Text>
            <View className="p-2 rounded border-2 border-solid h-11 mt-2">
              <TextInput
                textContentType="name"
                autoCapitalize={"none"}
                className="w-96"
                placeholder="Type here to translate!"
                onChangeText={(surName) => setLastname(surName)}
              />
            </View>
          </View>
          <View className="mt-2">
            <Text>userName</Text>
            <View className="p-2 rounded border-2 border-solid h-11 mt-2">
              <TextInput
                textContentType="name"
                autoCapitalize={"none"}
                className="w-96"
                placeholder="Type here to translate!"
                onChangeText={(username) => setUsername(username)}
              />
            </View>
          </View>
          <View className="mt-4">
            <Text>Email</Text>
            <View className="p-2 rounded border-2 border-solid h-11 mt-2">
              <TextInput
                textContentType="emailAddress"
                autoCapitalize={"none"}
                className="w-96"
                placeholder="Type here to translate!"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
          </View>
          <View className="mt-4">
            <Text>Password</Text>
            <View className="p-2 rounded border-2 border-solid h-11 mt-2">
              <TextInput
                className="w-96"
                secureTextEntry={!showPassword}
                placeholder="Type here to translate!"
                onChangeText={(password) => setPassword(password)}
              />
              <TouchableOpacity
                onPress={toggleShowPassword}
                className="absolute right-2 top-1"
              >
                <Image
                  source={require("@/assets/Icon.png")}
                  className="h-8 w-8"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="mt-4">
            <Text>Surname</Text>
            <View className="p-2 rounded border-2 border-solid h-11 mt-2">
              <TextInput
                textContentType="name"
                autoCapitalize={"none"}
                className="w-96"
                placeholder="Type here to translate!"
                onChangeText={(country) => setCountry(country)}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleSignup}
            className="bg-app-red rounded h-11 justify-center items-center mt-5"
            accessibilityLabel="Learn more about this purple button"
          >
            <Text className="text-base text-white">Sign Up</Text>
          </TouchableOpacity>

       
          
        
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
