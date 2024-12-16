import { Hash, MessageSquare, Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type SearchType = "tags" | "questions";

const searchTypes = [
  { id: "tags", label: "Tags", icon: Hash },
  { id: "questions", label: "Questions", icon: MessageSquare },
] as const;

export const SearchBar = () => {
  const id = useId();
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");
  const [searchType, setSearchType] = useState<SearchType>(
    (params.get("type") as SearchType) || "tags",
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Get current search type info
  const currentSearchType = searchTypes.find((type) => type.id === searchType);
  const SearchTypeIcon = currentSearchType?.icon || Hash;

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("type", searchType);
    params.append("q", search);
    params.append("sortBy", "recommended");
    navigate("/search?" + params.toString());
  };

  return (
    <div className="flex items-center gap-4">
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-r-none border-r-0 px-3"
                type="button"
                name={currentSearchType?.label}
                data-testid="search-type-dropdown"
              >
                <SearchTypeIcon className="mr-2 h-4 w-4" />
                <span className="sr-only">{currentSearchType?.label}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {searchTypes.map((type) => (
                <DropdownMenuItem
                  key={type.id}
                  onClick={() => {
                    setSearchType(type.id);
                    setIsDropdownOpen(false);
                  }}
                  data-testid={`search-type-${type.id}`}
                >
                  <type.icon className="mr-2 h-4 w-4" />
                  {type.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
                  placeholder={`Search ${currentSearchType?.label.toLowerCase()}... (Press '/' or ⌘K to focus)`}
                  type="text"
                  id={id}
                  name="search"
                  className="rounded-l-none"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Press '/' or ⌘K to quickly focus the search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button type="submit" className="gap-2">
          <Search size={16} />
          Search
        </Button>
      </form>
    </div>
  );
};
