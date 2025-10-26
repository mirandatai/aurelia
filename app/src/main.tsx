import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import Session from './pages/Session'
import Chat from './pages/Chat'
import AuthCallback from './pages/AuthCallback'
import Auth from './pages/Auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'auth', element: <Auth /> },
      { path: 'add', element: <AddBook /> },
      { path: 'session', element: <Session /> },
      { path: 'chat', element: <Chat /> },
      { path: 'auth/callback', element: <AuthCallback /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
