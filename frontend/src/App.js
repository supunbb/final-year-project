// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import FunctionalityPage from './components/FunctionalityPage';
import SignUpPage from './components/SignUpPage';
import MakeMarkingSchemePage from './components/MakeMarkingSchemePage'; 
import UploadFilesPage from './components/UploadFilesPage';
import EvaluatePage from './components/EvaluatePage';
import DetailViewPage from './components/DetailViewPage';

// Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<FunctionalityPage />} />
        <Route path="/make-marking-scheme" element={<MakeMarkingSchemePage />} /> {/* Add this line */}
        <Route path="/upload-files" element={<UploadFilesPage/>} />
        <Route path="/evaluate" element={<EvaluatePage />} />
        <Route path="/detail/:id" component={<DetailViewPage/>} />
    

      </Routes>
    </Router>
  );
}

export default App;
