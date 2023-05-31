import React from "react";


const VetConsultationPage = () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
        alert("You are not logged in. Please login to your account.")
        window.location.href = '/login';
    }
    return (
        <div>
            Still Working on This Page
            {/* Still waiting for the home page*/}
        </div>
    );
};
  
export default VetConsultationPage;