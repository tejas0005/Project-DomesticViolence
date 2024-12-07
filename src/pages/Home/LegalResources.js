import React, { useState, useEffect } from 'react';
import { FaSearch, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGavel, FaHome } from 'react-icons/fa';
import '../CSS file/LegalResources.css';
import { useNavigate } from 'react-router-dom';

const LegalResources = () => {
    const [helplines, setHelplines] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHelplines, setFilteredHelplines] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/helplines/all')
            .then(response => response.json())
            .then(data => {
                setHelplines(data);
                setFilteredHelplines(data);
            })
            .catch(error => console.error('Error fetching helplines:', error));
    }, []);

    useEffect(() => {
        if (searchQuery) {
            setFilteredHelplines(
                helplines.filter(helpline =>
                    helpline.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredHelplines(helplines); 
        }
    }, [searchQuery, helplines]);

    const handleGoHome = () => {
        navigate('/home');  
    };

    return (
        <div className="legal-resources-container">
            <div className="header">
                <h2><FaGavel /> Legal Resources</h2>
                <div className="back-home-container">
                    <button onClick={handleGoHome} className="back-home-button">
                        <FaHome size={20} /> Back to Home
                    </button>
                </div>
                <p>Find legal assistance and helplines by name.</p>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search helpline by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <FaSearch size={20} className="search-icon" />
                </div>
            </div>

            <div className="helplines-list">
                {filteredHelplines.length > 0 ? (
                    <div className="helplines-grid">
                        {filteredHelplines.map(helpline => (
                            <div key={helpline.id} className="helpline-card">
                                <div className="helpline-card-header">
                                    <h4>{helpline.name}</h4>
                                    <p><FaMapMarkerAlt /> {helpline.role}</p>
                                </div>
                                <div className="helpline-card-body">
                                    <p><FaPhoneAlt /> {helpline.phoneNumber}</p>
                                    <p><FaEnvelope /> contact@legalhelpline.com</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-results">No helplines found for the specified query.</p>
                )}
            </div>
        </div>
    );
};

export default LegalResources;
