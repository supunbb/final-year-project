// src/components/UploadFilesPage.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./Navbar";
import axios from "axios";
import EvaluateButton from "./EvaluateButton";

const UploadFilesPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [makingSchemes, setMakingSchemes] = useState([]);
  const [selectedSchemaId, setSelectedSchemaId] = useState(null);
  const [filteredSchema, setFilteredSchema] = useState([]);
  const [evaluateResponse, setEvaluateResponse] = useState([]);

  const [studentAnswerResponse, setStudentAswerResponse] = useState([]);

  useEffect(() => {
    const fetchMarkingSchemas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/marking-schemes/"
        );
        if (Array.isArray(response.data)) {
          setMakingSchemes(response.data);
        } else {
          setMakingSchemes([]);
        }
      } catch (error) {
        console.error("Error fetching marking schemes:", error);
        setMakingSchemes([]);
      }
    };

    fetchMarkingSchemas();
  }, []);

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
      formData.append("pdfs", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/pdf-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setStudentAswerResponse(response.data.savedAnswers);
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      alert("File upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  const handleEvaluate = async () => {
    if (filteredSchema.length === 0) {
      alert("Please select a schema before evaluating.");
      return;
    }

    setUploading(true);

    try {
      const response = await axios.post("http://localhost:8080/evaluation", {
        markingSchemeId: filteredSchema[0]?.markingSchemeId,
        studentAnswers: studentAnswerResponse,
      });

      setEvaluateResponse(response.data)
      console.log("Evaluation Successful:", response.data);
    } catch (error) {
      console.error("Error evaluating:", error);
      alert("Evaluation failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSelectSchema = (id) => {
    setSelectedSchemaId(id);
    setFilteredSchema(
      makingSchemes.filter((scheme) => scheme.markingSchemeId === id)
    );
  };

  return (
    <div>
      <NavigationBar />
      <div className="w-full flex flex-row justify-evenly">
        <div className="container w-1/2 mx-auto p-8">
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
            className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
              uploading ? "bg-gray-400 disabled:cursor-not-allowed" : ""
            }`}
            disabled={selectedFiles.length === 0 || uploading}
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </button>

          {/* Evaluate Button */}
          {/* <Link
            to={{
              pathname: "/evaluate",
              state: { processedData: processPDFData() },
            }}
          > */}
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={filteredSchema.length === 0}
              onClick={handleEvaluate}
            >
              Evaluate
            </button>

            <EvaluateButton filteredSchema = {filteredSchema} evaluateResponse = {evaluateResponse}/>
          {/* </Link> */}
        </div>
        <div className="w-1/2 p-4 bg-white h-screen flex flex-col overflow-y-auto border-l-2 border-l-neutral gap-[5px]">
          <h2 className="text-h5 text-primaryBlue font-semibold mb-4">
            Marking Schemes
          </h2>
          {makingSchemes.map((scheme) => (
            <button
              key={scheme.markingSchemeId}
              className={`p-4 shadow-md rounded-md mb-2 disabled:cursor-not-allowed ${
                selectedSchemaId === scheme.markingSchemeId
                  ? "bg-blue-500"
                  : "bg-white"
              }`}
              onClick={() => handleSelectSchema(scheme.markingSchemeId)}
              disabled={studentAnswerResponse.length == 0}
            >
              <h3 className="font-bold">{scheme.markingSchemeName}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadFilesPage;
