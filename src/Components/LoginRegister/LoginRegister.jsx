import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Login.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    const toggleLogin = () => {
        setShowLogin(true); 
    };

    const closeWrapper = () => {
        setShowLogin(false); 
        setAction('');       
    };
    const handleLogin = (e) => {
        e.preventDefault(); 

        navigate('/home'); 
    };


    return (
        <div className="body1">
            <header>
                <h2 className="logo">Domestic Violence</h2>
                <nav className="navigation">
                    <Link to="/about">About</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact</Link>
                    <button className="btnLogin-popup" onClick={toggleLogin}>Login</button>
                </nav>
            </header>

            
            {showLogin && (
                <div className={`wrapper${action}`}>
                    <span className="icon-close" onClick={closeWrapper}><IoClose /></span>
                    
                    <div className="form-box login"> 
                        <form onSubmit={handleLogin}>
                            <h1>Login</h1>

                            <div className="input-box">
                                <input type="text" placeholder='Username' required />
                                <FaUser className='icon' />
                            </div>

                            <div className="input-box">
                                <input type="password" placeholder='Password' required />
                                <FaLock className='icon' />
                            </div>

                            <div className="remember-forgot">
                                <label><input type="checkbox" />Remember me</label>
                                <a href="#">Forget Password?</a>
                            </div>

                            <button type="submit">Login</button>

                            <div className="register-link">
                                <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
                            </div>
                        </form>
                    </div>

                    <div className="form-box register"> 
                        <form action="" onSubmit={(e) =>{ e.preventDefault();loginLink();}}>
                            <h1>Registration</h1>

                            <div className="input-box">
                                <input type="text" placeholder='Username' required />
                                <FaUser className='icon' />
                            </div>

                            <div className="input-box">
                                <input type="email" placeholder='Email' required />
                                <FaEnvelope className='icon' />
                            </div>

                            <div className="input-box">
                                <input type="password" placeholder='Password' required />
                                <FaLock className='icon' />
                            </div>

                            <div className="remember-forgot">
                                <label><input type="checkbox" />I agree to the terms & conditions</label>
                            </div>

                            <button type="submit">Register</button>

                            <div className="register-link">
                                <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginRegister;
