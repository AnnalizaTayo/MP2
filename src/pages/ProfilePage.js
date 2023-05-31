import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    // Check if user data exists in localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setFirstName(user.firstName);
    } else {
      alert('You are not logged in. Please log in to your account.');
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage and redirect to the login page
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div>
      Still Working on This Page
      {/* Still waiting for the home page*/}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
