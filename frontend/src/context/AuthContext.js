// frontend/src/pages/Home.js

import React, { useState } from 'react';
import ApiService from '../services/ApiService';

const Home = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (pdfFile) {
      try {
        // Assuming you have an API endpoint for submitting PDFs in ApiService
        await ApiService.submitPdf(pdfFile);
        alert('PDF submitted successfully!');
      } catch (error) {
        console.error('Error submitting PDF:', error);
        alert('Error submitting PDF. Please try again.');
      }
    } else {
      alert('Please select a PDF file.');
    }
  };

  return (
    <div>
      <h1>Submit Answer PDF</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select PDF File:
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
