import { Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React, { Component,useState, } from 'react'

export const LoginScreen = ()=> {
    const [email, setEmail] = useState('');
    // State variable to hold the password 
    const [password, setPassword] = useState(''); 
  
    // State variable to track password visibility 
     const [showPassword, setShowPassword] = useState(false); 

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => { 
     setShowPassword(!showPassword); 
 }; 
    return (
      <View className='w-screen h-screen flex-col justify-center px-6 '>
        <View>
        <View className="pl-10">
            <Text className="text-sm">Welcome back!👋</Text>
            <Text className="fond-bold text-xl mt-1">Login to your account</Text>
        </View>
        <View className='px-4'>
            <View className="mt-8">
                <Text>
                    Email
                </Text>
                <View className="p-2 rounded border-2 border-solid h-11 mt-2">
                    <TextInput
                        className="w-96"
                        placeholder="Type here to translate!"
                        onChangeText={email => setEmail(email)}/>
     
                </View>
            </View>
            <View className="mt-4">
                <Text>
                    Password
                </Text>
                <View className="p-2 rounded border-2 border-solid h-11 mt-2">
                    <TextInput
                        className="w-96"
                        secureTextEntry={!showPassword} 
                        placeholder="Type here to translate!"
                        onChangeText={password => setPassword(password)}/>
                    <TouchableOpacity 
                        onPress={toggleShowPassword} 
                        className='absolute right-2 top-1'>
                        <Image source={require('@/assets/Icon.png')} className="h-8 w-8"/>
                    </TouchableOpacity>
                </View>
            </View>
            
            <TouchableOpacity
                className="bg-app-red rounded h-11 justify-center items-center mt-5"
                accessibilityLabel="Learn more about this purple button">
                <Text className="text-base text-white">Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className='mt-8 pl-10 '>
                <Text className='underline color-app-red'>Forgot Password?</Text>
            </TouchableOpacity>

            <View className='flex border-b-solid border-b-2 border-gray-500 items-center'>
                <View className='px-8 bg-white'>
                    <Text className='text-base top-3 leading-2 px-1 bg-white'>Or</Text>
                </View>
            </View>
        </View>
        </View>
    </View>
    )
  
}


export default LoginScreen