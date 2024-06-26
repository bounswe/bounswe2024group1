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
  navigation,
} from "react-native";
import { z } from "zod";

import useAuthStore, { signin } from "@/src/services/auth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  // State variable to hold the password
  const [password, setPassword] = useState("");

  // State variable to track password visibility
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errors, setErrors] = useState({ email: [], password: [] });
  // Function to toggle the password visibility state

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      console.log({ email, password });
      await signin({ usernameOrEmail: email, password });
      console.log("success");
      setIsLoggingIn(false);

      navigation.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      });
    } catch (error) {
      console.log("Login failed", error);
      //Alert.alert('Login Error', error.message || 'Failed to login. Please check your credentials.');
      setIsLoggingIn(false);
    }
  };

  return (
    <View className="w-screen h-screen bg-white flex-col justify-center px-6 ">
      <View>
        <View className="pl-10">
          <Text className="text-sm">Welcome back!👋</Text>
          <Text className="fond-bold text-xl mt-1">Login to your account</Text>
        </View>
        <View className="px-4">
          <View className="mt-8">
            <Text>Email</Text>
            <View className="p-2 rounded border-2 border-solid h-11 mt-2">
              <TextInput
                textContentType="emailAddress"
                autoCapitalize="none"
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

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-app-red rounded h-11 justify-center items-center mt-5"
            accessibilityLabel="Learn more about this purple button"
          >
            <Text className="text-base text-white">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-8 pl-10 ">
            <Text className="underline color-app-red">Forgot Password?</Text>
          </TouchableOpacity>

          <View className="flex border-b-solid border-b-2 border-gray-500 items-center">
            <View className="px-8 bg-white">
              <Text className="text-base top-3 leading-2 px-1 bg-white">
                Or
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Registration");
            }}
            className="bg-app-red rounded h-11 justify-center items-center mt-5"
            accessibilityLabel="Learn more about this purple button"
          >
            <Text className="text-base text-white">Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "HomeScreen" }],
              });
            }}
            className="bg-app-red rounded h-11 justify-center items-center mt-5"
            accessibilityLabel="Learn more about this purple button"
          >
            <Text className="text-base text-white">
              Continue without Loging in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
