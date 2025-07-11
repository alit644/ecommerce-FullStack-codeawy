import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./App/store.ts";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <ChakraProvider value={defaultSystem}>
            <App />
          </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
