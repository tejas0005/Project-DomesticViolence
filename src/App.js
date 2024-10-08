import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Home from './pages/Home';

import LoginRegister from './Components/LoginRegister/LoginRegister';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginRegister />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/home" element={<Home />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
