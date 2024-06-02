// src/pages/Dashboard.js
import React from 'react';
import UserManagement from '../Components/UserManagement';
import ProductManagement from '../Components/ProductManagement';

function Dashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <UserManagement />
      <ProductManagement />
    </div>
  );
}

export default Dashboard;
