import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaVideo } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CSS file/Counselor.css';

const Counselor = () => {
  const [username, setUsername] = useState('');
  const [caseReports, setCaseReports] = useState([]);
  const [selectedSection, setSelectedSection] = useState('case reports');
  const [loading, setLoading] = useState(false);
  const [webinars, setWebinars] = useState([]);
  const [editingWebinarId, setEditingWebinarId] = useState(null);
  const [editedWebinarData, setEditedWebinarData] = useState({});
  const [newWebinarData, setNewWebinarData] = useState({
    webinarName: '',
    presenterName: '',
    topicCovered: '',
    startTime: '',
    duration: '',
    webinarLink: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  const fetchWebinars = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://backend-production-7345.up.railway.app/api/webinars/all');
      setWebinars(response.data);
    } catch (error) {
      console.error('Error fetching webinars:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSaveWebinar = async (webinarId) => {
    try {
      await axios.put(`https://backend-production-7345.up.railway.app/api/webinars/update/${webinarId}`, editedWebinarData);
      alert('Webinar updated successfully!');
      setWebinars((prevWebinars) =>
        prevWebinars.map((webinar) =>
          webinar.id === webinarId ? { ...webinar, ...editedWebinarData } : webinar
        )
      );
      setEditingWebinarId(null);
    } catch (error) {
      console.error('Error updating webinar:', error);
      alert('Failed to update the webinar.');
    }
  };

  const handleInputChangeWebinar = (e, field, webinarId) => {
    if (editingWebinarId === webinarId) {
      setEditedWebinarData((prevData) => ({
        ...prevData,
        [field]: e.target.value
      }));
    }
  };

  const handleDeleteWebinar = async (webinarId) => {
    if (window.confirm('Are you sure you want to delete this webinar?')) {
      try {
        await axios.delete(`https://backend-production-7345.up.railway.app/api/webinars/delete/${webinarId}`);
        alert('Webinar deleted successfully!');
        setWebinars((prevWebinars) =>
          prevWebinars.filter((webinar) => webinar.id !== webinarId)
        );
      } catch (error) {
        console.error('Error deleting webinar:', error);
        alert('Failed to delete the webinar.');
      }
    }
  };

  const handleEditWebinarClick = (webinar) => {
    setEditingWebinarId(webinar.id);
    setEditedWebinarData({ ...webinar });
  };

  const handleCancelEditWebinar = () => {
    setEditingWebinarId(null);
    setEditedWebinarData({});
  };

  const handleAddWebinarChange = (e, field) => {
    setNewWebinarData((prevData) => ({
      ...prevData,
      [field]: e.target.value
    }));
  };

  const handleAddWebinar = async () => {
    try {
      const response = await axios.post('https://backend-production-7345.up.railway.app/api/webinars/add', newWebinarData);
      alert('Webinar added successfully!');
      setWebinars((prevWebinars) => [...prevWebinars, response.data]);
      setNewWebinarData({
        webinarName: '',
        presenterName: '',
        topicCovered: '',
        startTime: '',
        duration: '',
        webinarLink: ''
      });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding webinar:', error);
      alert('Failed to add the webinar.');
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const fetchCaseReports = async () => {
      try {
        const response = await axios.get('https://backend-production-7345.up.railway.app/api/case-reports/all');
        const filteredReports = response.data.filter(
          (report) => report.preferredSupportType === 'Counselor'
        );
        setCaseReports(filteredReports);
      } catch (error) {
        console.error('Error fetching case reports', error);
      }
    };

    if (selectedSection === 'case reports') {
      fetchCaseReports();
    }
  }, [selectedSection]);

  useEffect(() => {
    fetchWebinars();
  }, [fetchWebinars]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleDeleteCaseReport = async (id) => {
    try {
      await axios.delete(`https://backend-production-7345.up.railway.app/api/case-reports/${id}`);
      setCaseReports(caseReports.filter((report) => report.id !== id));
    } catch (error) {
      console.error('Error deleting case report', error);
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>COUNSELOR DASHBOARD</h2>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="#" onClick={() => handleSectionClick('case reports')}>
                <FaFileAlt /> Case Reports
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => handleSectionClick('webinar')}>
                <FaVideo /> Webinar
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="admin-content">
        <div className="header">
          <span className="welcome-message">Welcome, Counselor {username}!</span>
          <button className="logout-button" onClick={handleLogout}>
            <IoIosLogOut size={20} /> Logout
          </button>
        </div>
        <div className="admin-dashboard">
          {selectedSection === 'case reports' && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Incident Description</th>
                  <th>Date of Incident</th>
                  <th>Type of Abuse</th>
                  <th>Perpetrator Relation</th>
                  <th>Support Needed</th>
                  <th>Urgency Level</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {caseReports.length === 0 ? (
                  <tr>
                    <td colSpan="10">No case reports available</td>
                  </tr>
                ) : (
                  caseReports.map((report) => (
                    <tr key={report.id}>
                      <td>{report.name}</td>
                      <td>{report.contactInformation}</td>
                      <td>{report.location}</td>
                      <td>{report.description}</td>
                      <td>{report.dateOfIncident}</td>
                      <td>{report.typeOfAbuse}</td>
                      <td>{report.perpetratorDetails}</td>
                      <td>{report.preferredSupportType}</td>
                      <td>{report.urgencyLevel}</td>
                      <td>
                        <button onClick={() => handleDeleteCaseReport(report.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
          {selectedSection === 'webinar' && (
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Presenter</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {webinars.length === 0 ? (
                    <tr>
                      <td colSpan="7">No webinars available</td>
                    </tr>
                  ) : (
                    webinars.map((webinar) => (
                      <tr key={webinar.id}>
                        <td>
                          {editingWebinarId === webinar.id ? (
                            <input
                              type="text"
                              value={editedWebinarData.webinarName || ''}
                              onChange={(e) =>
                                handleInputChangeWebinar(e, 'webinarName', webinar.id)
                              }
                            />
                          ) : (
                            webinar.webinarName
                          )}
                        </td>
                        <td>
                          {editingWebinarId === webinar.id ? (
                            <input
                              type="text"
                              value={editedWebinarData.presenterName || ''}
                              onChange={(e) =>
                                handleInputChangeWebinar(e, 'presenterName', webinar.id)
                              }
                            />
                          ) : (
                            webinar.presenterName
                          )}
                        </td>
                        <td>
                          {editingWebinarId === webinar.id ? (
                            <input
                              type="text"
                              value={editedWebinarData.topicCovered || ''}
                              onChange={(e) =>
                                handleInputChangeWebinar(e, 'topicCovered', webinar.id)
                              }
                            />
                          ) : (
                            webinar.topicCovered
                          )}
                        </td>
                        <td>
                          {editingWebinarId === webinar.id ? (
                            <input
                              type="text"
                              value={editedWebinarData.startTime || ''}
                              onChange={(e) =>
                                handleInputChangeWebinar(e, 'startTime', webinar.id)
                              }
                            />
                          ) : (
                            webinar.startTime
                          )}
                        </td>
                        <td>
                          {editingWebinarId === webinar.id ? (
                            <input
                              type="text"
                              value={editedWebinarData.duration || ''}
                              onChange={(e) =>
                                handleInputChangeWebinar(e, 'duration', webinar.id)
                              }
                            />
                          ) : (
                            webinar.duration
                          )}
                        </td>
                        <td>
                          {editingWebinarId === webinar.id ? (
                            <input
                              type="text"
                              value={editedWebinarData.webinarLink || ''}
                              onChange={(e) =>
                                handleInputChangeWebinar(e, 'webinarLink', webinar.id)
                              }
                            />
                          ) : (
                            <a href={webinar.webinarLink} target="_blank" rel="noopener noreferrer">
                              View
                            </a>
                          )}
                        </td>
                        <td>
                          {editingWebinarId === webinar.id ? (
                            <>
                              <button onClick={() => handleSaveWebinar(webinar.id)}>Save</button>
                              <button onClick={handleCancelEditWebinar}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => handleEditWebinarClick(webinar)}>Edit</button>
                              <button onClick={() => handleDeleteWebinar(webinar.id)}>Delete</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <button
                style={{
                  margin: '10px 0',
                  padding: '5px 10px',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
                onClick={() => setShowAddForm(!showAddForm)}
              >
                Add Webinar
              </button>
              {showAddForm && (
                <div style={{ margin: '20px 0' }}>
                  <h4>Add New Webinar</h4>
                  <div style={{ marginBottom: '15px' }}>
                    <input
                      type="text"
                      placeholder="Webinar Name"
                      value={newWebinarData.webinarName}
                      onChange={(e) => handleAddWebinarChange(e, 'webinarName')}
                      style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <input
                      type="text"
                      placeholder="Presenter Name"
                      value={newWebinarData.presenterName}
                      onChange={(e) => handleAddWebinarChange(e, 'presenterName')}
                      style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <textarea
                      placeholder="Description"
                      value={newWebinarData.topicCovered}
                      onChange={(e) => handleAddWebinarChange(e, 'topicCovered')}
                      style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        height: '80px',
                        resize: 'vertical',
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <input
                      type="text"
                      placeholder="Date & Time"
                      value={newWebinarData.startTime}
                      onChange={(e) => handleAddWebinarChange(e, 'startTime')}
                      style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <input
                      type="text"
                      placeholder="Duration"
                      value={newWebinarData.duration}
                      onChange={(e) => handleAddWebinarChange(e, 'duration')}
                      style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <input
                      type="text"
                      placeholder="Webinar Link"
                      value={newWebinarData.webinarLink}
                      onChange={(e) => handleAddWebinarChange(e, 'webinarLink')}
                      style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                      }}
                    />
                  </div>
                  <button
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '10px',
                      fontSize: '14px',
                    }}
                    onClick={handleAddWebinar}
                  >
                    Save
                  </button>
                  <button
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Counselor;

