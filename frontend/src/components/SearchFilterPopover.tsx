import Filter from "@/assets/Icon/General/Filter.svg";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import FilterCheckbox from "./FilterCheckbox";
import { Button } from "./ui/button";
import { useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";
import { XIcon } from "lucide-react";

export default function SearchFilterPopover({
  cuisine,
  setCuisine,
  foodType,
  setFoodType,
}: {
  cuisine: string;
  setCuisine: (cuisine: string) => void;
  foodType: string;
  setFoodType: (foodType: string) => void;
}) {
  const [tempCuisine, setTempCuisine] = useState(cuisine);
  const [tempFoodType, setTempFoodType] = useState(foodType);

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
          variant={!!cuisine || !!foodType ? "default" : "outline"}
          aria-label="Filter"
          className="flex-shrink-0"
        >
          <img src={Filter} className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-80 flex-col gap-4 px-6 py-8"
      >
        <PopoverClose aria-label="Close" className="absolute right-4 top-4">
          <XIcon />
        </PopoverClose>
        <h4 className="text-2xl font-bold">Filter</h4>
        <div className="flex flex-col gap-3">
          <h5 className="text-xl font-semibold">Cuisine</h5>
          <div className="flex flex-wrap gap-3 gap-y-2">
            <FilterCheckbox
              label="Italian"
              checked={tempCuisine === "Italian"}
              onChange={(e) =>
                setTempCuisine(e.target.checked ? "Italian" : "")
              }
            />
            <FilterCheckbox
              label="Chinese"
              checked={tempCuisine === "Chinese"}
              onChange={(e) =>
                setTempCuisine(e.target.checked ? "Chinese" : "")
              }
            />
            <FilterCheckbox
              label="Japanese"
              checked={tempCuisine === "Japanese"}
              onChange={(e) =>
                setTempCuisine(e.target.checked ? "Japanese" : "")
              }
            />
            <FilterCheckbox
              label="Turkish"
              checked={tempCuisine === "Turkish"}
              onChange={(e) =>
                setTempCuisine(e.target.checked ? "Turkish" : "")
              }
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h5 className="text-xl font-semibold">Type of Food</h5>
          <div className="flex flex-wrap gap-3 gap-y-2">
            <FilterCheckbox
              label="Meat"
              checked={tempFoodType === "Meat"}
              onChange={(e) => setTempFoodType(e.target.checked ? "Meat" : "")}
            />
            <FilterCheckbox
              label="Baked"
              checked={tempFoodType === "Baked"}
              onChange={(e) => setTempFoodType(e.target.checked ? "Baked" : "")}
            />
            <FilterCheckbox
              label="Dairy"
              checked={tempFoodType === "Dairy"}
              onChange={(e) => setTempFoodType(e.target.checked ? "Dairy" : "")}
            />
            <FilterCheckbox
              label="Eggs"
              checked={tempFoodType === "Eggs"}
              onChange={(e) => setTempFoodType(e.target.checked ? "Eggs" : "")}
            />
          </div>
        </div>
        <PopoverClose asChild>
          <Button
            onClick={() => {
              setCuisine(tempCuisine);
              setFoodType(tempFoodType);
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