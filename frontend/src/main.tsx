import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './pages/App'
import Landing from './pages/Landing'
import Upload from './pages/Upload'
import Processing from './pages/Processing'
import Report from './pages/Report'
import Dashboard from './pages/Dashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/upload', element: <Upload /> },
      { path: '/processing', element: <Processing /> },
      { path: '/report', element: <Report /> },
      { path: '/dashboard', element: <Dashboard /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
