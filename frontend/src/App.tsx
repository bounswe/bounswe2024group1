import { RouterProvider } from "react-router-dom";
import { FullscreenLoading } from "./components/FullscreenLoading";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/query-client";
import { Toaster } from "./components/ui/toaster";
import { router } from "./routes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} fallbackElement={<FullscreenLoading />} />
    </QueryClientProvider>
  );
}

export default App;
