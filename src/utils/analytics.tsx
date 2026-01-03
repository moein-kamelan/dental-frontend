import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics Page View Tracking Hook
 * 
 * Automatically tracks page views when the route changes
 * Make sure to replace G-XXXXXXXXXX in index.html with your actual GA4 Measurement ID
 * 
 * Usage:
 * Add this to your main App component:
 * 
 * function App() {
 *   usePageTracking();
 *   return <YourApp />;
 * }
 */
export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if gtag is available (Google Analytics loaded)
    if (typeof window.gtag !== 'undefined') {
      // Track page view
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
      
      console.log('📊 GA4 Page View:', location.pathname);
    }
  }, [location]);
};

/**
 * Track custom events
 * 
 * Usage:
 * trackEvent('button_click', {
 *   button_name: 'appointment_booking',
 *   button_location: 'header'
 * });
 */
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
    console.log('📊 GA4 Event:', eventName, eventParams);
  } else {
    console.warn('Google Analytics not loaded');
  }
};

/**
 * Extend Window interface for TypeScript
 */
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export default usePageTracking;
