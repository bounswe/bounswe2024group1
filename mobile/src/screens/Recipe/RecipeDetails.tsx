import { useRoute } from "@react-navigation/native";
import React from "react";
import { Button, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "expo-image";
import StarIcon from "@/src/components/Icon/General/Star";
import ServingIcon from "@/src/components/Icon/General/Serving";
import FoodIcon from "@/src/components/Icon/General/Food";
import ClockIcon from "@/src/components/Icon/General/Clock";
import AllergiesIcon from "@/src/components/Icon/General/Allergies";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type CuisineSummary = {
  id: number;
  name: string;
};

export type DishSummary = {
  id: string;
  name: string;
  countries?: string;
};

export type UserSummary = {
  id: number;
  username: string;
  name: string;
  followersCount: number;
  /**
   * @format uri
   */
  profilePicture: string;
  selfFollowing?: boolean;
  recipeCount: number;
  /**
   * @format float
   */
  avgRating: number;
};

export type RecipeDetails = {
  id: number;
  name: string;
  description: string;
  instructions: string[];
  ingredients: {
    name?: string;
    amount?: string;
  }[];
  images: string[];
  cookTime: number;
  servingSize: number;
  allergens: string[];
  cuisine?: CuisineSummary;
  dish: DishSummary;
  selfBookmarked?: boolean;
  /**
   * @format float
   */
  avgRating?: number;
  ratingsCount: number;
  /**
   * The current user's rating for this recipe, if any.
   */
  selfRating?: number;
  author: UserSummary;
};

export const RecipeDetails = () => {
  const route = useRoute();
  const recipe = route.params.recipe as RecipeDetails;
  const { instructions } = recipe;
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView
      className="container flex gap-4 px-8"
      contentContainerStyle={{ paddingTop: top }}
    >
      <View className="flex flex-row items-center justify-between">
        <Text className="text-3xl font-extrabold">{recipe.name}</Text>
        <View className="flex flex-row gap-4">
          {/* <Pressable
            onPress={() => {
              // navigator.clipboard.writeText(window.location.href);
            }}
          >
            <Text>Copy Link</Text>
          </Pressable> */}
          {/* {!!token && <BookmarkButton recipe={recipe} />} */}
        </View>
      </View>
      <Image
        source={{ uri: recipe?.images?.[0] || "https://placehold.co/400x300" }}
        alt={recipe.name}
        className="h-48 w-full rounded-3xl object-cover"
      />

      <View className="flex flex-row items-center justify-between">
        <Pressable
          // to={`/users/${recipe.author.id}`}
          className="flex flex-row items-center gap-4"
        >
          <Image
            source={{
              uri:
                recipe.author.profilePicture || "https://placehold.co/640x640",
            }}
            alt={recipe.author.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <Text className="font-bold">{recipe.author.name}</Text>
        </Pressable>
        {/* {token && selfProfile?.id !== recipe.author.id && (
        <FollowButton profile={recipe.author} />
      )} */}
      </View>
      <View className="flex flex-row items-center">
        <View className="flex flex-row items-center gap-x-2">
          <StarIcon className="h-3 w-3 fill-black" />
          <Text className="font-bold">{recipe.avgRating || "-"}</Text>
          <Text className="font-light text-gray-500">
            ({recipe.ratingsCount} ratings)
          </Text>
        </View>
        {/* {!!token && (
        <RatingInput
          currentRating={optimisticRating ?? recipe.selfRating ?? 0}
          setRating={(rating) => {
            mutateAsync({
              pathParams: { recipeId: recipe.id },
              body: { rating },
            });
          }}
        />
      )} */}
      </View>
      {/* <Bookmarkers recipeId={recipe.id} /> */}

      <View className="flex flex-wrap flex-row  py-2">
        {/* <span className="flex flex-row items-center gap-4 font-bold">
        <MeatDish className="h-6 w-6" />
        Meat
      </span> */}
        <Text className="flex-1 flex-row items-center gap-x-2 font-bold">
          <ServingIcon className="h-4 w-4" />
          {recipe.servingSize} servings
        </Text>
        <Text className="flex-1 flex-row items-center gap-x-2 font-bold">
          <FoodIcon className="h-4 w-4" />
          {recipe.dish.name}
        </Text>
      </View>
      <View className="flex flex-wrap flex-row  py-2">
        <Text className="flex-1 flex-row items-center gap-x-2 font-bold">
          <ClockIcon className="h-4 w-4" />
          {recipe.cookTime} min
        </Text>
        {recipe.dish.countries && (
          <Text className="flex-1 flex-row gap-x-2 items-center font-bold">
            {/* <Clock className="h-4 w-4" /> */}
            {recipe.dish.countries}
          </Text>
        )}
        <Text className="flex-1 flex-row gap-x-2 tems-center font-bold">
          <AllergiesIcon className="h-4 w-4" />
          {recipe.allergens?.join(", ") || "None"}
        </Text>
      </View>

      <Text className="">{recipe.description}</Text>

      <View className="gap-y-4 py-3">
        <View className="flex-row items-center justify-between">
          <Text className="font-bold">Steps</Text>
          <Text className="text-sm text-gray-400">
            {instructions.length} steps
          </Text>
        </View>
        {instructions.map((step, index) => (
          <View
            key={index}
            className="flex flex-row rounded-lg bg-neutral-200 p-4 px-4"
          >
            <Text className="font-bold">{index + 1}.</Text>
            <Text key={index} className="ml-2 mr-2">
              {step}
            </Text>
          </View>
        ))}
      </View>
      <View className="gap-y-4 py-3">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-2xl font-bold">Ingredients</Text>
          <Text className="text-sm text-gray-400">
            {recipe.ingredients.length} steps
          </Text>
        </View>
        {recipe.ingredients.map((ingredient, index) => (
          <View
            key={index}
            className="flex flex-row items-center justify-between rounded-lg bg-neutral-200 px-4 py-4"
          >
            <View className="flex flex-row items-center gap-4">
              {/* <Text className="flex flex-row h-11 w-11 items-center justify-center rounded-lg bg-neutral-50 text-xl">
              </Text> */}
              <Text className="font-bold">{ingredient.name}</Text>
            </View>
            <Text className="text-neutral-400">100g</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
