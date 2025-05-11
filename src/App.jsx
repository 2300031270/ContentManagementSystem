import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainNavBar from "./main/MainNavBar";
import AdminNavBar from "./admin/AdminNavBar";
import CustomerNavBar from "./customer/CustomerNavBar";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";
import "./App.css"; 

function AppContent() {
  const { isAdminLoggedIn, isCustomerLoggedIn } = useAuth();

  return (
    <div className="app-container"> {/* Added a container div */}
      <BrowserRouter>
        {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isCustomerLoggedIn ? (
          <CustomerNavBar />
        ) : (
          <MainNavBar />
        )}
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}


export default App;