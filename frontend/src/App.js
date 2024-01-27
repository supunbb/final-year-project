// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import FunctionalityPage from './components/FunctionalityPage';
import SignUpPage from './components/SignUpPage';
import MakeMarkingSchemePage from './components/MakeMarkingSchemePage'; // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<FunctionalityPage />} />
        <Route path="/make-marking-scheme" element={<MakeMarkingSchemePage />} /> {/* Add this line */}
        <Route path="/upload-files" element={<div>Upload Files Page</div>} />
        <Route path="/evaluate" element={<div>Evaluate Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
