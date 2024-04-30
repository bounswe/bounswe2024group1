interface Dish {
  id: string;
  name: string;
  description: string;
  country: string;
  image: string;
}

const BASE_URL = "https://semantic-cuisine-staging-t3m52.ondigitalocean.app";

export const searchDishes = async (query: string): Promise<Dish[]> => {
  try {
    const res = await fetch(
      BASE_URL + "/api/v1/search/dishes?q=" + encodeURIComponent(query),
    );
    return (await res.json()).data;
  } catch {
    throw new Error("Failed to fetch dishes");
  }
};
