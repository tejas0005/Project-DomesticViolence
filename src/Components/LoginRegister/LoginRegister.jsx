import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Store error messages
    const navigate = useNavigate();

    const registerLink = () => setAction(' active');
    const loginLink = () => setAction('');
    const toggleLogin = () => setShowLogin(true);
    const closeWrapper = () => {
        setShowLogin(false);
        setAction('');
        setErrorMessage(''); // Clear the error message when closing the form
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ username, password }),
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('userRole', user.role);
                localStorage.setItem('username', user.username);

                // Navigate based on user role
                if (user.role === 'ADMIN') navigate('/admin');
                else if (user.role === 'LEGAL ADVISOR') navigate('/legaladvisor');
                else if (user.role === 'COUNSELOR') navigate('/counselor');
                else navigate('/home');
            } else if (response.status === 401) {
                alert('Invalid username or password');
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Invalid username or password');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email }),
            });

            const result = await response.text();
            if (result === 'Registration successful!') {
                alert(result);
                loginLink(); // Switch to login form after successful registration
            } else {
                setErrorMessage(result);
            }
        } catch (error) {
            setErrorMessage('Error registering. Please try again.');
        }
    };

    return (
        <div className="body1">
            <header>
                <h2 className="logo">Domestic Violence</h2>
                <nav className="navigation">
                    <Link to="/about">About</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact</Link>
                    <button className="btnLogin-popup" onClick={toggleLogin}>
                        Login
                    </button>
                </nav>
            </header>

            <div className="main-container">
                {/* About Section */}
                <div className="about-section">
                    <h2>About Our Website</h2>
                    <p>
                        Our platform is dedicated to combating domestic violence by providing comprehensive support and resources. 
                        Users can access legal rights, support services, and information to ensure safety and well-being.
                    </p>
                    <h3>Core Features:</h3>
                    <ul>
                        <li><strong>Resource Center:</strong> Explore legal, health, and community support resources.</li>
                        <li><strong>Incident Reporting:</strong> Report incidents confidentially and seek immediate help.</li>
                        <li><strong>Seek Shelter:</strong> Locate safe shelters for victims of abuse.</li>
                        <li><strong>Charity & Donations:</strong> Support and contribute to the cause.</li>
                    </ul>
                    <p>
                        For more details, visit the <Link to="/services">Services</Link> option above.
                    </p>
                </div>

                {showLogin && (
                    <div className={`wrapper${action}`}>
                        <span className="icon-close" onClick={closeWrapper}>
                            <IoClose />
                        </span>

                        {/* Login Form */}
                        <div className="form-box login">
                            <form onSubmit={handleLogin}>
                                <h1>Login</h1>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    <FaUser className="icon" />
                                </div>

                                <div className="input-box">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <FaLock className="icon" />
                                </div>

                                {errorMessage && <p className="error">{errorMessage}</p>}

                                <div className="remember-forgot">
                                    <label>
                                        <input type="checkbox" /> Remember me
                                    </label>
                                    <a href="#">Forget Password?</a>
                                </div>

                                <button type="submit">Login</button>

                                <div className="register-link">
                                    <p>
                                        Don't have an account?{' '}
                                        <a href="#" onClick={registerLink}>
                                            Register
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>

                        {/* Registration Form */}
                        <div className="form-box register">
                            <form onSubmit={handleRegister}>
                                <h1>Registration</h1>
                                <div className="input-box">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    <FaUser className="icon" />
                                </div>

                                <div className="input-box">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <FaEnvelope className="icon" />
                                </div>

                                <div className="input-box">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <FaLock className="icon" />
                                </div>

                                {errorMessage && <p className="error">{errorMessage}</p>}

                                <div className="remember-forgot">
                                    <label>
                                        <input type="checkbox" /> I agree to the terms & conditions
                                    </label>
                                </div>

                                <button type="submit">Register</button>

                                <div className="register-link">
                                    <p>
                                        Already have an account?{' '}
                                        <a href="#" onClick={loginLink}>
                                            Login
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginRegister;
