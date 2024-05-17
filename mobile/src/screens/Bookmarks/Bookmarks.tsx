import { useGetMe } from "../../services2/api/semanticBrowseComponents"
import { renderError } from "../../services2/api/semanticBrowseFetcher";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import RecipeCard from "@/src/components/RecipeCard";
const BookmarksScreen = () => {
  //const [bookmarks, setBookmarks] = useState([]);
  const { data: bookmarksData, isLoading, error } = useGetMe({});

  // useEffect(() => {
  // Fetch the bookmarks from the server
  //get('bookmarks')
  //  .then(response => {
  //    setBookmarks(response.data);
  //  })
  //  .catch(error => {
  //    console.error(error);
  //  });
  //}, []);

  /*PLACEHOLDER*/ /*PLACEHOLDER*/
  /*PLACEHOLDER*/ /*PLACEHOLDER*/ 
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
    title: "matnti",
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
    <View className="flex-col bg-white px-6 py-20">
      <Text className="text-3xl font-semibold">Bookmarks</Text>
      {/*<View className="w-48 bg-white mt-6 h-10 bg-app-red rounded-xl" />*/}
      <FlatList
        className="mt-4"
        data={bookmarksData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

/*WILL DELETE THIS SHEET AND CONVERT EVERYTHING TO CLASSES LATER*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  redBox: {
    width: 50,
    height: 5,
    backgroundColor: "red",
    marginBottom: 10,
  },
  bookmarkItem: {
    backgroundColor: "#ffffff",
    marginVertical: 10,
    borderRadius: 10,
    elevation: 1,

    overflow: "hidden",
  },
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  details: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
  },
  author: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
  },
  bookmarkIcon: {
    position: "absolute",
    top: 0,
    right: -18,
  },
  menuIcon: {
    padding: 5,
  },
});

export default BookmarksScreen;
