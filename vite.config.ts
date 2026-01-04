import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),

    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Critical path - keep small for fast initial load
          if (id.includes('node_modules')) {
            // Core React - needed immediately
            if (id.includes('react-dom') || id.includes('react/')) {
              return 'react-core';
            }
            // Router - needed for navigation
            if (id.includes('react-router')) {
              return 'react-router';
            }
            // State management - can be slightly deferred
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'redux';
            }
            // React Query - for data fetching
            if (id.includes('@tanstack/react-query') && !id.includes('devtools')) {
              return 'query';
            }
            // Motion - defer as much as possible
            if (id.includes('motion') || id.includes('framer-motion')) {
              return 'motion';
            }
            // Swiper - only needed for banner
            if (id.includes('swiper')) {
              return 'swiper';
            }
            // Form libraries - only needed for forms
            if (id.includes('formik') || id.includes('yup')) {
              return 'forms';
            }
            // UI components
            if (id.includes('react-select') || id.includes('react-toastify')) {
              return 'ui';
            }
            // CKEditor - very heavy, lazy load only in admin
            if (id.includes('ckeditor')) {
              return 'editor';
            }
            // Map - lazy load only when needed
            if (id.includes('leaflet') || id.includes('react-leaflet')) {
              return 'map';
            }
            // Helmet for SEO
            if (id.includes('react-helmet')) {
              return 'seo';
            }
            // Everything else goes to vendor
            return 'vendor';
          }
        },
      },
    },
    // Performance optimizations
    target: 'es2020',
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 500,
    // Use esbuild for faster builds
    minify: 'esbuild',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Disable source maps in production
    sourcemap: false,
    // Optimize CSS
    cssMinify: true,
    // Rollup optimizations
    reportCompressedSize: false, // Faster builds
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'react-helmet-async'
    ],
    exclude: [
      '@ckeditor/ckeditor5-react',
      'ckeditor5'
    ]
  },
  // Server configuration for development
  server: {
    warmup: {
      clientFiles: [
        './src/main.tsx',
        './src/App.tsx',
        './src/pages/Main/Home/Home.tsx',
        './src/components/templates/Main/Home/Banner/Banner.tsx',
      ]
    }
  }
});

