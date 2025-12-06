import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { useEffect, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "./redux/typedHooks";
import { fetchUser } from "./redux/slices/userSlice";
import { useCsrfToken } from "./services/useCsrfToken";
import { AuthModalProvider } from "./contexts/AuthModalContext";

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-primary font-medium">در حال بارگذاری...</p>
    </div>
  </div>
);

function App() {
  const dispatch = useAppDispatch();
  // استفاده از hook برای مدیریت CSRF token
  useCsrfToken();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthModalProvider>
      <ToastContainer
        stacked
        position="top-left"
        autoClose={5000}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        closeButton={false}
        progressClassName={"bg-"}
      />

      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={routes} />
      </Suspense>
    </AuthModalProvider>
  );
}

export default App;
