// src/components/UploadFilesPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./Navbar";
import axios from 'axios';

const UploadFilesPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length > 0) {
      setSelectedFiles(pdfFiles);
      setFileList(pdfFiles.map((file) => file.name));
    } else {
      alert("Please select only PDF files.");
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
        alert("Please select at least one file before uploading.");
        return;
    }

    setUploading(true);

    const formData = new FormData();
    selectedFiles.forEach((file) => {
        formData.append("pdfs", file); // 'pdfs' must match the backend multer field
    });

    try {
        const response = await axios.post('http://localhost:8080/pdf-upload', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Upload Success:", response.data);
        alert("Files uploaded successfully!");
    } catch (error) {
        console.error("Upload Error:", error.response?.data || error.message);
        alert("File upload failed. Check console for details.");
    } finally {
        setUploading(false);
    }
};

  const processPDFData = () => {
    const processedData = "Processed data from PDFs";
    return processedData;
  };

  return (
    <div>
      <NavigationBar />
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Upload Files Page</h1>

        <div className="w-full relative inline-block overflow-hidden">
          <label className="w-1/2 h-32 flex items-center justify-center border-2 border-dotted border-gray-500 text-gray-500 bg-white rounded-lg text-lg font-bold cursor-pointer">
            Upload a file
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute left-0 top-0 opacity-0 w-full h-full cursor-pointer"
            />
          </label>
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
          className={`bg-blue-500 text-white py-2 px-4 rounded-md ${uploading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          disabled={selectedFiles.length === 0 || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Files'}
        </button>

        {/* Evaluate Button */}
        <Link
          to={{ pathname: "/evaluate", state: { processedData: processPDFData() } }}
        >
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md mt-4"
            disabled={selectedFiles.length === 0}
          >
            Evaluate
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UploadFilesPage;
