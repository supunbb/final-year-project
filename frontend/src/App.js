// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/dashboard/Dashboard';
import AnswerSchemeCard from './components/AnswerSchemeCard';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router>
      <div>
      <h1 className="text-4xl font-bold text-blue-500">Your Text Goes Here</h1>




        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/answer/:id" element={<AnswerSchemeCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
