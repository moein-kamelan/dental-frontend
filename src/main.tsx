import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/all.min.css";
import "./styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReduxProvider from "./redux/ReduxProvider.tsx";

// Lazy load ReactQueryDevtools (only needed in development)
const ReactQueryDevtools = lazy(() =>
  import("@tanstack/react-query-devtools").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {import.meta.env.DEV && (
        <Suspense fallback={null}>
          <ReactQueryDevtools />
        </Suspense>
      )}
      <ReduxProvider>
        <App />
      </ReduxProvider>
    </QueryClientProvider>
  </StrictMode>
);
