import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS file/HealthWellbeing.css";

const HealthWellbeing = () => {
  const [healthBooks, setHealthBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Fetch health books from the Spring Boot API
  useEffect(() => {
    fetch("http://localhost:8080/api/healthbooks/all")
      .then((response) => response.json())
      .then((data) => {
        setHealthBooks(data);
        setFilteredBooks(data); // Initialize the filtered list
      })
      .catch((error) => console.error("Error fetching health books:", error));
  }, []);

  // Handle search input
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter books based on the search query
    const filtered = healthBooks.filter((book) =>
      book.name.toLowerCase().includes(query)
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="health-container">
      {/* Back to Home Button */}
      <div className="health-header">
        <Link to="/home" className="back-home-button">
          Back to Home
        </Link>
      </div>

      <div className="health-content">
        <h1>Health and Well-being</h1>
        <p>Explore a curated collection of health and self-care resources.</p>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by book name..."
            className="search-input"
          />
        </div>

        {/* Health Books Display */}
        {filteredBooks.length > 0 ? (
          <div className="book-grid">
            {filteredBooks.map((book) => (
              <div key={book.id} className="book-card">
                <img
                  src={book.image ? book.image : require('./images/health.jpg')}
                  alt={book.name}
                  className="book-image"
                />
                <h3>{book.name}</h3>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>{book.description}</p>
                <a
                  href={book.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-link"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No books found. Try a different search term!</p>
        )}
      </div>
    </div>
  );
};

export default HealthWellbeing;
