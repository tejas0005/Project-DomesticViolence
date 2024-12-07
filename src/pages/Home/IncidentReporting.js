import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../CSS file/IncidentReporting.css';
import {FaHome } from 'react-icons/fa';

const IncidentReporting = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactInformation: '',
        location: '',
        description: '',
        dateOfIncident: '',
        incidentLocation: '',
        typeOfAbuse: '',
        relationToVictim: '',
        perpetratorDetails: '',
        preferredSupportType: '',
        urgencyLevel: '',
    });

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleGoHome = () => {
        navigate('/home');  // Navigate to the home page
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/case-reports/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (response.ok) {
                alert('Incident report submitted successfully.');
                setFormData({
                    name: '',
                    contactInformation: '',
                    location: '',
                    description: '',
                    dateOfIncident: '',
                    incidentLocation: '',
                    typeOfAbuse: '',
                    relationToVictim: '',
                    perpetratorDetails: '',
                    preferredSupportType: '',
                    urgencyLevel: '',
                });
                navigate('/home'); // Redirect to the home page after successful submission
            } else {
                alert('Failed to submit the report.');
            }
        } catch (error) {
            console.error('Error submitting the incident report:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="incident-report-container">
            <h1 className="incident-report-title">Report an Incident</h1>
            <div className="back-home-container">
                <button onClick={handleGoHome} className="back-home-button">
                    <FaHome size={20} /> Back to Home
                </button>
            </div>
            <form className="incident-report-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactInformation">Contact Information</label>
                        <input
                            type="text"
                            id="contactInformation"
                            name="contactInformation"
                            value={formData.contactInformation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Your Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="description">Incident Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfIncident">Date of Incident</label>
                        <input
                            type="date"
                            id="dateOfIncident"
                            name="dateOfIncident"
                            value={formData.dateOfIncident}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="incidentLocation">Incident Location</label>
                        <input
                            type="text"
                            id="incidentLocation"
                            name="incidentLocation"
                            value={formData.incidentLocation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="typeOfAbuse">Type of Abuse</label>
                        <input
                            type="text"
                            id="typeOfAbuse"
                            name="typeOfAbuse"
                            value={formData.typeOfAbuse}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="relationToVictim">Relation to Victim</label>
                        <input
                            type="text"
                            id="relationToVictim"
                            name="relationToVictim"
                            value={formData.relationToVictim}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="perpetratorDetails">Perpetrator Details</label>
                        <textarea
                            id="perpetratorDetails"
                            name="perpetratorDetails"
                            value={formData.perpetratorDetails}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                </div>
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="preferredSupportType">Preferred Support Type</label>
                        <input
                            type="text"
                            id="preferredSupportType"
                            name="preferredSupportType"
                            value={formData.preferredSupportType}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="urgencyLevel">Urgency Level</label>
                        <select
                            id="urgencyLevel"
                            name="urgencyLevel"
                            value={formData.urgencyLevel}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select one</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="submit-btn">Submit Report</button>
            </form>
        </div>
    );
};

export default IncidentReporting;
