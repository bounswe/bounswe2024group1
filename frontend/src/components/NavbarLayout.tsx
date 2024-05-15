import {
  CircleUser,
  LogOut,
  Menu,
  Package2,
  User,
  UtensilsCrossed,
} from "lucide-react";
import {
  Link,
  NavLink,
  Outlet,
  useFetcher,
  useNavigation,
} from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { SearchBar } from "./SearchBar";
import useAuthStore from "../services/auth";
import { FullscreenLoading } from "./FullscreenLoading";
import { useNavigate } from "react-router-dom";

const links = [{ name: "Home", path: "/" }] as const;

export const NavbarLayout = () => {
  const fetcher = useFetcher();
  const isAuthenticated = !!useAuthStore().token;
  const navigate = useNavigate();
  const navigation = useNavigation();

  return (
    <div className="min-h-screen">
      <header className="container sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <UtensilsCrossed className="h-6 w-6" />
            <span className="sr-only">Semantic Cuisines</span>
          </Link>
          {links.map(({ name, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  "transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <NavLink
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </NavLink>
              {links.map(({ name, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    cn(
                      "transition-colors hover:text-foreground",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )
                  }
                >
                  {name}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex flex-1 sm:flex-initial">
            <SearchBar />
          </div>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/users/me">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <fetcher.Form
                  className="contents"
                  method="POST"
                  action="/logout"
                >
                  <DropdownMenuItem asChild>
                    <button type="submit">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  </DropdownMenuItem>
                </fetcher.Form>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <NavLink to="/login">Log in</NavLink>
            </Button>
          )}
        </div>
      </header>
      {navigation.state === "loading" && (
        <div className="fixed inset-0">
          <FullscreenLoading />
        </div>
      )}
      <main
        className={cn(
          "flex min-h-[calc(100vh-4rem)] flex-col transition-all duration-200",
          navigation.state === "loading" && "pointer-events-none opacity-30",
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};
