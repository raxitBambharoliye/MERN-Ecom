import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
  </Provider>

)