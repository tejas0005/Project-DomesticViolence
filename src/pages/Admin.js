import React, { useEffect, useState, useCallback } from "react";
import { IoIosLogOut, IoIosDocument,IoMdHeart } from "react-icons/io";
import { FaUsers, FaRegUser, FaBalanceScale, FaCommentAlt, FaTools, FaFileAlt,FaDonate } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./CSS file/Admin.css";

const Admin = () => {
  const [adminName, setAdminName] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});
  const [userinfo, setUserinfo] = useState([]);
  const [caseReports, setCaseReports] = useState([]); // New state for case reports
  const [feedbacks, setFeedbacks] = useState([]); // for feedback
  const [selectedSection, setSelectedSection] = useState(""); // Default to no section

  const [editingResourceId, setEditingResourceId] = useState(null);
  const [editedResourceData, setEditedResourceData] = useState({});
  const [resources, setResources] = useState([]);
  const [selectedResourceType, setSelectedResourceType] = useState(""); 
  const [newResourceData, setNewResourceData] = useState({
    title: "",
    author: "",
    description: "",
    downloadLink:"",
    shelterName: "",
    owner: "",
    phoneNumber: "",
    location: "",
    address: "",
    name: "",
    role: "",
  });
  const [addingNewResource, setAddingNewResource] = useState(false);


  const [healthBooks, setHealthBooks] = useState([]);
const [editingHealthBookId, setEditingHealthBookId] = useState(null);
const [editedHealthData, setEditedHealthData] = useState({
  name: "",
  author: "",
  description: "",
  downloadLink: "",
});
const [addingNewHealth, setAddingNewHealth] = useState(false);


const [payments, setPayments] = useState([]);

// Fetch payments from the backend
// const fetchPayments = async () => {
//     try {
//         const response = await axios.get("/api/payments/all"); // Replace with your actual endpoint
//         setPayments(response.data);
//     } catch (error) {
//         console.error("Error fetching payments:", error);
//     }
// };

const fetchPayments = useCallback(async () => {
  setLoading(true);
  try {
    const response = await axios.get("/api/payments/all"); // Replace with your correct endpoint
    setPayments(response.data);
  } catch (error) {
    console.error("Error fetching payments:", error);
  } finally {
    setLoading(false);
  }
}, []);




// Fetch Health Books
const fetchHealthBooks = useCallback(async () => {
  setLoading(true);
  try {
    const response = await axios.get("/api/healthbooks/all"); // Replace with your correct endpoint
    setHealthBooks(response.data);
  } catch (error) {
    console.error("Error fetching health books:", error);
  } finally {
    setLoading(false);
  }
}, []);

// Handle Save Health Book
const handleSaveHealthBook = async (healthBookId) => {
  console.log("Edited Health Data:", editedHealthData); // Log the data you're sending
  try {
    const response = await axios.put(`/api/healthbooks/update/${healthBookId}`, editedHealthData);

    console.log("Response from backend:", response);  // Log response from backend
    
    alert("Health Book updated successfully!");

    setHealthBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === healthBookId ? { ...book, ...editedHealthData } : book
      )
    );

    setEditingHealthBookId(null);
  } catch (error) {
    console.error("Error updating health book:", error);
    alert(`Failed to update the health book: ${error.response ? error.response.data : error.message}`);
  }
};


// Handle Input Change for Health Book
const handleInputChangeHealth = (e, field) => {
  setEditedHealthData((prevData) => ({
    ...prevData,
    [field]: e.target.value, // Update the specific field in the state
  }));
};

// Handle Delete Health Book
const handleDeleteHealthBook = async (healthBookId) => {
  console.log("Deleting Health Book with ID:", healthBookId);  // Log the ID being deleted
  if (window.confirm("Are you sure you want to delete this health book?")) {
    try {
      const response = await axios.delete(`/api/healthbooks/delete/${healthBookId}`);

      console.log("Delete response:", response);  // Log the delete response

      alert("Health Book deleted successfully!");

      setHealthBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== healthBookId)
      );
    } catch (error) {
      console.error("Error deleting health book:", error);
      alert("Failed to delete the health book.");
    }
  }
};


// Handle Add Health Book
const handleAddHealthClick = () => {
  setAddingNewHealth(true);
  setEditedHealthData({
    name: "", // Reset each field
    author: "",
    description: "",
    downloadLink: "",
  });
};

// Handle Cancel Add Health Book
const handleCancelAddHealthBook = () => {
  setAddingNewHealth(false); // Hide the form when canceling
};

