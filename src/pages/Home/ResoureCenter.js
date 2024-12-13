import React, { useState, useEffect } from 'react';
import '../CSS file/ResourceCenter.css';
import { FaSearch, FaHome  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ResourceCenter = () => {
    const [resources, setResources] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleGoHome = () => {
        navigate('/home');  // Navigate to the home page
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const articlesResponse = await fetch('https://backend-production-7345.up.railway.app/api/articles/all');
                const ebooksResponse = await fetch('https://backend-production-7345.up.railway.app/api/ebooks/all');
                const articles = await articlesResponse.json();
                const ebooks = await ebooksResponse.json();

                // Combine articles and eBooks into a single array
                const combinedResources = [
                    ...articles.map((article) => ({ ...article, type: 'Article' })),
                    ...ebooks.map((ebook) => ({ ...ebook, type: 'eBook' })),
                ];
                setResources(combinedResources);
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };

        fetchResources();
    }, []);

    const filteredResources = resources.filter(
        (resource) => resource.title && resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="resource-center-container">
            <h1 className="resource-center-title">Resource Center</h1>
            <div className="back-home-container">
                <button onClick={handleGoHome} className="back-home-button">
                    <FaHome size={20} /> Back to Home
                </button>
            </div>
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search articles or books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="resource-grid">
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                        <div key={resource.id} className="resource-card">
                            <img
                               src={resource.image ? require(`${resource.image}`) : require('./images/books.jpeg')}
                                alt={resource.title}
                                className="resource-image"
                            />
                            <h3 className="resource-title">{resource.title}</h3>
                            <p className="resource-description">{resource.description}</p>
                            <a 
                                href={resource.type === 'eBook' ? resource.downloadLink : resource.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="resource-link"
                            >
                                Download
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No resources found for "{searchQuery}"</p>
                )}
            </div>
        </div>
    );
};

export default ResourceCenter;
