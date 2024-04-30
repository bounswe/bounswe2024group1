interface Dish {
  id: string;
  name: string;
  description: string;
  countries: string;
  ingredients: string;
  foodTypes: string;
  cuisines: string;
  image: string;
}

export const searchDishes = async (query: string): Promise<Dish[]> => {
  try {
    const res = await fetch(
      "/api/v1/search/dishes?q=" + encodeURIComponent(query),
    );
    return (await res.json()).data;
  } catch {
    throw new Error("Failed to fetch dishes");
  }
};
