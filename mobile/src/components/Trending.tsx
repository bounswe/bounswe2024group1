import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Trending = () => {
  return (
    <View>
       <View className="pt-8 flex-row items-center justify-between">
        <Text className="font-bold text-xl">Trending now 🔥</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-app-red font-bold">See All</Text>
          <Image
            className="w-6 h-3 ml-2"
            source={require("@/assets/ArrowL.png")}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View className="pt-8 flex items-center">
          <TouchableOpacity className="px-8">
            <Image
              className="h-48"
              resizeMode="contain"
              source={require("@/assets/Video.png")}
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center  justify-between">
          <Text className="font-bold text-l">How to make Sushi</Text>
          <TouchableOpacity className="flex-row items-center">
            <Image
              className="w-6"
              resizeMode="contain"
              source={require("@/assets/dot.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Trending