import React from "react";
import ReactDOM from "react-dom";
import "./assets/scss/index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
import AuthContextProvider from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2,
      cacheTime: 1000 * 60 * 60 * 4
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <SimpleReactLightbox>
            <App />
          </SimpleReactLightbox>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
