import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import useAuthStore, { signout } from "./auth";
import { toast } from "@/components/ui/use-toast";
import { renderError } from "./api/semanticBrowseFetcher";
import { router } from "@/routes";

const errorHandler = (error: Error) => {
  if ("status" in error && error.status === 401) {
    if (!useAuthStore.getState().token) {
      toast({
        title: "Authentication required",
        description: "You need to log in before you perform this action.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Session expired",
        description: "Please log in again",
        variant: "destructive",
      });
    }

    signout();

    // navigate to /login
    router.navigate(
      "/login?from=" +
        encodeURIComponent(window.location.pathname + window.location.search),
    );
  } else {
    toast({
      title: "An error occurred",
      description: renderError(error),
      variant: "destructive",
    });
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
  mutationCache: new MutationCache({
    onError: errorHandler,
  }),

  queryCache: new QueryCache({
    onError: errorHandler,
  }),
});
