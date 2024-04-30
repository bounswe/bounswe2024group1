interface Dish {
    id: string;
    name: string;
    country: string;
    image: string;
  }
  
  export const searchDishes = async (query: string): Promise<Dish[]> => {
    try {
      const res = await fetch(
        "/api/v1/search/dishes?q=" + encodeURIComponent(query),
      );
      return await res.json();
    } catch {
      throw new Error("Failed to fetch dishes");
    }
  };