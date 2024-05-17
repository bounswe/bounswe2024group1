import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSearchDishes, SearchDishesResponse } from '../../services2/api/semanticBrowseComponents';
//import ErrorAlert from '../components/ErrorAlert'; // Ensure this component is adapted for React Native

const FullscreenLoading = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

const Dish = ({ dish }) => (
  <View style={styles.dishContainer}>
    <Image source={{ uri: dish.image }} style={styles.dishImage} />
    <Text style={styles.dishName}>{dish.name}</Text>
    <Text style={styles.dishDescription}>{dish.description}</Text>
    <Text style={styles.dishCountries}>{dish.countries.join(', ')}</Text>
  </View>
);

export const Search = () => {
  const route = useRoute();
  const { q = '', cuisine = '', foodType = '' } = route.params || {};
 
  const { data: searchResult, isLoading, error } = useSearchDishes<SearchDishesResponse>({
    queryParams: {
      q,
      ...(cuisine ? { cuisine } : {}),
      ...(foodType ? { foodType } : {}),
    },
  });

  if (isLoading) {
    return <FullscreenLoading />;
  }

  if (error) {
    console.log(error)
  }
console.log(searchResult)
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {searchResult?.data?.length
          ? `Found ${searchResult.data.length} results`
          : 'No dishes found'}
      </Text>
      {!searchResult?.data?.length && (
        <Text style={styles.suggestion}>Try searching for "japan", or "sausage"</Text>
      )}
      <FlatList
        data={searchResult?.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Dish dish={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  suggestion: {
    fontSize: 16,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  dishContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  dishImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  dishDescription: {
    fontSize: 14,
    color: '#555',
  },
  dishCountries: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
});