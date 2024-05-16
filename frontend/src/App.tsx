import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routeConfig } from "./routes";
import { FullscreenLoading } from "./components/FullscreenLoading";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/query-client";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter(routeConfig);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} fallbackElement={<FullscreenLoading />} />
    </QueryClientProvider>
  );
}

export default App;
