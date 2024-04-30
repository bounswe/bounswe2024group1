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
import { searchDishes } from "@/src/services/search";
import DishCard from "@/src/components/Dish";


export const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([{name:'y',country:'y',image:'y'}])
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <ScrollView className="w-screen bg-white p-6 overflow-y-scroll">
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
            onSubmitEditing={()=>{setResults(searchDishes(searchInput))}}
            onFocus={(searchFocused) => setSearchFocused(true)}
            onBlur={(searchFocused) => setSearchFocused(false)}
            className="w-96 pl-8"
            
            onChangeText={(searchInput) => setSearchInput(searchInput)}
            //onSubmitEditing={search}
          />
        </View>
      </View>
     <Trending/>
     {results.map((dish)=> ( 
      <DishCard
      key={dish.name}
      dish={{
        name:dish.name,
        description:dish.country,
        image:dish.image
      }}
      />

    ))}
     <Popular/>
    </ScrollView>
  );
};

export default Home;
