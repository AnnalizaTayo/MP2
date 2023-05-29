import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
                        type="password"
                        placeholder="Password"
                        className="password"
                        value={password}
                        onChange={handlePasswordChange}
                        />
                        <i className="bx bx-hide eye-icon"></i>
                    </div>

                    <div className="form-link">
                        <a href="#" className="forgot-pass">
                        Forgot password?
                        </a>
                    </div>

                    <div className="field button-field">
                        <button type="submit">Login</button>
                    </div>
                </form>

                <div className="form-link">
                <span>
                    Don't have an account? <a href="#" className="link signup-link">Signup</a>
                </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
