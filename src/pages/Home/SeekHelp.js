import React, { useState, useEffect } from 'react';
import { FaHandsHelping, FaCalendarAlt, FaInfoCircle, FaPhoneAlt, FaSearch, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import '../CSS file/SeekHelp.css'; // Assume you will have the associated CSS file for styles

const SeekHelp = () => {
    const [supportSessions, setSupportSessions] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query
    const [filteredSessions, setFilteredSessions] = useState([]); // State to hold filtered sessions

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch support sessions from the backend
        fetch('/api/support-sessions/all')
            .then(response => response.json())
            .then(data => {
                setSupportSessions(data);
                setFilteredSessions(data); // Initially set all sessions to be available
            })
            .catch(error => console.error('Error fetching sessions:', error));
    }, []);

    useEffect(() => {
        // Filter the sessions based on the search query
        if (searchQuery) {
            setFilteredSessions(
                supportSessions.filter(session =>
                    session.sessionTitle.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        } else {
            setFilteredSessions(supportSessions); // Show all sessions if search query is empty
        }
    }, [searchQuery, supportSessions]); // Re-run the filter when searchQuery or supportSessions change

    const handleBookSession = (sessionId) => {
        alert(`Session with ID ${sessionId} booked successfully!`);
        // You can add logic here to book the session (e.g., API call to create a booking)
    };

    const handleGoHome = () => {
        navigate('/home');  // Navigate to the home page
    };

    return (
        <div className="seek-help-container">
            <div className="seek-help-header">
                <h2><FaHandsHelping /> Seek Help</h2>
                <p>Explore available support sessions and book one that fits your needs.</p>
            </div>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by session title"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <FaSearch size={20} className="search-icon" />
            </div>

            {/* Back to Home Button */}
            <div className="back-home-container">
                <button onClick={handleGoHome} className="back-home-button">
                    <FaHome size={20} /> Back to Home
                </button>
            </div>

            <div className="sessions-list">
                <div className="sessions-grid">
                    {filteredSessions.map(session => (
                        <div key={session.id} className="session-card">
                            <div className="session-card-header">
                                <h4>{session.sessionTitle}</h4>
                                <p><FaInfoCircle /> {session.description}</p>
                            </div>
                            <div className="session-card-body">
                                <p><FaCalendarAlt /> {new Date(session.sessionTime).toLocaleString()}</p>
                                <p><FaPhoneAlt /> {session.mobileNumber}</p>
                                <p>Status: <span className={session.status === 'Available' ? 'status-available' : 'status-unavailable'}>{session.status}</span></p>
                            </div>
                            <div className="session-card-footer">
                                {session.status === 'Available' ? (
                                    <button onClick={() => handleBookSession(session.id)} className="book-button">Book Session</button>
                                ) : (
                                    <button disabled className="book-button-disabled">Not Available</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SeekHelp;
