import React from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text,FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have `expo` installed for icons
import RecipeCard from '@/src/components/RecipeCard';
import RecipeCardFake from '@/src/components/RecipeCardFake';
const ProfilePage = () => {
  const navigation = useNavigation();
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
    <RecipeCardFake recipe={item}/>
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <View contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My profile</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileSection}>
          <Image
            source={require('../../../assets/profilepicture.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit profile</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>Julius Lehner</Text>
        <Text style={styles.profileDescription}>
          Hello! I'm Julius, I'm from Germany 🇩🇪, but I am mostly interested in Turkish cuisine 🇹🇷
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>14K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        <View style={styles.recipesSection}>
          <Text style={styles.recipesTitle}>Recipes</Text>
          <TouchableOpacity style={styles.addButton}
          onPress={()=>{navigation.navigate('AddRecipe')}}
          >
            <Ionicons name="add-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Top-Rated</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Recent</Text>
          </TouchableOpacity>
        </View>
        <FlatList
        className="mt-4"
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop:36,
    paddingHorizontal:12,
    backgroundColor: '#FFF',
  },
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  editButton: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  profileDescription: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  recipesSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  recipesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 8,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  tab: {
    backgroundColor: 'red',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfilePage;