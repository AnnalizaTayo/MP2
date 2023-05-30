import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can access the email and password values using the 'email' and 'password' state variables
  };

  return (
    <div>
      <div className="login-form">
        <header>Login</header>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="email"
              placeholder="Email"
              className="input"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <div className="field">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              className="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {passwordVisible ? <RiEyeOffLine /> : <RiEyeLine />}
            </span>
          </div>

          <div className="form-link">
            <Link to="/" className="forgot-pass">
              Forgot password?
            </Link>
          </div>

          <div className="field button-field">
            <button type="submit">Login</button>
          </div>
        </form>

        <div className="form-link">
          <span>
            Don't have an account?{' '}
            <Link to="/signup" className="link signup-link">
              Signup
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
