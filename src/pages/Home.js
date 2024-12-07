import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { FaBook, FaFileAlt, FaHandsHelping, FaHeartbeat, FaUsers, FaComments, FaHome,FaDonate } from 'react-icons/fa';
import './CSS file/Home.css'; 

const Home = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        setUserName(storedUsername || 'User');
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="home-container">
            <div className="home-header">
                <h2>Welcome, {userName}!</h2>
                <button className="logout-button" onClick={handleLogout}>
                    <IoIosLogOut size={20} /> Logout
                </button>
            </div>

            <div className="home-content">
                <h1>User Dashboard</h1>
                <p>Select an option below to explore resources and support services.</p>

                <div className="feature-grid">
                    <Link to="/resource-center" className="feature-card">
                        <FaBook size={50} />
                        <h3>Resource Center</h3>
                        <p>Explore educational articles, support services, and guides.</p>
                    </Link>

                    <Link to="/incident-reporting" className="feature-card">
                        <FaFileAlt size={50} />
                        <h3>Incident Reporting</h3>
                        <p>Quickly report incidents or schedule detailed reports.</p>
                    </Link>

                    <Link to="/seek-help" className="feature-card">
                        <FaHandsHelping size={50} />
                        <h3>Seek Help</h3>
                        <p>Book sessions, chat with counselors, or join support groups.</p>
                    </Link>

                    <Link to="/seek-shelter" className="feature-card">
                        <FaHome size={50} />
                        <h3>Seek Shelter</h3>
                        <p>Find safe shelters near you in an emergency.</p>
                    </Link>

                    <Link to="/legal-resources" className="feature-card">
                        <FaUsers size={50} />
                        <h3>Legal Resources</h3>
                        <p>Access FAQs, document templates, and legal advisor contacts.</p>
                    </Link>

                    <Link to="/health-wellbeing" className="feature-card">
                        <FaHeartbeat size={50} />
                        <h3>Health & Well-being</h3>
                        <p>Take mental health assessments and explore self-care tips.</p>
                    </Link>

                    <Link to="/community-support" className="feature-card">
                        <FaComments size={50} />
                        <h3>Community Support</h3>
                        <p>Join support groups, workshops, and webinars.</p>
                    </Link>
                    <Link to="/charity-donations" className="feature-card">
                    <FaDonate size={50} />
                        <h3>Charity & Donations</h3>
                        <p>Help Us Empower Victims of Domestic Violence – Donate Now and Make an Impact.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
