import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import VetConsultationPage from './pages/VetConsultationPage';
import WishListPage from './pages/WishListPage';
import CartPage from './pages/CartPage';
import ProductManagement from './adminPages/ProductManagement';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      setIsLoggedIn(!!user);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  const handleNavigateToLogin = () => {
    alert("You are not logged in. Please login to your account.");
    navigate("/login");
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          {/* ... existing routes ... */}
          {isLoggedIn ? (
            <>
              <Route path="/consultation" element={<VetConsultationPage />} />
              <Route path="/wishlist" element={<WishListPage />} />
              <Route path="/cart" element={<CartPage />} />
            </>
          ) : (
            <>
              <Route
                path="/consultation"
                element={<ProtectedPage onNavigate={handleNavigateToLogin} />}
              />
              <Route
                path="/wishlist"
                element={<ProtectedPage onNavigate={handleNavigateToLogin} />}
              />
              <Route
                path="/cart"
                element={<ProtectedPage onNavigate={handleNavigateToLogin} />}
              />
            </>
          )}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProductsPage />} />
          {isLoggedIn ? (
            <Route path="/profile" element={<ProfilePage />} />
          ) : (
            <Route
              path="/profile"
              element={<ProtectedPage onNavigate={handleNavigateToLogin} />}
            />
          )}
          <Route path="/admin" element={<ProductManagement />} />
        </Routes>
      )}
      <Footer />
    </div>
  );
}

function ProtectedPage({ onNavigate }) {
  useEffect(() => {
    onNavigate();
  }, [onNavigate]);

  return null;
}

export default App;