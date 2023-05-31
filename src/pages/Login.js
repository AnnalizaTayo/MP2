import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import './Login.css';


const Login = () => {
    useEffect(() => {
        // Check if user data exists in localStorage
        const userString = localStorage.getItem('user');
        if (userString) {
            window.location.href = '/';
        }
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users');
            const data = await response.json();
            const user = data.find((user) => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                console.log('User logged in:', user);
                window.location.href = '/';
            } else {
                setErrorMessage('Invalid email or password');
            }
        } catch (error) {
            console.log('Error:', error);
            setErrorMessage('Error occurred while logging in');
        }
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

            {errorMessage && <div className="error-message">{errorMessage}</div>}

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
