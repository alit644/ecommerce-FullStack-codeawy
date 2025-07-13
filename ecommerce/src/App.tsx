import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./router";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
