import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import '../CSS file/CommunitySupport.css';

const CommunitySupport = () => {
    const [webinars, setWebinars] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredWebinars, setFilteredWebinars] = useState([]);

    // Fetch webinars from the Spring Boot API
    useEffect(() => {
        fetch("http://localhost:8080/api/webinars/all")
            .then((response) => response.json())
            .then((data) => {
                setWebinars(data);
                setFilteredWebinars(data); // Initialize the filtered list
            })
            .catch((error) => console.error("Error fetching webinars:", error));
    }, []);

    // Handle search input
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter webinars based on the search query
        const filtered = webinars.filter((webinar) =>
            webinar.webinarName.toLowerCase().includes(query)
        );
        setFilteredWebinars(filtered);
    };

    return (
        <div className="community-support-container">
            {/* Back to Home Button */}
            <div className="community-header">
                <Link to="/home" className="back-home-button">Back to Home</Link>
            </div>

            <div className="community-content">
                <h1>Community Support: Webinars</h1>
                <p>Explore upcoming webinars to enhance your knowledge and well-being.</p>

                {/* Search Bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Search webinars..."
                        className="search-input"
                    />
                </div>

                {/* Webinars Display */}
                {filteredWebinars.length > 0 ? (
                    <div className="webinar-grid">
                        {filteredWebinars.map((webinar) => (
                            <div key={webinar.id} className="webinar-card">
                                <h3>{webinar.webinarName}</h3>
                                <p><strong>Presenter:</strong> {webinar.presenterName}</p>
                                <p><strong>Topic Covered:</strong> {webinar.topicCovered}</p>
                                <p><strong>Duration:</strong> {webinar.duration}</p>
                                <p><strong>Start Time:</strong> {webinar.startTime}</p>
                                <a
                                    href={webinar.webinarLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="webinar-link"
                                >
                                    Join Webinar
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No webinars found. Try a different search term!</p>
                )}
            </div>
        </div>
    );
};

export default CommunitySupport;
