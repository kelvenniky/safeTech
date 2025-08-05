import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import { Provider } from 'react-redux'
import { store } from '../store/store.jsx'
import StoreContextProvider from './context/StoreContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreContextProvider>
    <AuthProvider>
      <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
    </AuthProvider>
    </StoreContextProvider>
  </StrictMode>
)