// Handle Add New Health Book
const handleAddNewHealthBook = async () => {
  if (!editedHealthData.name || !editedHealthData.author || !editedHealthData.description || !editedHealthData.downloadLink) {
    alert("All fields must be filled!");
    return;
  }

  try {
    // Send new health book data to the backend
    const response = await axios.post("/api/healthbooks/add", editedHealthData);

    // Display success message
    alert("Health Book added successfully!");

    // Update the state to include the new health book
    setHealthBooks((prevBooks) => [
      ...prevBooks,
      response.data, // Assuming response contains the added health book
    ]);

    // Reset form state and hide the add form
    setAddingNewHealth(false);
  } catch (error) {
    console.error("Error adding health book:", error);
    alert("Failed to add the health book.");
  }
};



  const [articlesAndGuides, setArticlesAndGuides] = useState([]);
  const [editingArticleId, setEditingArticleId] = useState(null);
  const [editedArticleData, setEditedArticleData] = useState({
    title: "",
    description: "",
    link: "",
    author: "",
  });
  const [addingNewArticle, setAddingNewArticle] = useState(false);

  // Fetch Articles and Guides
  const fetchArticlesAndGuides = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/articles/all"); // Replace with your correct endpoint
      setArticlesAndGuides(response.data);
    } catch (error) {
      console.error("Error fetching articles and guides:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSaveArticle = async (articleId) => {
    try {
      // Send updated data to the backend
      await axios.put(`/api/articles/update/${articleId}`, editedArticleData);
      
      // Display success message
      alert("Article/Guide updated successfully!");
  
      // Update the state with the edited data locally
      setArticlesAndGuides((prevArticles) =>
        prevArticles.map((article) =>
          article.id === articleId ? { ...article, ...editedArticleData } : article
        )
      );
  
      // Exit edit mode
      setEditingArticleId(null);
    } catch (error) {
      console.error("Error updating article/guide:", error);
      alert("Failed to update the article/guide.");
    }
  };
  
  const handleInputChangeArticle = (e, field) => {
    setEditedArticleData((prevData) => ({
      ...prevData,
      [field]: e.target.value, // Update the specific field in the state
    }));
  };

  const handleDeleteArticle = async (articleId) => {
    if (window.confirm("Are you sure you want to delete this article/guide?")) {
      try {
        // Sending delete request to the server
        await axios.delete(`/api/articles/delete/${articleId}`);
        
        // Display success message
        alert("Article/Guide deleted successfully!");
  
        // Update the state locally to remove the deleted article from the UI
        setArticlesAndGuides((prevArticles) =>
          prevArticles.filter((article) => article.id !== articleId)
        );
      } catch (error) {
        console.error("Error deleting article/guide:", error);
        alert("Failed to delete the article/guide.");
      }
    }
  };
  
  const handleAddArticleClick = () => {
    setAddingNewArticle(true);
    setEditedArticleData({
      title: "",        // Reset each field
      author: "",
      description: "",
      link: ""
    });
  };

  const handleCancelAddArticle = () => {
    setAddingNewArticle(false);  // Hide the form when canceling
  };
  
  const handleAddNewArticle = async () => {
    if (!editedArticleData.name || !editedArticleData.author || !editedArticleData.description || !editedArticleData.link) {
      alert("All fields must be filled!");
      return;
    }
  
    try {
      // Send new article data to the backend
      const response = await axios.post("/api/articles/add", editedArticleData);
  
      // Display success message
      alert("Article/Guide added successfully!");
  
      // Update the state to include the new article
      setArticlesAndGuides((prevArticles) => [
        ...prevArticles,
        response.data, // Assuming response contains the added article
      ]);
  
      // Reset form state and hide the add form
      setAddingNewArticle(false);
    } catch (error) {
      console.error("Error adding article/guide:", error);
      alert("Failed to add the article/guide.");
    }
  };

//fetch resource 
  const fetchResources = useCallback(async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/${type}`); // Endpoint for specific resource type
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddResourceClick = () => {
    setAddingNewResource(!addingNewResource); // Toggle visibility
  };
  

  

  const handleResourceSelect = async (resourceType) => {
    setSelectedResourceType(resourceType);
    try {
        let response;
        switch (resourceType) {
            case 'ebooks':
                response = await axios.get('/api/ebooks/all');
                break;
            case 'shelters':
                response = await axios.get('/api/shelters/all');
                break;
            case 'helplines':
                response = await axios.get('/api/helplines/all');
                break;
            default:
                break;
        }
        setResources(response.data); // Setting resources to the state
    } catch (error) {
        console.error('Error fetching resources:', error);
    }
};

const handleInputChangeResource = (e, fieldName) => {
  const value = e.target.value;
  setEditedResourceData((prevData) => ({
    ...prevData,
    [fieldName]: value,  // Update the specific field being edited
  }));
};

const handleInputChangeNewResource = (e, fieldName) => {
  const value = e.target.value;
  setNewResourceData((prevData) => ({
    ...prevData,
    [fieldName]: value, // Update the specific field being added
  }));
};



  // const handleSaveResource = async () => {
  //   try {
  //     await axios.post(`/api/${selectedResourceType}`, editedResourceData);
  //     alert(`${selectedResourceType} added successfully!`);
  //     setEditedResourceData({});
  //     fetchResources(selectedResourceType); // Re-fetch resources after saving
  //   } catch (error) {
  //     console.error(`Error adding ${selectedResourceType}:`, error);
  //     alert("Failed to add resource.");
  //   }
  // };

  const handleDeleteResource = async (resourceId) => {
    if (window.confirm(`Are you sure you want to delete this resource?`)) {
      try {
        // First, delete the resource from the backend
        await axios.delete(`/api/${selectedResourceType}/${resourceId}`);
        
        // Remove the resource from the local state immediately
        setResources((prevResources) => 
          prevResources.filter((resource) => resource.id !== resourceId)
        );
  
        alert(`${selectedResourceType} deleted successfully!`);
        
        // Optionally, refetch the resources in case there are updates on the backend
        fetchResources(selectedResourceType);  // This step can be skipped if local state is sufficient
      } catch (error) {
        console.error(`Error deleting ${selectedResourceType}:`, error);
        alert("Failed to delete resource.");
      }
    }
  };
  

  const handleEditResource = (resource) => {
    setEditingResourceId(resource.id);
    
    // Dynamically set the edited data based on resource type
    if (selectedResourceType === "ebooks") {
        setEditedResourceData({
            title: resource.title,
            author: resource.author,
            description: resource.description,
            downloadLink: resource.downloadLink,
        });
    } else if (selectedResourceType === "shelters") {
        setEditedResourceData({
            shelterName: resource.shelterName,
            owner: resource.owner,
            phoneNumber: resource.phoneNumber,
            location: resource.location,
            address: resource.address,
        });
    } else if (selectedResourceType === "helplines") {
        setEditedResourceData({
            name: resource.name,
            role: resource.role,
            phoneNumber: resource.phoneNumber,
        });
    }
};

const handleSaveEditedResource = async () => {
  try {
    // Update the resource locally first
    const updatedResource = { ...resources.find(r => r.id === editingResourceId), ...editedResourceData };
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === editingResourceId ? updatedResource : resource
      )
    );

    // Make the PUT request to the backend
    await axios.put(`/api/${selectedResourceType}/${editingResourceId}`, editedResourceData);

    // Success alert and reset
    alert(`${selectedResourceType} updated successfully!`);
    
    // Exit edit mode
    setEditingResourceId(null);
    
  } catch (error) {
    console.error(`Error updating ${selectedResourceType}:`, error);
    alert("Failed to update resource.");
  }
};



const renderAddResourceForm = () => {
  if (selectedResourceType === "ebooks") {
    return (
      <>
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Title:</label>
      <input
        type="text"
        value={newResourceData.title}
        onChange={(e) => handleInputChangeNewResource(e, "title")}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
      />
    </div>

    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Author:</label>
      <input
        type="text"
        value={newResourceData.author}
        onChange={(e) => handleInputChangeNewResource(e, "author")}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
      />
    </div>

    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Description:</label>
      <textarea
        value={newResourceData.description}
        onChange={(e) => handleInputChangeNewResource(e, "description")}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
          height: "100px",
          resize: "vertical",
        }}
      />
    </div>

    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>Download Link:</label>
      <input
        type="url"
        value={newResourceData.downloadLink}
        onChange={(e) => handleInputChangeNewResource(e, "downloadLink")}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
      />
    </div>

    <button
      onClick={handleSaveNewResource}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginTop: "15px",
      }}
    >
      Add E-book
    </button>
  </>
    );
  } else if (selectedResourceType === "shelters") {
    return (
      <>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Shelter Name:</label>
        <input
          type="text"
          value={newResourceData.shelterName}
          onChange={(e) => handleInputChangeNewResource(e, "shelterName")}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>
  
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Owner:</label>
        <input
          type="text"
          value={newResourceData.owner}
          onChange={(e) => handleInputChangeNewResource(e, "owner")}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>
  
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Phone Number:</label>
        <input
          type="text"
          value={newResourceData.phoneNumber}
          onChange={(e) => handleInputChangeNewResource(e, "phoneNumber")}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>
  
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Location:</label>
        <input
          type="text"
          value={newResourceData.location}
          onChange={(e) => handleInputChangeNewResource(e, "location")}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>
  
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Address:</label>
        <input
          type="text"
          value={newResourceData.address}
          onChange={(e) => handleInputChangeNewResource(e, "address")}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>
  
      <button
        onClick={handleSaveNewResource}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "15px",
        }}
      >
        Add Shelter
      </button>
    </>
    );
  } else if (selectedResourceType === "helplines") {
    return (
      <>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Name:</label>
        <input
          type="text"
          value={newResourceData.name}
          onChange={(e) => handleInputChangeNewResource(e, "name")}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>
  
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Role:</label>
        <input
          type="text"
          value={newResourceData.role}
          onChange={(e) => handleInputChangeNewResource(e, "role")}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>
  
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Phone Number:</label>
        <input
          type="text"
          value={newResourceData.phoneNumber}
          onChange={(e) => handleInputChangeNewResource(e, "phoneNumber")}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box",
          }}
        />
      </div>
  
      <button
        onClick={handleSaveNewResource}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "15px",
        }}
      >
        Add Helpline
      </button>
    </>
    );
  }
  return null; // Default case (if no resource is selected)
};


const handleSaveNewResource = async () => {
  try {
    let endpoint = "";
    let resourceData = {};

    // Prepare the data based on selected resource type
    switch (selectedResourceType) {
      case "ebooks":
        endpoint = "/api/ebooks/add";
        resourceData = {
          title: newResourceData.title,
          author: newResourceData.author,
          description: newResourceData.description,
          downloadLink: newResourceData.downloadLink,
        };
        break;
      case "shelters":
        endpoint = "/api/shelters/add";
        resourceData = {
          shelterName: newResourceData.shelterName,
          owner: newResourceData.owner,
          phoneNumber: newResourceData.phoneNumber,
          location: newResourceData.location,
          address: newResourceData.address,
        };
        break;
      case "helplines":
        endpoint = "/api/helplines/add";
        resourceData = {
          name: newResourceData.name,
          role: newResourceData.role,
          phoneNumber: newResourceData.phoneNumber,
        };
        break;
      default:
        return;
    }

    // Send POST request to the backend to save the resource
    await axios.post(endpoint, resourceData);

    // Clear the form and reset state
    setNewResourceData({
      title: "",
      author: "",
      description: "",
      downloadLink:"",
      shelterName: "",
      owner: "",
      phoneNumber: "",
      location: "",
      address: "",
      name: "",
      role: "",
    });

    // Fetch the updated resources list
    fetchResources(selectedResourceType);
    alert(`${selectedResourceType.charAt(0).toUpperCase() + selectedResourceType.slice(1)} added successfully!`);
  } catch (error) {
    console.error(`Error adding ${selectedResourceType}:`, error);
    alert(`Failed to add ${selectedResourceType}`);
  }
};





  const renderTableHeaders = () => {
    if (selectedResourceType === "ebooks") {
        return (
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Download Link</th>
                <th>Actions</th>
            </tr>
        );
    } else if (selectedResourceType === "shelters") {
        return (
            <tr>
                <th>Shelter Name</th>
                <th>Owner</th>
                <th>Phone Number</th>
                <th>Location</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
        );
    } else if (selectedResourceType === "helplines") {
        return (
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Number</th>
                <th>Actions</th>
            </tr>
        );
    }
    return null; // Default case (if no resource is selected)
};


const renderTableRows = () => {
  return resources.map((resource) => (
      <tr key={resource.id}>
          {selectedResourceType === "ebooks" ? (
              <>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="text"
                          value={editedResourceData.title} 
                          onChange={(e) => handleInputChangeResource(e, "title")}
                      />
                  ) : (
                      resource.title
                  )}</td>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="text"
                          value={editedResourceData.author} 
                          onChange={(e) => handleInputChangeResource(e, "author")}
                      />
                  ) : (
                      resource.author
                  )}</td>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="text"
                          value={editedResourceData.description || resource.description} 
                          onChange={(e) => handleInputChangeResource(e, "description")}
                      />
                  ) : (
                      resource.description
                  )}</td>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="url"
                          value={editedResourceData.downloadLink} 
                          onChange={(e) => handleInputChangeResource(e, "downloadLink")}
                      />
                  ) : (
                      <a href={resource.downloadLink} target="_blank" rel="noopener noreferrer">
                          {resource.downloadLink}
                      </a>
                  )}</td>

              </>
          ) : selectedResourceType === "shelters" ? (
              <>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="text"
                          value={editedResourceData.shelterName}  
                          onChange={(e) => handleInputChangeResource(e, "shelterName")}
                      />
                  ) : (
                      resource.shelterName
                  )}</td>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="text"
                          value={editedResourceData.owner}  
                          onChange={(e) => handleInputChangeResource(e, "owner")}
                      />
                  ) : (
                      resource.owner
                  )}</td>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="text"
                          value={editedResourceData.phoneNumber} 
                          onChange={(e) => handleInputChangeResource(e, "phoneNumber")}
                      />
                  ) : (
                      resource.phoneNumber
                  )}</td>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="text"
                          value={editedResourceData.location} 
                          onChange={(e) => handleInputChangeResource(e, "location")}
                      />
                  ) : (
                      resource.location
                  )}</td>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="text"
                          value={editedResourceData.address} 
                          onChange={(e) => handleInputChangeResource(e, "address")}
                      />
                  ) : (
                      resource.address
                  )}</td>
              </>
          ) : selectedResourceType === "helplines" ? (
              <>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="text"
                          value={editedResourceData.name}  
                          onChange={(e) => handleInputChangeResource(e, "name")}
                      />
                  ) : (
                      resource.name
                  )}</td>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="text"
                          value={editedResourceData.role}  
                          onChange={(e) => handleInputChangeResource(e, "role")}
                      />
                  ) : (
                      resource.role
                  )}</td>
                  <td>{editingResourceId === resource.id ? (
                      <input
                          type="text"
                          value={editedResourceData.phoneNumber} 
                          onChange={(e) => handleInputChangeResource(e, "phoneNumber")}
                      />
                  ) : (
                      resource.phoneNumber
                  )}</td>
              </>
          ) : null}
          <td>
              {editingResourceId === resource.id ? (
                  <button onClick={handleSaveEditedResource}>Save</button>
              ) : (
                  <>
                      <button onClick={() => handleEditResource(resource)}>Edit</button>
                      <button onClick={() => handleDeleteResource(resource.id)}>Delete</button>
                  </>
              )}
          </td>
      </tr>
  ));
};


  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalLegalAdvisors: 0,
    totalCounselors: 0,
    totalDonations:0,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getMetrics = useCallback(async () => {
    try {
      const response = await axios.get("/api/users/all");
      const users = response.data;

      const totalUsers = users.filter((user) => user.role === "USER").length;
      const totalLegalAdvisors = users.filter((user) => user.role === "LEGAL ADVISOR").length;
      const totalCounselors = users.filter((user) => user.role === "COUNSELOR").length;
      const donationResponse = await axios.get("/api/payments/summary");
      const totalDonations = donationResponse.data.totalDonations || 0;

      setMetrics({
        totalUsers,
        totalLegalAdvisors,
        totalCounselors,
        totalDonations,
      });
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  }, []);



  useEffect(() => {
    getMetrics();
  }, [getMetrics]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setAdminName(storedUsername || "Admin");
  }, []);






  // Fetch case reports data
  const fetchCaseReports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/case-reports/all"); // Endpoint for case reports
      setCaseReports(response.data);
    } catch (error) {
      console.error("Error fetching case reports:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch feedbacks
  const fetchFeedbacks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/feedback/all");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSave = async (userId) => {
    try {
      await axios.put(`/api/users/update/${userId}`, editedUserData);
      alert(`${selectedSection} updated successfully!`);
      setEditingUserId(null); // Exit edit mode
      fetchSectionData(); // Refresh the list
    } catch (error) {
      console.error(`Error updating ${selectedSection}:`, error);
      alert("Failed to update data.");
    }
  };

  const handleInputChange = (e, field) => {
    setEditedUserData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleDelete = async (userId) => {
    if (window.confirm(`Are you sure you want to delete this ${selectedSection}?`)) {
      try {
        await axios.delete(`/api/users/delete/${userId}`);
        alert(`${selectedSection} deleted successfully!`);
        fetchSectionData();
      } catch (error) {
        console.error(`Error deleting ${selectedSection}:`, error);
      }
    }
  };


  // Fetch section data (Users, Legal Advisors, Counselors, Case Reports, feedback)
  const fetchSectionData = useCallback(async () => {
    setLoading(true);
    try {
      if (selectedSection === "case reports") {
        fetchCaseReports(); // Fetch case reports if the section is "case reports"
      } else if (selectedSection === "feedback management") {
        fetchFeedbacks(); // Fetch feedback if the section is "feedback management"
      } 
      else if(selectedSection === "article and guide") {
        fetchArticlesAndGuides();
      }
      else if(selectedSection === "health"){
        fetchHealthBooks();
      }
      else if(selectedSection === "donations"){
        fetchPayments();
      }

      else {
        const response = await axios.get("/api/users/all");
        const filteredData = response.data.filter(
          (user) => user.role === selectedSection.toUpperCase()
        );
        setUserinfo(filteredData);
      }
    } catch (error) {
      console.error(`Error fetching ${selectedSection} data:`, error);
    } finally {
      setLoading(false);
    }
  }, [selectedSection, fetchCaseReports, fetchFeedbacks,fetchArticlesAndGuides,fetchHealthBooks,fetchPayments]);

  useEffect(() => {
    if (selectedSection) {
      fetchSectionData();
    } else {
      getMetrics();
    }
  }, [selectedSection, fetchSectionData, getMetrics]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDashboardClick = () => {
    setSelectedSection(""); 
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section); 
  };
  

  const handleDeleteCaseReport = async (caseId) => {
    try {
      await axios.delete(`/api/case-reports/${caseId}`); // Delete case report by ID
      // Re-fetch case reports after deletion
      fetchCaseReports();
    } catch (error) {
      console.error("Error deleting case report:", error);
    }
  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`/api/feedback/${feedbackId}`); // Delete feedback by ID
      // Re-fetch feedbacks after deletion
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>ADMIN DASHBOARD</h2>
        </div>
        <div className="menu">
          <ul>
            <li>
              <Link to="#" onClick={() => handleSectionClick("user")}>
                <FaUsers /> Users
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => handleSectionClick("legal advisor")}>
                <FaBalanceScale /> Legal Advisors
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => handleSectionClick("counselor")}>
                <FaRegUser /> Counselors
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => handleSectionClick("case reports")}>
                <FaFileAlt /> Case Reports
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => handleSectionClick("feedback management")}>
                <FaCommentAlt /> Feedback Management
              </Link>
            </li>
            <li>
              <Link to="#" onClick={() => handleSectionClick("resource management")}>
                <FaTools /> Resource Management
              </Link>
            </li>
            <li>
              <Link to="#" onClick={()=> handleSectionClick("article and guide")}>
                <IoIosDocument /> Articles and Guides
              </Link>
            </li>
            <li>
              <Link to="#" onClick={()=> handleSectionClick("health")}>
                <IoMdHeart/> Health and WellBeing
              </Link>
            </li>
            <li>
              <Link to="#" onClick={()=> handleSectionClick("donations")}>
                <FaDonate/>Donations
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <span className="admin-name">Welcome, {adminName}</span>
          <button className="logout-button" onClick={handleLogout}>
            <IoIosLogOut size={20} /> Logout
          </button>
        </div>
        <div className="admin-dashboard">
          {selectedSection === "" ? (
            <>
              <div className="metrics">
                <div className="metric-item">
                  <h3>Total Users</h3>
                  <p>{metrics.totalUsers}</p>
                </div>
                <div className="metric-item">
                  <h3>Total Legal Advisors</h3>
                  <p>{metrics.totalLegalAdvisors}</p>
                </div>
                <div className="metric-item">
                  <h3>Total Counselors</h3>
                  <p>{metrics.totalCounselors}</p>
                </div>
                <div className="metric-item">
                  <h3>Total Donations</h3>
                  <p>{metrics.totalDonations}</p>
                </div>
              </div>
            </>
          ) : 

          
          
          
          (
            <>
              <button className="back-to-dashboard-btn" onClick={handleDashboardClick}>
                Back to Dashboard
              </button>


              

              {loading ? (
                <div>Loading...</div>
               ) 
               
               : selectedSection === "resource management" ? (
                <>
                  <h3>Please select one of the resources:</h3>
                  <button onClick={() => handleResourceSelect("ebooks")}>E-books</button>
                  <button onClick={() => handleResourceSelect("shelters")}style={{ marginLeft: '10px' }}>Shelters</button>
                  <button onClick={() => handleResourceSelect("helplines")}style={{ marginLeft: '10px' }}>Helplines</button>
    
                  {selectedResourceType && (
                    <>
                      <h3>{selectedResourceType.charAt(0).toUpperCase() + selectedResourceType.slice(1)} Resources</h3>
                      <button onClick={handleAddResourceClick}>
                        Add {selectedResourceType.charAt(0).toUpperCase() + selectedResourceType.slice(1)}
                      </button>

                      {addingNewResource && renderAddResourceForm()}
                      <div>
                        {loading ? (
                          <p>Loading...</p>
                        ) : (
                          <table>
                              <thead>{renderTableHeaders()}</thead>
                              <tbody>{renderTableRows()}</tbody>
                          </table>
                        )}
                      </div>
                    </>
                  )}
                </>
              ) :selectedSection === "health" ? (
                <>
                  <h3>Health and WellBeing</h3>
                  <button onClick={handleAddHealthClick}>Add Health Book</button>
                  {addingNewHealth && (
                    <div>
                      <h4>Add New Health Book</h4>
                      <div>
                        <div style={{ marginBottom: "15px" }}>
                          <input
                            type="text"
                            placeholder="Name"
                            value={editedHealthData.name}
                            onChange={(e) => handleInputChangeHealth(e, "name")}
                            style={{
                              width: "100%",
                              padding: "10px",
                              fontSize: "16px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
              
                        <div style={{ marginBottom: "15px" }}>
                          <input
                            type="text"
                            placeholder="Author"
                            value={editedHealthData.author}
                            onChange={(e) => handleInputChangeHealth(e, "author")}
                            style={{
                              width: "100%",
                              padding: "10px",
                              fontSize: "16px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
              
                        <div style={{ marginBottom: "15px" }}>
                          <textarea
                            placeholder="Description"
                            value={editedHealthData.description}
                            onChange={(e) => handleInputChangeHealth(e, "description")}
                            style={{
                              width: "100%",
                              padding: "10px",
                              fontSize: "16px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              boxSizing: "border-box",
                              height: "100px",
                              resize: "vertical",
                            }}
                          />
                        </div>
              
                        <div style={{ marginBottom: "15px" }}>
                          <input
                            type="url"
                            placeholder="Download Link"
                            value={editedHealthData.downloadLink}
                            onChange={(e) => handleInputChangeHealth(e, "downloadLink")}
                            style={{
                              width: "100%",
                              padding: "10px",
                              fontSize: "16px",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>
              
                      <button onClick={handleAddNewHealthBook}>Add</button>
                      <button onClick={handleCancelAddHealthBook} style={{ marginLeft: "10px" }}>Cancel</button>
                    </div>
                  )}
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Author</th>
                          <th>Description</th>
                          <th>Download Link</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {healthBooks.length === 0 ? (
                          <tr>
                            <td colSpan="5">No health books available</td>
                          </tr>
                        ) : (
                          healthBooks.map((healthBook) => (
                            <tr key={healthBook.id}>
                              <td>
                                {editingHealthBookId === healthBook.id ? (
                                  <input
                                    type="text"
                                    value={editedHealthData.name}
                                    onChange={(e) => handleInputChangeHealth(e, "name")}
                                  />
                                ) : (
                                  healthBook.name
                                )}
                              </td>
                              <td>
                                {editingHealthBookId === healthBook.id ? (
                                  <textarea
                                    value={editedHealthData.author}
                                    onChange={(e) => handleInputChangeHealth(e, "author")}
                                  />
                                ) : (
                                  healthBook.author
                                )}
                              </td>
                              <td>
                                {editingHealthBookId === healthBook.id ? (
                                  <input
                                    type="text"
                                    value={editedHealthData.description}
                                    onChange={(e) => handleInputChangeHealth(e, "description")}
                                  />
                                ) : (
                                  healthBook.description
                                )}
                              </td>
                              <td>
                                {editingHealthBookId === healthBook.id ? (
                                  <input
                                    type="text"
                                    value={editedHealthData.downloadLink}
                                    onChange={(e) => handleInputChangeHealth(e, "downloadLink")}
                                  />
                                ) : (
                                  <a href={healthBook.downloadLink} target="_blank" rel="noopener noreferrer">
                                    {healthBook.downloadLink}
                                  </a>
                                )}
                              </td>
                              <td>
                                {editingHealthBookId === healthBook.id ? (
                                  <button onClick={() => handleSaveHealthBook(healthBook.id)}>
                                    Save
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => {
                                        setEditingHealthBookId(healthBook.id);
                                        setEditedHealthData({
                                          name: healthBook.name || "",
                                          author: healthBook.author || "",
                                          description: healthBook.description || "",
                                          downloadLink: healthBook.downloadLink || "",
                                        });
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button onClick={() => handleDeleteHealthBook(healthBook.id)}>
                                      Delete
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </>
              ) : selectedSection === "donations" ? (
                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="6">No donations available</td>
                            </tr>
                        ) : (
                            payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.name}</td>
                                    <td>{payment.email}</td>
                                    <td>{payment.phoneNumber}</td>
                                    <td>{payment.amount}</td>
                                    <td>{new Date(payment.date).toLocaleString()}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            ) 
              
              
              
              : selectedSection === "article and guide" ? (
                <>
                  <h3>Articles and Guides</h3>
                  <button onClick={handleAddArticleClick}>Add Article/Guide</button>
                  {addingNewArticle && (
                    <div>
                      <h4>Add New Article/Guide</h4>
                      <div>

                      <div style={{ marginBottom: "15px" }}>
                        <input
                          type="text"
                          placeholder="Name"
                          value={editedArticleData.name}
                          onChange={(e) => handleInputChangeArticle(e, "name")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: "15px" }}>
                        <input
                          type="text"
                          placeholder="Author"
                          value={editedArticleData.author}
                          onChange={(e) => handleInputChangeArticle(e, "author")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: "15px" }}>
                        <textarea
                          placeholder="Description"
                          value={editedArticleData.description}
                          onChange={(e) => handleInputChangeArticle(e, "description")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                            height: "100px",
                            resize: "vertical",
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: "15px" }}>
                        <input
                          type="text"
                          placeholder="Link"
                          value={editedArticleData.link}
                          onChange={(e) => handleInputChangeArticle(e, "link")}
                          style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>

                      <button onClick={handleAddNewArticle}>Add</button>
                      <button onClick={handleCancelAddArticle}style={{ marginLeft: '10px' }}>Cancel</button>
                    </div>
                  )}
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Description</th>
                          <th>Link</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {articlesAndGuides.length === 0 ? (
                          <tr>
                            <td colSpan="5">No articles or guides available</td>
                          </tr>
                        ) : (
                          articlesAndGuides.map((article) => (
                            <tr key={article.id}>
                              <td>
                                {editingArticleId === article.id ? (
                                  <input
                                    type="text"
                                    value={editedArticleData.name}
                                    onChange={(e) => handleInputChangeArticle(e, "name")}
                                  />
                                ) : (
                                  article.name
                                )}
                              </td>
                              <td>
                                {editingArticleId === article.id ? (
                                  <textarea
                                    value={editedArticleData.author}
                                    onChange={(e) => handleInputChangeArticle(e, "author")}
                                  />
                                ) : (
                                  article.author
                                )}
                              </td>
                              <td>
                                {editingArticleId === article.id ? (
                                  <input
                                    type="text"
                                    value={editedArticleData.description}
                                    onChange={(e) => handleInputChangeArticle(e, "description")}
                                  />
                                ) : (
                                  article.description
                                )}
                              </td>
                              <td>
                                  {editingArticleId === article.id ? (
                                    <input
                                      type="text"
                                      value={editedArticleData.link}
                                      onChange={(e) => handleInputChangeArticle(e, "link")}
                                    />
                                  ) : (
                                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                                      {article.link}
                                    </a>
                                  )}
                              </td>
                              <td>
                                {editingArticleId === article.id ? (
                                  <button onClick={() => handleSaveArticle(article.id)}>
                                    Save
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => {
                                        setEditingArticleId(article.id);
                                        setEditedArticleData({
                                          name: article.name||"",
                                          author: article.author||"",
                                          description: article.description||"",
                                          link: article.link||"",
                                        });
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button onClick={() => handleDeleteArticle(article.id)}>
                                      Delete
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </>
              )
              


              
              : selectedSection === "case reports" ? (
                <table>
                  <thead>
                    <tr>
                      <th>Case ID</th>
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
                        <td colSpan="11">No case reports available</td>
                      </tr>
                    ) : (
                      caseReports.map((report) => (
                        <tr key={report.id}>
                          <td>{report.id}</td>
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
                            <button onClick={() => handleDeleteCaseReport(report.id)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              ) : selectedSection === "feedback management" ? (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Feedback</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.length === 0 ? (
                      <tr>
                        <td colSpan="5">No feedback available</td>
                      </tr>
                    ) : (
                      feedbacks.map((feeddis) => (
                        <tr key={feeddis.id}>
                          <td>{feeddis.id}</td>
                          <td>{feeddis.name}</td>
                          <td>{feeddis.email}</td>
                          <td>{feeddis.description}</td>
                          <td>
                            <button onClick={() => handleDeleteFeedback(feeddis.id)}>Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
               ) : selectedSection === "user management" ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userinfo.map((user) => (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) 
              
              : (
                <table>
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userinfo.length === 0 ? (
                      <tr>
                        <td colSpan="4">No {selectedSection} data available</td>
                      </tr>
                    ) : (
                      userinfo.map((user) => (
                        <tr key={user.id}>
                          <td>
                            {editingUserId === user.id ? (
                              <input
                                type="text"
                                value={editedUserData.username || ""}
                                onChange={(e) => handleInputChange(e, "username")}
                              />
                            ) : (
                              user.username
                            )}
                          </td>
                          <td>
                            {editingUserId === user.id ? (
                              <input
                                type="email"
                                value={editedUserData.email || ""}
                                onChange={(e) => handleInputChange(e, "email")}
                              />
                            ) : (
                              user.email
                            )}
                          </td>
                          <td>
                            {editingUserId === user.id ? (
                              <select
                                value={editedUserData.role || ""}
                                onChange={(e) => handleInputChange(e, "role")}
                              >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                                <option value="LEGAL ADVISOR">LEGAL ADVISOR</option>
                                <option value="COUNSELOR">COUNSELOR</option>
                              </select>
                            ) : (
                              user.role
                            )}
                          </td>
                          <td>
                            {editingUserId === user.id ? (
                              <button onClick={() => handleSave(user.id)}>Save</button>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    setEditingUserId(user.id);
                                    setEditedUserData({
                                      username: user.username,
                                      email: user.email,
                                      role: user.role,
                                    });
                                  }}
                                >
                                  Edit
                                </button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
