import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { useEffect, Suspense, lazy, useState } from "react";
import { useAppDispatch } from "./redux/typedHooks";
import { fetchUser } from "./redux/slices/userSlice";
import { useCsrfToken } from "./services/useCsrfToken";
import { AuthModalProvider } from "./contexts/AuthModalContext";
import { AppointmentModalProvider } from "./contexts/AppointmentModalContext";

// Lazy load ToastContainer - not needed for initial render
const ToastContainer = lazy(() => 
  import("react-toastify").then(mod => ({ default: mod.ToastContainer }))
);

// Minimal loading component - removed spinner for faster FCP
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-secondary/10 to-accent/20">
    <p className="text-primary font-estedad-medium text-lg">در حال بارگذاری...</p>
  </div>
);

function App() {
  const dispatch = useAppDispatch();
  const [isHydrated, setIsHydrated] = useState(false);
  
  // استفاده از hook برای مدیریت CSRF token
  useCsrfToken();

  useEffect(() => {
    // Remove initial skeleton after hydration
    const skeleton = document.getElementById('initial-skeleton');
    if (skeleton) {
      skeleton.style.display = 'none';
    }
    setIsHydrated(true);
    
    // Defer user fetch slightly to not block initial render
    const timer = setTimeout(() => {
      dispatch(fetchUser());
    }, 100);
    
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthModalProvider>
      <AppointmentModalProvider>
        {/* Lazy load toast - only when hydrated */}
        {isHydrated && (
          <Suspense fallback={null}>
            <ToastContainer
              stacked
              position="top-right"
              autoClose={5000}
              closeOnClick={true}
              pauseOnHover={false}
              draggable={true}
              closeButton={false}
              progressClassName={"bg-"}
            />
          </Suspense>
        )}

        <Suspense fallback={<LoadingFallback />}>
          <RouterProvider router={routes} />
        </Suspense>
      </AppointmentModalProvider>
    </AuthModalProvider>
  );
}

export default App;
