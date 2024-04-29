import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FilterOption = ({ label, isSelected, onPress }) => (
  <TouchableOpacity style={isSelected ? styles.optionSelected : styles.option} onPress={onPress}>
    <Text style={isSelected ? styles.optionTextSelected : styles.optionText}>{label}</Text>
  </TouchableOpacity>
);

const FilterSection = ({ title, options, selectedOptions, onSelectionChange }) => {
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

const Filter = () =>    {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCuisineSelection = (cuisine) => {
    setSelectedCuisines((prevSelection) =>
      prevSelection.includes(cuisine)
        ? prevSelection.filter((item) => item !== cuisine)
        : [...prevSelection, cuisine]
    );
  };

  const handleProductSelection = (product) => {
    setSelectedProducts((prevSelection) =>
      prevSelection.includes(product)
        ? prevSelection.filter((item) => item !== product)
        : [...prevSelection, product]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filters(2):</Text>
      <FilterSection
        title="Cuisine:"
        options={['Korean', 'Italian', 'Turkish', 'Spanish', 'Mexican']}
        selectedOptions={selectedCuisines}
        onSelectionChange={handleCuisineSelection}
      />
      <FilterSection
        title="Products:"
        options={['Chicken', 'Beef', 'Seafood', 'Dairy', 'Vegetable']}
        selectedOptions={selectedProducts}
        onSelectionChange={handleProductSelection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  option: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
  },
  optionSelected: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#f00',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f00',
  },
  optionText: {
    fontSize: 14,
    color: '#000',
  },
  optionTextSelected: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Filter;