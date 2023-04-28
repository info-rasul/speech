import { Routes, Route } from 'react-router-dom';

import AdminLayout from './AdminLayout';

import Categories from '../features/categories';
import Dashboard from '../features/dashboard';
import Orders from '../features/orders';
import Products from '../features/products';
import ForgotPassword from '../features/user/ForgotPassword';
import SignIn from '../features/user/SignIn';
import SignUp from '../features/user/SignUp';
import Verify from '../features/user/Verify';

export default function RoutesList() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<Verify />} />
      <Route
        path="/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
      <Route
        path="/products"
        element={
          <AdminLayout>
            <Products />
          </AdminLayout>
        }
      />
      <Route
        path="/categories"
        element={
          <AdminLayout>
            <Categories />
          </AdminLayout>
        }
      />
      <Route
        path="/orders"
        element={
          <AdminLayout>
            <Orders />
          </AdminLayout>
        }
      />
    </Routes>
  );
}
