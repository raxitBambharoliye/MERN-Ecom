import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './assets/font/stylesheet.css'
import './assets/css/media.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}><App /></RouterProvider>
    </React.StrictMode>
  </Provider>
)
