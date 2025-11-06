import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./styles/all.min.css"
import "./styles/global.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import ReduxProvider from './redux/ReduxProvider.tsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
  <ReactQueryDevtools/>
    <ReduxProvider>
    <App />
    </ReduxProvider>
    </QueryClientProvider>
  </StrictMode>,
)
