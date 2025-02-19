import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./Navbar";
import axios from "axios";
import { EvaluationContext } from "../context/EvaluationContext";

const UploadFilesPage = () => {
  const { setEvaluationData } = useContext(EvaluationContext);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [makingSchemes, setMakingSchemes] = useState([]);
  const [selectedSchemaId, setSelectedSchemaId] = useState(null);
  const [filteredSchema, setFilteredSchema] = useState([]);
  const [studentAnswerResponse, setStudentAswerResponse] = useState([]);

  useEffect(() => {
    const fetchMarkingSchemas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/marking-schemes/"
        );
        setMakingSchemes(Array.isArray(response.data) ? response.data : []);
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
    selectedFiles.forEach((file) => formData.append("pdfs", file));

    try {
      const response = await axios.post(
        "http://localhost:8080/pdf-upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setStudentAswerResponse(response.data.savedAnswers[0]);
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
    console.log(studentAnswerResponse);
    try {
      const response = await axios.post("http://localhost:8080/evaluation", {
        markingSchemeId: filteredSchema[0]?.markingSchemeId,
        studentAnswersId: studentAnswerResponse._id,
      });

      setEvaluationData(response.data);
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
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="flex flex-col md:flex-row justify-between p-6 gap-6">
        {/* Upload Section */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Upload Files
          </h1>

          {/* File Upload Button */}
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-400 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-50 transition duration-300">
            <span className="font-semibold text-lg">Click to Upload PDFs</span>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Selected Files */}
          {fileList.length > 0 && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded-lg">
              <h2 className="font-semibold text-lg">Selected Files:</h2>
              <ul className="list-disc pl-6 text-gray-700 mt-2">
                {fileList.map((fileName, index) => (
                  <li key={index}>{fileName}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            className={`w-full mt-4 py-2 px-4 text-lg font-semibold text-white rounded-lg transition duration-300 ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={uploading || selectedFiles.length === 0}
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </button>

          {/* Evaluate Button */}
          <Link to="/evaluate">
            <button
              className="w-full mt-4 py-2 px-4 text-lg font-semibold text-white bg-green-500 hover:bg-green-600 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
              disabled={filteredSchema.length === 0}
              onClick={handleEvaluate}
            >
              Evaluate
            </button>
          </Link>
        </div>

        {/* Marking Schemes Section */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Marking Schemes
          </h2>

          {/* Marking Schemes List */}
          <div className="h-96 overflow-y-auto border border-gray-300 rounded-lg p-4">
            {makingSchemes.length > 0 ? (
              makingSchemes.map((scheme) => (
                <button
                  key={scheme.markingSchemeId}
                  className={`w-full text-left p-3 rounded-lg font-semibold transition duration-300 ${
                    selectedSchemaId === scheme.markingSchemeId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleSelectSchema(scheme.markingSchemeId)}
                  disabled={studentAnswerResponse.length === 0}
                >
                  {scheme.markingSchemeName}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No marking schemes available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFilesPage;
