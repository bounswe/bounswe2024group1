import { View, Text, TouchableOpacity, Image,FlatList } from 'react-native'
import React from 'react'
import RecipeCard from './RecipeCard';
const Following = () => {
  const bookmarks = [];
  bookmarks[0] = {
    image: require("@/assets/temp2.png"),
    title: "matnti",
    author: "yigit",
    rating: "4.9",
    id: 1,
  };
  bookmarks[1] = {
    image: require("@/assets/temp2.png"),
    title: "matntiqwe",
    author: "yigit",
    rating: "4.9",
    id: 1,
  };
  bookmarks[2] = {
    image: require("@/assets/bookmarktemp.png"),
    title: "matnti",
    author: "yigit",
    rating: "4.9",
    id: 1,
  };
  bookmarks[3] = {
    image: require("@/assets/bookmarktemp.png"),
    title: "matnti",
    author: "yigit",
    rating: "4.9",
    id: 1,
  };
  const renderItem = ({ item }) => (
    <RecipeCard recipe={item}/>
  );
  return (
    <View className='pb-80'>
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
      <FlatList
        className="mt-4"
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      </View>
      </View>
  )
}

export default Following