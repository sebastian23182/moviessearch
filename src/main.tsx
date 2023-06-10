import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { MoviesProvider } from './context/Context.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <MoviesProvider>
    <App />
  </MoviesProvider>,
)
