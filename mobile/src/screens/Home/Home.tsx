import React, { useState } from "react";
import {
  SearchDishesResponse,
  useSearchDishes,
} from "../../services2/api/semanticBrowseComponents";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
 Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Filter from "@/src/components/filter";
import Trending from "@/src/components/Trending";
import Popular from "@/src/components/Popular";
import Title from "@/src/components/Title";
import { searchDishes } from "@/src/services/search";
import { useRoute } from '@react-navigation/native';
import useAuthStore from "../../services2/auth";
import DishCard from "@/src/components/Dish";
import RecipeCard from "@/src/components/RecipeCard";
import Following from "@/src/components/Following";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetFeed } from "../../services2/api/semanticBrowseComponents";
import { renderError } from "../../services/api/semanticBrowseFetcher";


export const Home = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [searchInput, setSearchInput] = useState("");
  
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Explore');
  const isAuthenticated = useAuthStore().token !== null;
  
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedFoodTypes, setSelectedFoodTypes] = useState([]);
  

  const navigation = useNavigation();
  const feedType = selectedTab
  const {
    data: feedData,
    isLoading,
    error,
  } = useGetFeed({
    queryParams: { type: isAuthenticated ? feedType : "explore" },
  });
  if(error){
    console.log(error)
  }

  const handleSearch = () => {
  
    navigation.navigate('Search', {
      q: searchInput,
      cuisine: selectedCuisines,
      foodType: selectedFoodTypes,
    });
  };

  

  const FilterOption = ({ label, selected, onPress }) => (
    <TouchableOpacity style={[styles.filterOption, selected && styles.filterOptionSelected]} onPress={onPress}>
      <Text style={[styles.filterOptionText, selected && styles.filterOptionTextSelected]}>{label}</Text>
    </TouchableOpacity>
  );
  const toggleCuisine = (cuisine) => {
    setSelectedCuisines((prevSelected) =>
      prevSelected.includes(cuisine)
        ? prevSelected.filter((item) => item !== cuisine)
        : [...prevSelected, cuisine]
    );
  };

  const toggleFoodType = (foodType) => {
    setSelectedFoodTypes((prevSelected) =>
      prevSelected.includes(foodType)
        ? prevSelected.filter((item) => item !== foodType)
        : [...prevSelected, foodType]
    );
  };

  return (
    <SafeAreaView className="w-screen bg-white  pt-6 pl-6 pr-6 h-full box-border">
       
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.header}>Filter</Text>
            <Text style={styles.subHeader}>Cuisines</Text>
            <View style={styles.filterOptions}>
              <FilterOption label="Turkey" selected={selectedCuisines.includes('Turkey')} onPress={() => toggleCuisine('Turkey')} />
              <FilterOption label="Mediterranean" selected={selectedCuisines.includes('Mediterranean')} onPress={() => toggleCuisine('Mediterranean')} />
              <FilterOption label="Chinese" selected={selectedCuisines.includes('Chinese')} onPress={() => toggleCuisine('Chinese')} />
              <FilterOption label="Japanese" selected={selectedCuisines.includes('Turkish')} onPress={() => toggleCuisine('Turkish')} />
              <FilterOption label="Italian" selected={selectedCuisines.includes('Italian')} onPress={() => toggleCuisine('Italian')} />
              <FilterOption label="French" selected={selectedCuisines.includes('French')} onPress={() => toggleCuisine('French')} />
            </View>
            <Text style={styles.subHeader}>Type of Food</Text>
            <View style={styles.filterOptions}>
              <FilterOption label="Meat" selected={selectedFoodTypes.includes('Meat')} onPress={() => toggleFoodType('Meat')} />
              <FilterOption label="Vegetarian" selected={selectedFoodTypes.includes('Vegetarian')} onPress={() => toggleFoodType('Vegetarian')} />
              <FilterOption label="Baked" selected={selectedFoodTypes.includes('Baked')} onPress={() => toggleFoodType('Baked')} />
              <FilterOption label="Dairy" selected={selectedFoodTypes.includes('Dairy')} onPress={() => toggleFoodType('Dairy')} />
              <FilterOption label="Eggs" selected={selectedFoodTypes.includes('Eggs')} onPress={() => toggleFoodType('Eggs')} />
              <FilterOption label="Vegan" selected={selectedFoodTypes.includes('Vegan')} onPress={() => toggleFoodType('Vegan')} />
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={closeModal}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>  
      <View className="pt-6">
        <Title />
        <View className="flex-row items-center mt-8">
        <View
          className={` rounded-xl flex-row border-2 border-solid h-11  + ${searchFocused ? "border-app-red" : "border-gray-400"}`}
        >
          <View className="absolute left-3 top-3">
            <Image
              source={require("@/assets/Search.png")}
              className="h-4 w-4"
            />
          </View>
          <TextInput
            onSubmitEditing={() => {
              handleSearch() 
              
            }}
            onFocus={(searchFocused) => setSearchFocused(true)}
            onBlur={(searchFocused) => setSearchFocused(false)}
            className="w-80 pl-8"
            onChangeText={(searchInput) => setSearchInput(searchInput)}
            //onSubmitEditing={search}
          />

         
        </View>
        <TouchableOpacity onPress={openModal}>
            <Image className="w-10 h-10" source={require('@/assets/Filter.png')}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Explore' && styles.activeTab]}
          onPress={() => setSelectedTab('Explore')}
        >
          <Text style={[styles.tabText, selectedTab === 'Explore' && styles.activeTabText]}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Following' && styles.activeTab]}
          onPress={() => setSelectedTab('Following')}
        >
          <Text style={[styles.tabText, selectedTab === 'Following' && styles.activeTabText]}>Following</Text>
        </TouchableOpacity>
      </View>
      {selectedTab=='Explore'?
      <Trending data={feedData}/>:<Following/>}
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
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterOption: {
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  filterOptionSelected: {
    backgroundColor: 'red',
  },
  filterOptionText: {
    color: 'red',
  },
  filterOptionTextSelected: {
    color: 'white',
  },
  confirmButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
