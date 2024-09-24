import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface Dish {
  name: string;
  image: string;
  description: string;
}

const DishCard = ({ dish }: { dish: Dish }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: dish.image }} style={styles.image} />
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>{dish.name}</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <TouchableOpacity style={styles.linkContainer}>
          <Text style={styles.linkText}>See all recipes →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 400,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: -40, // Adjust based on your layout
    width: "70%",
    aspectRatio: 16 / 9,
    borderRadius: 10,
    overflow: "hidden",
    zIndex: 100,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  card: {
    backgroundColor: "#f3f3f3",
    paddingTop: 40,
    width: "100%",
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  description: {
    fontSize: 14,
    color: "#888",
    paddingHorizontal: 10,
  },
  linkContainer: {
    alignItems: "flex-end",
    padding: 10,
  },
  linkText: {
    fontSize: 14,
    color: "#007aff",
  },
});

export default DishCard;
