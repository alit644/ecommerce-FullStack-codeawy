import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./App/store.ts";
import { ProviderCH } from "./components/ui/provider.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ProviderCH>
          <App />
        </ProviderCH>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
