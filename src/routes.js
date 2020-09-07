import React from 'react';
import { Redirect } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account';
import CustomerListView from 'src/views/customer';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

export default [
  {
    path: "/",
    exact: true,
    layout: DashboardLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/login",
    layout: null,
    component: LoginView
  },
  {
    path: "/patient",
    layout: DashboardLayout,
    component: AccountView
  },
  {
    path: "/customers",
    layout: DashboardLayout,
    component: CustomerListView
  },
  {
    path: "/dashboard",
    layout: DashboardLayout,
    component: DashboardView
  },
  {
    path: "/products",
    layout: DashboardLayout,
    component: ProductListView
  },
  {
    path: "/settings",
    layout: DashboardLayout,
    component: SettingsView
  },
  {
    path: "/register",
    layout: DashboardLayout,
    component: RegisterView
  },
  {
    path: "/404",
    layout: MainLayout,
    component: NotFoundView
  },
  {
    path: "*",
    layout: MainLayout,
    component: NotFoundView
  },
];

// const routes = [
//   {
//     path: 'app',
//     element: <DashboardLayout />,
//     children: [
//       { path: 'account', element: <AccountView /> },
//       { path: 'customers', element: <CustomerListView /> },
//       { path: 'dashboard', element: <DashboardView /> },
//       { path: 'products', element: <ProductListView /> },
//       { path: 'settings', element: <SettingsView /> },
//       { path: '*', element: <Navigate to="/404" /> }
//     ]
//   },
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       { path: 'login', element: <LoginView /> },
//       { path: 'register', element: <RegisterView /> },
//       { path: '404', element: <NotFoundView /> },
//       { path: '/', element: <Navigate to="/app/dashboard" /> },
//       { path: '*', element: <Navigate to="/404" /> }
//     ]
//   }
// ];

// export default routes;
