import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Touchable,
} from "react-native";

export const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const results = [];
  return (
    <View className="w-screen p-10 ">
      <View className="pt-6">
        <Text className="font-bold text-xl">
          explore local foods from all over the world !
        </Text>
        <View className="p-2 rounded-xl border-2 border-solid h-11 mt-10">
          <View className="absolute left-3 top-3">
            <Image
              source={require("@/assets/Search.png")}
              className="h-4 w-4"
            />
          </View>
          <TextInput
            className="w-96 pl-8"
            placeholder="Type here to translate!"
            onChangeText={(searchInput) => setSearchInput(searchInput)}
            //onSubmitEditing={search}
          />
        </View>
      </View>
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
        <View className="pt-2  flex-row items-center  justify-between">
          <Text className="font-bold text-xl">How to make Sushi</Text>
          <TouchableOpacity className="flex-row items-center">
            <Image
              className="w-6"
              resizeMode="contain"
              source={require("@/assets/Union.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View className="pt-8 flex-row items-center justify-between">
          <Text className="font-bold text-xl">Popular Categories 🔥</Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-app-red font-bold">See All</Text>
            <Image
              className="w-6 h-3 ml-2"
              source={require("@/assets/ArrowL.png")}
            />
          </TouchableOpacity>
        </View>
        <View className="flex items-center pt-8">
          <TouchableOpacity>
            <Image
              className="h-48 flex"
              resizeMode="contain"
              source={require("@/assets/Video.png")}
            />
          </TouchableOpacity>
        </View>
        <View className="pt-2   flex-row items-center  justify-between">
          <Text className="font-bold text-xl">How to make Sushi</Text>
          <TouchableOpacity className="flex-row items-center">
            <Image
              className="w-6"
              resizeMode="contain"
              source={require("@/assets/Union.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;
