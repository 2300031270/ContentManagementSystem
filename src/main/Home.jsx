//import React from 'react';
import './style.css'; 



export default function Home() {
  return (
    <div className="home-container">
      <div className="admin-section">
        <h1>Admin</h1>
        <ul>
          <li>Admin Login</li>
          <li>View all Customers</li>
          <li>View all Posts</li>
          <li>Delete/Block Customer</li>
          <li>View All Events</li>
        </ul>
      </div>
      <div className="customer-section">
        <h1>Customer</h1>
        <ul>
          <li>Customer Registration</li>
          <li>Customer Login</li>
          <li>Update Profile</li>
          <li>Add Post</li>
        </ul>
      </div>
    </div>
  );
}
