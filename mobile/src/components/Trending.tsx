import { View, Text, TouchableOpacity, Image,FlatList } from 'react-native'
import React from 'react'

import RecipeCard from './RecipeCard'
const Trending = () => {
   
  //const [bookmarks, setBookmarks] = useState([]);
  
  const bookmarks = [];
  bookmarks[0] = {
    
    name: "ApplePie",
    author: "Mehmet",
    avgRating: "4.9",
    ratingsCount:400,
    cookTime:'2 hours',
    id: 1,

  };
  bookmarks[1] = {
   
    name: "ApplePie",
    author: "Mehmet",
    avgRating: "4.9",
    ratingsCount:400,
    cookTime:'2 hours',
    id: 2,
  };
  bookmarks[2] = {
   
    name: "ApplePie",
    author: "Mehmet",
    avgRating: "4.9",
    ratingsCount:400,
    cookTime:'2 hours',
    id:3,
  };
  bookmarks[3] = {
   
    name: "ApplePie",
    author: "Mehmet",
    avgRating: "4.9",
    ratingsCount:400,
    cookTime:'2 hours',
    id: 4,
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
      
      <FlatList
        className="mt-4"
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      
    </View>
  )
}

export default Trending