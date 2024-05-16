import React, { useState } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
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
import RecipeCard from "@/src/components/RecipeCard";

import Following from "@/src/components/Following";
import { SafeAreaView } from "react-native-safe-area-context";
export const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Trending');

  //PLACEHOLDER//
  const dishes = [
    {
      id: '1',
      name: 'Pepper sweetcorn ramen',
      chef: 'Niki Samantha',
      rating: 4.5,
      reviews: 300,
      time: '10 Mins',
      image: 'https://example.com/image1.jpg', // Replace with actual image URL
    },
    {
      id: '2',
      name: 'Cheddar cheese and shell salad',
      chef: 'Niki Samantha',
      rating: 4.5,
      reviews: 300,
      time: '20 Mins',
      image: 'https://example.com/image2.jpg', // Replace with actual image URL
    },
    {
      id: '3',
      name: 'Spicy chicken curry noodles',
      chef: 'Niki Samantha',
      rating: 4.5,
      reviews: 300,
      time: '15 Mins',
      image: 'https://example.com/image3.jpg', // Replace with actual image URL
    },
  ];
 
  return (
    <SafeAreaView className="w-screen bg-white  pt-6 pl-6 pr-6 h-full box-border">
      <View className="pt-6">
        <Title />
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
            onSubmitEditing={() => {
              searchDishes(searchInput).then((res) => {
                setResults(res);
              });
            }}
            onFocus={(searchFocused) => setSearchFocused(true)}
            onBlur={(searchFocused) => setSearchFocused(false)}
            className="w-96 pl-8"
            onChangeText={(searchInput) => setSearchInput(searchInput)}
            //onSubmitEditing={search}
          />
        </View>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Trending' && styles.activeTab]}
          onPress={() => setSelectedTab('Trending')}
        >
          <Text style={[styles.tabText, selectedTab === 'Trending' && styles.activeTabText]}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Following' && styles.activeTab]}
          onPress={() => setSelectedTab('Following')}
        >
          <Text style={[styles.tabText, selectedTab === 'Following' && styles.activeTabText]}>Following</Text>
        </TouchableOpacity>
      </View>
      {selectedTab=='Trending'?
      <Trending/>:<Following/>}
      {/*results.map((dish) => (
        <DishCard
          key={dish.id}
          dish={{
            name: dish.name,
            description: dish.description,
            image: dish.image,
          }}
        />
      ))}
    */}
    <View style={styles.addrecipecontainer}>
      <TouchableOpacity>
      <Image source={ require('@/assets/AddRecipe.png')}  style={styles.addrecipe} resizeMode='contain' resizeMethod='scale' />
      </TouchableOpacity>
      </View>
    
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }, 
  addrecipecontainer:{
    position:'absolute',
    left:'50%',
    bottom:0,
    zIndex:50
  },
  addrecipe: {
    width: 48,
    right: 0,
    position:'relative',
    height:48,
    zIndex:20
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginTop:10,
    backgroundColor: '#fff',
  
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#ff6347',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#ff6347',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  contentText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Home;
