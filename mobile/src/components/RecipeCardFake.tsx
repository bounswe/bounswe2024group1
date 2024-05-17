import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { RecipeSummary}  from "../services2/api/semanticBrowseSchemas";
export const RecipeCardFake = (
  {
    recipe: { id, name, images, avgRating, ratingsCount, cookTime, dish, author },
  }: {
    recipe: RecipeSummary;
  }) => {
  return (
    <View style={styles.card}>
        <View style={styles.container}>
      <Image source={require('@/assets/image26.png')}  style={styles.image} resizeMode='cover' resizeMethod='scale' />
      </View>
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.icons}>
            <TouchableOpacity style={styles.iconButton}>
            <Image source={require('@/assets/Link.png')} className="w-8" resizeMode='contain'/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image source={require('@/assets/Active.png')} className="w-8" resizeMode='contain'/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <Icon name="star" size={14} color="gold" />
          <Text style={styles.rating}>{avgRating}</Text>
          <Text style={styles.reviewCount}>({ratingsCount} Reviews)</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="clock" type="feather" size={14} color="#888" />
          <Text style={styles.infoText}>{cookTime}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="utensils" type="font-awesome-5" size={14} color="#888" />
          <Text style={styles.infoText}>{name}</Text>
        </View>
        <View style={styles.footer}>
          <Image source={{ uri: author.profilePicture }} style={styles.authorImage} />
          <TouchableOpacity>
          <Text style={styles.goToRecipe}>Go to recipe</Text>
          <Icon name="arrow-right" type="feather" size={18} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    paddingTop:120,
    borderRadius: 10,
    elevation: 2,
    paddingBottom:20,
    marginVertical: 10,
    overflow: 'hidden',
  },
  container:{
    position:'absolute',
    left:'50%'

  },
  image: {
    width: 200,
    left: '-50%',
      right: 0,
  marginLeft: 'auto', 
  marginRight: 'auto', 
    position:'relative',
    top:0,
    borderRadius:50,
    maxHeight:175,
    resizeMode: 'cover',
    zIndex:20
  },
  details: {
    padding: 10,    
    paddingTop:55,
    paddingBottom:20,
    paddingHorizontal:40,
    borderRadius:40,
    backgroundColor:'#f1f1f1'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems:'center'
  },
  iconButton: {
    marginLeft: 10,
    
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
  },
  reviewCount: {
    fontSize: 12,
    color: '#888',
    marginLeft: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#888',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  authorImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  goToRecipe: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
    color: '#ff5a5f',
  },
});

export default RecipeCardFake;