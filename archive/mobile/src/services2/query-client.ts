import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { signout } from "./auth";

import { renderError } from "./api/semanticBrowseFetcher";

const errorHandler = (error: Error) => {
  if ("status" in error && error.status === 401) {
    signout();
        // navigate to /login
    window.location.href =
      "/login?from=" +
      encodeURIComponent(window.location.pathname + window.location.search);
  } else {
  
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
