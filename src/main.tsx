import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

const addFacebookMetaTag = () => {
  const metaTag = document.createElement("meta");
  metaTag.name = "facebook-domain-verification";
  metaTag.content = "e6tvq66pxp24q8v9h0gphfdx2kr2n6";
  document.head.appendChild(metaTag);

  setTimeout(() => {
    document.head.removeChild(metaTag);
  }, 5000);
};

addFacebookMetaTag();

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
