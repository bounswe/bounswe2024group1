import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Filter from "@/src/components/filter";
import Trending from "@/src/components/Trending";
import Popular from "@/src/components/Popular";
import Title from "@/src/components/Title";
export const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const results = [];
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <ScrollView className="w-screen p-6 overflow-y-scroll">
      <View className="pt-6">
        <Title/>
        <View
          className={` rounded-xl flex-row border-2 border-solid h-11 mt-10 + ${searchFocused ? "border-app-red" : "border-gray-400"}`}
        >
          <View className="absolute left-3 top-3">
            <Image
              source={require("@/assets/Search.png")}
              className="h-4 w-4"
            />
          </View>
          <TextInput
            onFocus={(searchFocused) => setSearchFocused(true)}
            onBlur={(searchFocused) => setSearchFocused(false)}
            className="w-96 pl-8"
            placeholder="Type here to translate!"
            onChangeText={(searchInput) => setSearchInput(searchInput)}
            //onSubmitEditing={search}
          />
        </View>
      </View>
     <Trending/>
     <Popular/>
    </ScrollView>
  );
};

export default Home;
