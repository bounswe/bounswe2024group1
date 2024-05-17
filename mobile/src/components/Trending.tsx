import { View, Text, TouchableOpacity, Image,FlatList } from 'react-native'
import React, { useState } from 'react'
import RecipeCardFake from './RecipeCardFake'
import { useRoute } from '@react-navigation/native';
import useAuthStore from '../services2/auth';
import { useGetFeed } from '../services2/api/semanticBrowseComponents';
import RecipeCard from './RecipeCard'
const Trending = ({data1}) => {
   
  //const [bookmarks, setBookmarks] = useState([]);
  const [feed,setFeed] = useState([])
  const isAuthenticated = useAuthStore().token !== null;
  const params = useRoute()
  const feedType = 'explore'
// const foodType = params.get("foodType") || "";
// const setFoodType = (val: string) => setParams({ ...params, foodType: val });
  const {
    data: feedData,
    isLoading,
    error,
  } = useGetFeed({
    queryParams: { type: isAuthenticated ? feedType : "explore" },
  });
  
  
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
        data={feedData?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RecipeCard recipe={item} />}

      />
      
    </View>
  )
}

export default Trending