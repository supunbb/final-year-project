// src/components/UploadFilesPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';

const UploadFilesPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setFileList(files.map(file => file.name));
  };

  const handleUpload = () => {
    // Here you can send the selectedFiles to the backend for further processing
    console.log("Uploading files:", selectedFiles);
    // You may want to make an API call to your backend with the selectedFiles data
    // For simplicity, I'm just logging the files to the console in this example
  };

  const processPDFData = () => {
    // Here you can implement the PDF processing logic
    // For simplicity, I'm assuming it returns processed data
    const processedData = "Processed data from PDFs";
    return processedData;
  };

  return (
    <div className="container mx-auto p-8">
      <NavigationBar />
      <h1 className="text-4xl font-bold mb-8">Upload Files Page</h1>

      {/* File Input */}
      <div className="mb-4">
        <label className="text-lg font-semibold mb-2">Choose Files:</label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="border p-2 rounded-md"
        />
      </div>

      {/* Display Selected Files List */}
      {fileList.length > 0 && (
        <div className="mb-4">
          <p className="text-lg font-semibold mb-2">Selected Files:</p>
          <ul className="list-disc pl-6">
            {fileList.map((fileName, index) => (
              <li key={index}>{fileName}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
        disabled={selectedFiles.length === 0}
      >
        Upload Files
      </button>



      {/* Evaluate Button */}
      <Link to={{
        pathname: '/evaluate',
        state: { processedData: processPDFData() }
      }}>
        <button className="bg-green-500 text-white py-2 px-4 rounded-md mt-4" disabled={selectedFiles.length === 0}>
          Evaluate
        </button>
      </Link>
    </div>
  );
};

export default UploadFilesPage;
