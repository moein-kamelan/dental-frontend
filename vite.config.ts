import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
          // PERFORMANCE: Critical vendor chunks for better caching
          "react-core": ["react", "react-dom"],
          "react-router": ["react-router-dom"],
          "redux": ["@reduxjs/toolkit", "react-redux"],
          "query": ["@tanstack/react-query"],
          
          // PERFORMANCE: Form libraries - only load when needed
          "forms": ["formik", "yup"],
          
          // PERFORMANCE: UI libraries - defer loading
          "ui-base": ["react-select", "react-toastify"],
          "swiper": ["swiper"],
          "motion": ["motion"],
          
          // PERFORMANCE: Heavy editors - lazy load
          "editor": [
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
          
          // PERFORMANCE: Map libraries - only for specific pages
          "maps": ["leaflet", "react-leaflet"],
        },
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600,
    // Use esbuild for faster builds, still provides good compression
    minify: 'esbuild',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Disable source maps in production for smaller bundle
    sourcemap: false,
    // Optimize chunk size
    cssMinify: 'lightningcss',
    // Target modern browsers for smaller output
    target: 'es2020',
    // Disable module preload to reduce overhead
    modulePreload: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'fuzzysort',
      'react-select'
    ],
    // Exclude heavy dependencies from pre-bundling
    exclude: ['@ckeditor/ckeditor5-react', 'ckeditor5'],
  },
  // Fix for react-select and fuzzysort compatibility with Vite
  resolve: {
    alias: {
      'fuzzysort': `${__dirname}/node_modules/fuzzysort/fuzzysort.js`,
    },
  },
});

