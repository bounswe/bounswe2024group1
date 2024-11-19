import { Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const SearchBar = () => {
  const id = useId();
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Handle first load tooltip
  useEffect(() => {
    const tooltipShown = localStorage.getItem("searchTooltipShown");

    if (!tooltipShown) {
      setShowTooltip(true);
      const timer = setTimeout(() => {
        setShowTooltip(false);
        localStorage.setItem("searchTooltipShown", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (
        e.key === "/" ||
        ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        navigate("/questions/new");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  const handleInputFocus = () => {
    // Only show tooltip on focus if it's not the first load
    if (localStorage.getItem("searchTooltipShown")) {
      setShowTooltip(true);
    }
  };

  const handleInputBlur = () => {
    setShowTooltip(false);
  };

  return (
    <div className="flex items-center gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const params = new URLSearchParams();
          params.append("type", "tags");
          params.append("q", search);
          navigate("/search?" + params.toString());
        }}
        className="flex gap-4"
      >
        <TooltipProvider>
          <Tooltip open={showTooltip}>
            <TooltipTrigger asChild>
              <Input
                ref={inputRef}
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={search}
                placeholder="Search for... (Press '/' or ⌘K to focus)"
                type="text"
                id={id}
                name="search"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Press '/' or ⌘K to quickly focus the search</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button type="submit" className="gap-2">
          <Search size={16} />
          Search
        </Button>
      </form>
    </div>
  );
};
