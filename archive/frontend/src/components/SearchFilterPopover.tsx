import Filter from "@/assets/Icon/General/Filter.svg?react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import FilterCheckbox from "./FilterCheckbox";
import { Button } from "./ui/button";
import { useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const predefinedCuisines = [
  "Indonesian",
  "Turkish",
  "Russian",
  "Japanese",
  "French",
];
const predefinedTypeOfFood = [
  "Cookies",
  "baked good",
  "bread",
  "chicken dish",
  "dessert",
  "dip",
  "drink",
  "fruit dish",
  "halal food",
  "hamburger",
  "kosher food",
  "meat dish",
  "noodle dish",
  "pasta dish",
  "pizza",
  "pork dish",
  "rice dish",
  "roll",
  "salad",
  "sandwich",
  "seafood",
  "skewer",
  "soft drink",
  "soup",
  "sushi",
  "vegan food",
  "vegetarian cuisine",
];

type CuisineFilter = {
  cuisine: string;
  setCuisine: (cuisine: string) => void;
};
type FoodTypeFilter = {
  foodType: string;
  setFoodType: (foodType: string) => void;
};
export default function SearchFilterPopover(
  props: (object | CuisineFilter) & (object | FoodTypeFilter),
) {
  const {
    cuisine = "",
    foodType = "",
    setCuisine = null,
    setFoodType = null,
  } = props as CuisineFilter & FoodTypeFilter;

  const [tempCuisine, setTempCuisine] = useState(cuisine);
  const [tempFoodType, setTempFoodType] = useState(foodType);

  const hasFilter = !!cuisine || !!foodType;

  return (
    <Popover
      onOpenChange={(open) => {
        if (!open) {
          setTempCuisine(cuisine);
          setTempFoodType(foodType);
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant={hasFilter ? "default" : "outline"}
          aria-label="Filter"
          className="flex-shrink-0"
        >
          <Filter
            className={cn(
              "h-6 w-6",
              hasFilter ? "stroke-2 text-white" : "text-gray-800",
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-80 flex-col gap-4 px-6 py-8"
      >
        <PopoverClose aria-label="Close" className="absolute right-4 top-4">
          <XIcon />
        </PopoverClose>
        {setCuisine && (
          <>
            <h4 className="text-2xl font-bold">Filter</h4>
            <div className="flex flex-col gap-3">
              <h5 className="text-xl font-semibold">Cuisine</h5>
              <div className="flex flex-wrap gap-3 gap-y-2">
                {predefinedCuisines.map((cuisine) => (
                  <FilterCheckbox
                    key={cuisine}
                    label={cuisine}
                    checked={tempCuisine === cuisine}
                    onChange={(e) =>
                      setTempCuisine(e.target.checked ? cuisine : "")
                    }
                  />
                ))}
              </div>
            </div>
          </>
        )}
        {setFoodType && (
          <>
            <div className="flex flex-col gap-3">
              <h5 className="text-xl font-semibold">Type of Food</h5>
              <div className="flex flex-wrap gap-3 gap-y-2">
                {predefinedTypeOfFood.map((type) => (
                  <FilterCheckbox
                    key={type}
                    label={type}
                    checked={tempFoodType === type}
                    onChange={(e) =>
                      setTempFoodType(e.target.checked ? type : "")
                    }
                  />
                ))}
              </div>
            </div>
          </>
        )}
        <PopoverClose asChild>
          <Button
            onClick={() => {
              setCuisine?.(tempCuisine);
              setFoodType?.(tempFoodType);
            }}
            className="self-end"
          >
            Confirm
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
