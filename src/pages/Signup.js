import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import './Signup.css';
//import { google } from 'googleapis';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    petName: '',
    petType: '',
    petBreed: '',
    petAgeInMonths: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform sign-up logic or API call with the collected data
    console.log(formData);
    // Reset the form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      petName: '',
      petType: ''
    });
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div>
      <div className="signup-form">
        <header>Sign Up</header>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="input password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="eye-icon"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <RiEyeOffLine />
              ) : (
                <RiEyeLine />
              )}
            </span>
          </div>

          <div className="field">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="eye-icon"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <RiEyeOffLine />
              ) : (
                <RiEyeLine />
              )}
            </span>
          </div>

          <div className="field">
            <input
              type="text"
              name="petName"
              placeholder="Pet Name"
              className="input"
              value={formData.petName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <select
              name="petType"
              className="input"
              value={formData.petType}
              onChange={handleChange}
              required
            >
              <option value="">Select Pet Type</option>
              <option value="bird">Bird</option>
              <option value="cat">Cat</option>
              <option value="dog">Dog</option>
              <option value="fish">Fish</option>
              <option value="reptile">Reptile</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className="field button-field">
            <button type="submit">Sign Up</button>
          </div>
        </form>

        <div className="form-link">
          <span>
            Already have an account?{' '}
            <Link to="/login" className="link login-link">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
