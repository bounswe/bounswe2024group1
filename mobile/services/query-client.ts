import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { router } from 'expo-router';
import { renderError } from "./api/programmingForumFetcher";
import useAuthStore, { signout } from "./auth";

const toast = (_any: any) => { } // TODO: implement by using a proxy object and the useToast hook

const errorHandler = async (error: Error) => {
  if ("status" in error && error.status === 401) {
    if (!useAuthStore.getState().token) {
      toast({
        title: "Authentication required",
        description: "You need to log in before you can perform this action.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Session expired",
        description: "Please log in again",
        variant: "destructive",
      });
    }

    await signout();

    // navigate to /login
    router.navigate(
      "/login?from=" +
      encodeURIComponent(window.location.pathname + window.location.search) as any

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

useAuthStore.subscribe((state, prevState) => {
  if (state.token !== prevState.token) {
    queryClient.invalidateQueries();
  }
});
