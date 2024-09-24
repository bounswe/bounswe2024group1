import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have `expo` installed for icons
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

const AddRecipe = () => {
  const [foodType, setFoodType] = useState('Meat Dish');
  const [serves, setServes] = useState('4');
  const [cookTime, setCookTime] = useState('45 min');
  const [calories, setCalories] = useState('700');
  const [dish, setDish] = useState('Icli Kofte');
  const [dishName, setDishName] = useState('My Icli Kofte Recipe');
  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Ground Meat', quantity: '500 g' },
    { id: 2, name: 'Parsley', quantity: '10 g' },
    { id: 3, name: 'Salt', quantity: 'pinch' },
  ]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');

  const navigation = useNavigation()

  const toggleAddModal = () => {
    setIngredientName('');
    setIngredientQuantity('');
    setAddModalVisible(!isAddModalVisible);
  };

  const toggleEditModal = (ingredient) => {
    setCurrentIngredient(ingredient);
    setIngredientName(ingredient.name);
    setIngredientQuantity(ingredient.quantity);
    setEditModalVisible(true);
  };

  const handleAddIngredient = () => {
    const newIngredient = {
      id: ingredients.length + 1,
      name: ingredientName,
      quantity: ingredientQuantity,
    };
    setIngredients([...ingredients, newIngredient]);
    toggleAddModal();
  };

  const handleEditIngredient = () => {
    const updatedIngredients = ingredients.map((ingredient) =>
      ingredient.id === currentIngredient.id
        ? { ...ingredient, name: ingredientName, quantity: ingredientQuantity }
        : ingredient
    );
    setIngredients(updatedIngredients);
    setEditModalVisible(false);
  };

  const renderIngredient = ({ item }) => (
    <IngredientRow ingredient={item} onEdit={() => toggleEditModal(item)} />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Recipe</Text>
        </View>
        <TextInput
          style={styles.recipeTitle}
          placeholder="My Icli Kofte Recipe"
          value={dishName}
          onChangeText={setDishName}
        />
        <View style={styles.imagePlaceholder}>
          {/* Image placeholder */}
        </View>
        <View style={styles.infoContainer}>
          <DropdownRow
            label="Food Type"
            value={foodType}
            setValue={setFoodType}
            items={[
              { label: 'Meat Dish', value: 'Meat Dish' },
              { label: 'Vegetarian Dish', value: 'Vegetarian Dish' },
              { label: 'Vegan Dish', value: 'Vegan Dish' },
            ]}
          />
          <DropdownRow
            label="Serves"
            value={serves}
            setValue={setServes}
            items={[
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '4', value: '4' },
              { label: '6', value: '6' },
              { label: '8', value: '8' },
            ]}
          />
          <DropdownRow
            label="Cook time"
            value={cookTime}
            setValue={setCookTime}
            items={[
              { label: '15 min', value: '15 min' },
              { label: '30 min', value: '30 min' },
              { label: '45 min', value: '45 min' },
              { label: '1 hr', value: '1 hr' },
              { label: '1.5 hr', value: '1.5 hr' },
            ]}
          />
          <DropdownRow
            label="Calories"
            value={calories}
            setValue={setCalories}
            items={[
              { label: '100', value: '100' },
              { label: '200', value: '200' },
              { label: '300', value: '300' },
              { label: '400', value: '400' },
              { label: '500', value: '500' },
              { label: '600', value: '600' },
              { label: '700', value: '700' },
              { label: '800', value: '800' },
            ]}
          />
          <DropdownRow
            label="Dish"
            value={dish}
            setValue={setDish}
            items={[
              { label: 'Icli Kofte', value: 'Icli Kofte' },
              { label: 'Kebab', value: 'Kebab' },
              { label: 'Baklava', value: 'Baklava' },
              { label: 'Borek', value: 'Borek' },
            ]}
          />
        </View>
        <Text style={styles.subHeader}>Ingredients</Text>
        <FlatList
          data={ingredients}
          renderItem={renderIngredient}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.ingredientsContainer}
        />
        <TouchableOpacity style={styles.addButton} onPress={toggleAddModal}>
          <Text style={styles.addButtonText}>+ Add new ingredient</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={()=>{navigation.navigate('Home')}}
        style={styles.nextStepButton}>
          <Text style={styles.nextStepButtonText}>Add Recipe</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal isVisible={isAddModalVisible} onBackdropPress={toggleAddModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Ingredient</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Ingredient Name"
            value={ingredientName}
            onChangeText={setIngredientName}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Quantity"
            value={ingredientQuantity}
            onChangeText={setIngredientQuantity}
          />
          <Button title="Add" onPress={handleAddIngredient} />
        </View>
      </Modal>
      <Modal isVisible={isEditModalVisible} onBackdropPress={() => setEditModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Ingredient</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Ingredient Name"
            value={ingredientName}
            onChangeText={setIngredientName}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Quantity"
            value={ingredientQuantity}
            onChangeText={setIngredientQuantity}
          />
          <Button title="Save" onPress={handleEditIngredient} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const DropdownRow = ({ label, value, setValue, items }) => (
  <View style={styles.dropdownRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <RNPickerSelect
      onValueChange={(value) => setValue(value)}
      value={value}
      items={items}
      style={pickerSelectStyles}
      useNativeAndroidPickerStyle={false}
      Icon={() => <Ionicons name="chevron-down" size={24} color="gray" />}
    />
  </View>
);

const IngredientRow = ({ ingredient, onEdit }) => (
  <View style={styles.ingredientRow}>
    <Text style={styles.ingredientText}>{ingredient.name}</Text>
    <Text style={styles.quantityText}>{ingredient.quantity}</Text>
    <TouchableOpacity onPress={onEdit}>
      <Ionicons name="pencil-outline" size={24} color="gray" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom:64,
    backgroundColor: '#F5F5F5',
  },
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  dropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ingredientsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientText: {
    flex: 1,
    fontSize: 16,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginRight: 8,
  },
  addButton: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  nextStepButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextStepButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
});

export default AddRecipe;