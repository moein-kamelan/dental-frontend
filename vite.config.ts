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
        manualChunks: {
          // Vendor chunks for better caching
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "redux-vendor": ["@reduxjs/toolkit", "react-redux"],
          "query-vendor": ["@tanstack/react-query"],
          "form-vendor": ["formik", "yup"],
          "ui-vendor": ["react-select", "react-toastify", "swiper"],
          "editor-vendor": [
            "@ckeditor/ckeditor5-react",
            "ckeditor5",
            "@ckeditor/ckeditor5-build-classic",
            "@ckeditor/ckeditor5-basic-styles",
            "@ckeditor/ckeditor5-block-quote",
            "@ckeditor/ckeditor5-essentials",
            "@ckeditor/ckeditor5-heading",
            "@ckeditor/ckeditor5-image",
            "@ckeditor/ckeditor5-link",
            "@ckeditor/ckeditor5-list",
            "@ckeditor/ckeditor5-paragraph",
            "@ckeditor/ckeditor5-table",
            "@ckeditor/ckeditor5-upload",
          ],
          "map-vendor": ["leaflet", "react-leaflet"],
          "motion-vendor": ["motion"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification and compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate source maps for better debugging (disable in production if needed)
    sourcemap: false,
    // Optimize chunk size
    cssMinify: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'react-helmet-async'
    ],
  },
});

