import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useId, useState } from "react";
import SearchFilterPopover from "./SearchFilterPopover";

export const SearchBar = () => {
  const id = useId();
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");
  const [cuisine, setCuisine] = useState(params.get("cuisine") || "");
  const [foodType, setFoodType] = useState(params.get("foodType") || "");

  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          navigate("/search?q=" + encodeURIComponent(search));
        }}
        className="flex gap-4"
      >
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search for dishes..."
          type="text"
          id={id}
          name="search"
        />
        <SearchFilterPopover
          cuisine={cuisine}
          setCuisine={setCuisine}
          foodType={foodType}
          setFoodType={setFoodType}
        />
        <Button type="submit" className="gap-2">
          <Search size={16} />
          Search
        </Button>
      </form>
    </div>
  );
};
