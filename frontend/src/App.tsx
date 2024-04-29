import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    children: routes,
  },
]);

function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<p>Initial loading...</p>}
    />
  );
}

export default App;
