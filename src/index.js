import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';


// General site components
import Home from './components/Home/Home';
import Gathering from './components/Gathering/Gathering';
import Links from './components/Links/Links';
import About from './components/about/About';
import Resources from './components/Resources/Resources'; //ignore import error

// Admin page components
import Admin from './components/Admin/Admin/Admin';
import AdminLogin from './components/Admin/Login/AdminLogin';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import AuthGuard from './components/Admin/admin_util/AuthGuard';
import UpdateLinks from './components/Admin/UpdateLinks/UpdateLinks';
import UpdateAbout from './components/Admin/UpdateAbout/UpdateAbout';
import ManageGathering from './components/Admin/ManageGathering/ManageGathering';
import ManageContacts from './components/Admin/ManageContacts/ManageContacts';
import Settings from './components/Admin/Settings/Settings';
// import Instagram from './components/Instagram/Instagram';


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
  },
  {
    path: '/resources',
    element: <Resources/>
  },
  //Instagram may or may not be used.
  // {
  //   path:'/instagram',
  //   element:<Instagram/>
  // }
  {
    path:'/admin',
    element:<Admin/>,
    children:[
      {
        path:'login',
        element: <AdminLogin/>
      },
      {
        path: 'dashboard',
        element:(
          <AuthGuard>
            <Dashboard/>
          </AuthGuard>
        )
      },
      {
        path:'updatelinks',
        element:( 
          <AuthGuard>
            <UpdateLinks/>
          </AuthGuard>)
      },
      {
        path:'updateabout',
        element:(
          <AuthGuard>
            <UpdateAbout/>
          </AuthGuard>
        )
      },
      {
        path:'managegathering',
        element: (
          <AuthGuard>
            <ManageGathering/>
          </AuthGuard>
        )
      },
      {
        path:'managecontacts',
        element: (
          <AuthGuard>
            <ManageContacts/>
          </AuthGuard>
        )
      },
      {
        path:'settings',
        element: (
          <AuthGuard>
            <Settings/>
          </AuthGuard>
        )
      },
      {
        path:'*',
        element: (
          <Navigate to={'/admin/login'}/>
        )
      },
    ]
  },
  {
    path:'*',
    element: (
      <Navigate to={'/'}/>
    )
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
