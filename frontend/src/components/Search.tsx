import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useId, useState } from "react";
import { Label } from "./ui/label";

export const SearchBar = () => {
  const id = useId();
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");

  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          navigate("/search-dishes?q=" + encodeURIComponent(search));
        }}
        className="flex gap-4"
      >
        <Label htmlFor={id}>Search for dishes</Label>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          id={id}
          name="search"
        />
        <Button type="submit" className="gap-2">
          <Search size={16} />
          Search
        </Button>
      </form>
    </div>
  );
};
