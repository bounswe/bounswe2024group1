import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routeConfig } from "./routes";
import { FullscreenLoading } from "./components/FullscreenLoading";

const router = createBrowserRouter(routeConfig);

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<FullscreenLoading />} />
  );
}

export default App;
