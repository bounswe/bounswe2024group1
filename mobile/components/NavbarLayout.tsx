import {
  Link,
  NavLink,
  Outlet,
  useFetcher,
  useNavigation,
} from "expo-router";
import {
  Bookmark,
  CircleUser,
  CodeXml,
  LogOut,
  Menu,
  Package2,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/services/auth";
import { cn } from "../lib/utils";
import { FullscreenLoading } from "./FullscreenLoading";
import { SearchBar } from "./SearchBar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const links = [{ name: "Home", path: "/" }] as const;

export const NavbarLayout = () => {
  const navigation = useNavigation();
  const fetcher = useFetcher();
  const isAuthenticated = !!useAuthStore().token;
  const selfProfile = useAuthStore().selfProfile;

  return (
    <View className="min-h-screen">
      <header className="container sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <CodeXml className="h-6 w-6" />
            <Text className="w-[max-content]">Programming Languages Forum</Text>
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
              <Text className="sr-only">Toggle navigation menu</Text>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <NavLink
                to="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <Text className="sr-only">Programming Languages</Text>
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
        <View className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <View className="ml-auto flex flex-1 sm:flex-initial">
            <SearchBar />
          </View>
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <Text className="sr-only">Toggle user menu</Text>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  {selfProfile?.username
                    ? `Welcome, ${selfProfile?.username}`
                    : "Account"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/users/me">
                    <User className="mr-2 h-4 w-4" />
                    <Text>Profile</Text>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/bookmarks">
                    <Bookmark className="mr-2 h-4 w-4 fill-white" />
                    <Text>Bookmarks</Text>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <fetcher.Form
                  className="contents"
                  method="POST"
                  action="/logout"
                >
                  <DropdownMenuItem asChild>
                    <button className="w-full" type="submit">
                      <LogOut className="mr-2 h-4 w-4" />
                      <Text>Log out</Text>
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
        </View>
      </header>
      {navigation.state === "loading" && (
        <View className="fixed inset-0">
          <FullscreenLoading />
        </View>
      )}
      <main
        className={cn(
          "flex min-h-[calc(100vh-4rem)] flex-col transition-all duration-200",
          navigation.state === "loading" && "pointer-events-none opacity-30",
        )}
      >
        <Outlet />
      </main>
    </View>
  );
};