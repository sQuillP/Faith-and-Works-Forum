import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Home from './components/Home/Home';
import Gathering from './components/Gathering/Gathering';
import Links from './components/Links/Links';
import About from './components/about/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path:'/gathering',
    element: <Gathering/>
  }, 
  {
    path: '/links',
    element:<Links/>
  },
  {
    path:"/about",
    element:<About/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
