import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import Title from "@/src/components/Title";

const FilterOption = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={isSelected ? styles.optionSelected : styles.option}
    onPress={onPress}
  >
    <Text style={isSelected ? styles.optionTextSelected : styles.optionText}>
      {label}
    </Text>
  </TouchableOpacity>
);

const FilterSection = ({
  title,
  options,
  selectedOptions,
  onSelectionChange,
}) => {
  return (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>{title}</Text>
      {options.map((option) => (
        <FilterOption
          key={option}
          label={option}
          isSelected={selectedOptions.includes(option)}
          onPress={() => onSelectionChange(option)}
        />
      ))}
    </View>
  );
};

const Results = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCuisineSelection = (cuisine) => {
    setSelectedCuisines((prevSelection) =>
      prevSelection.includes(cuisine)
        ? prevSelection.filter((item) => item !== cuisine)
        : [...prevSelection, cuisine],
    );
  };

  const handleProductSelection = (product) => {
    setSelectedProducts((prevSelection) =>
      prevSelection.includes(product)
        ? prevSelection.filter((item) => item !== product)
        : [...prevSelection, product],
    );
  };

  return (
    <ScrollView className="w-screen p-6 overflow-y-scroll">
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
            onFocus={(searchFocused) => setSearchFocused(true)}
            onBlur={(searchFocused) => setSearchFocused(false)}
            className="w-96 pl-8"
            placeholder="Type here to translate!"
            onChangeText={(searchInput) => setSearchInput(searchInput)}
            //onSubmitEditing={search}
          />
        </View>
        <TouchableOpacity className="mt-6 bg-app-red h-10 rounded-xl flex justify-center pl-3">
          <Text className="text-white">
            Filters ({selectedCuisines.length + selectedProducts.length})
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View className="flex-row">
          <FilterSection
            title="Cuisine:"
            options={["Korean", "Italian", "Turkish", "Spanish", "Mexican"]}
            selectedOptions={selectedCuisines}
            onSelectionChange={handleCuisineSelection}
          />
          <FilterSection
            title="Products:"
            options={["Chicken", "Beef", "Seafood", "Dairy", "Vegetable"]}
            selectedOptions={selectedProducts}
            onSelectionChange={handleProductSelection}
          />
        </View>
      </View>
      <View>
        <Text className="text-xl font-bold">Results</Text>
        <View className="flex-row">
          <View className="px-4">
            <TouchableOpacity>
              <Image
                className="h-48 w-36"
                resizeMode="cover"
                source={require("@/assets/Card2.png")}
              />
            </TouchableOpacity>
          </View>
          <View className="px-4">
            <TouchableOpacity>
              <Image
                className="h-48 w-36"
                resizeMode="cover"
                source={require("@/assets/Card2.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterSection: {
    marginBottom: 20,
    flexGrow: 1,
    padding: 4,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  option: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 5,
  },
  optionSelected: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#f00",
    padding: 10,
    marginBottom: 5,
    backgroundColor: "#f00",
  },
  optionText: {
    fontSize: 14,
    color: "#000",
  },
  optionTextSelected: {
    fontSize: 14,
    color: "#fff",
  },
});
export default Results;
