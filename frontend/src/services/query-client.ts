import { QueryCache, QueryClient } from "@tanstack/react-query";
import useAuthStore from "./auth";
import { toast } from "@/components/ui/use-toast";
import { renderError } from "./api/semanticBrowseFetcher";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if ("status" in error && error.status === 401) {
        useAuthStore.getState().logout();
        toast({
          title: "Session expired",
          description: "Please log in again",
          variant: "destructive",
        });

        // navigate to /login
        window.location.href =
          "/login?from=" +
          encodeURIComponent(window.location.pathname + window.location.search);
      } else {
        toast({
          title: "An error occurred",
          description: renderError(error),
          variant: "destructive",
        });
      }
    },
  }),
});
