import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { FullscreenLoading } from "./components/FullscreenLoading";
import { Toaster } from "./components/ui/toaster";
import { router } from "./routes";
import { queryClient } from "./services/query-client";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} fallbackElement={<FullscreenLoading />} />
    </QueryClientProvider>
  );
}

export default App;
