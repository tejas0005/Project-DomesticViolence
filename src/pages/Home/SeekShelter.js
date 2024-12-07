import React, { useState, useEffect } from 'react';
import { FaSearch, FaPhoneAlt, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../CSS file/SeekShelter.css'; // Make sure this file is correctly referenced

const SeekShelter = () => {
    const [shelters, setShelters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredShelters, setFilteredShelters] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch shelters from the backend
        fetch('/api/shelters/all')
            .then(response => response.json())
            .then(data => {
                setShelters(data);
                setFilteredShelters(data);
            })
            .catch(error => console.error('Error fetching shelters:', error));
    }, []);

    useEffect(() => {
        // Filter shelters based on the district (search query)
        if (searchQuery) {
            setFilteredShelters(
                shelters.filter(shelter =>
                    shelter.location.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredShelters(shelters); 
        }
    }, [searchQuery, shelters]);

    return (
        <div className="seek-shelter-container">
            <div className="seek-shelter-header">
                <h2><FaHome /> Seek Shelter</h2>
                <div className="back-home-container">
                    <button onClick={() => navigate('/home')} className="back-home-button">
                        Go Back to Home
                    </button>
                </div>
                <p>Find safe shelters in your district during emergencies.</p>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by district"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <FaSearch size={20} className="search-icon" />
                </div>
            </div>

            <div className="shelters-list">
                {filteredShelters.length > 0 ? (
                    <div className="shelters-grid">
                        {filteredShelters.map(shelter => (
                            <div key={shelter.id} className="shelter-card">
                                <div className="shelter-image">
                                    <img
                                        src={
                                            shelter.image
                                                ? require(`${shelter.image}`)
                                                : require('./images/shelter.jpg')
                                        }
                                        alt={`${shelter.shelterName}`}
                                        className="shelter-img"
                                    />
                                </div>
                                <div className="shelter-card-header">
                                    <h4>{shelter.shelterName}</h4>
                                    <p><FaMapMarkerAlt /> {shelter.location}</p>
                                </div>
                                <div className="shelter-card-body">
                                    <p><strong>Owner:</strong> {shelter.owner}</p>
                                    <p><FaPhoneAlt /> {shelter.phoneNumber}</p>
                                    <p><strong>Address:</strong> {shelter.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-results">No shelters found for the specified district.</p>
                )}
            </div>
        </div>
    );
};

export default SeekShelter;
