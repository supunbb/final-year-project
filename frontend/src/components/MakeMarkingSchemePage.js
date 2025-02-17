import React, { useState, useEffect } from "react";
import NavigationBar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios"; // Ensure you have axios installed

const MakeMarkingSchemePage = () => {
  const [newAnswer, setNewAnswer] = useState({
    question: "",
    correctAnswer: "",
    keywords: "",
    allocatedMarks: 0,
    evaluationType: "true",
  });

  const [answerSchemes, setAnswerSchemes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [makingSchemes, setMakingSchemes] = useState([]);
  const [editingSchemeId, setEditingSchemeId] = useState(null);
  const [makingSchemeName, setMakingSchemeName] = useState([]);

  useEffect(() => {
    const fetchMarkingSchemas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/marking-schemes/"
        );
        if (Array.isArray(response.data)) {
          setMakingSchemes(response.data);
          console.log(response.data);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnswer((prevAnswer) => ({
      ...prevAnswer,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setAnswerSchemes((prevSchemes) =>
        prevSchemes.map((scheme) =>
          scheme.id === editId ? { ...scheme, ...newAnswer } : scheme
        )
      );
      setEditMode(false);

    } else {
      setAnswerSchemes((prevSchemes) => [
        ...prevSchemes,
        { questionNumber: Date.now(), ...newAnswer },
      ]);
    }
    setNewAnswer({
      question: "",
      correctAnswer: "",
      keywords: "",
      allocatedMarks: 0,
      evaluationType: "true",
    });
  };

  const handleEdit = (
    id,
    question,
    correctAnswer,
    keywords,
    allocatedMarks,
    evaluationType
  ) => {
    setNewAnswer({
      question,
      correctAnswer,
      keywords,
      allocatedMarks,
      evaluationType,
    });
    setEditMode(true);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setAnswerSchemes((prevSchemes) =>
      prevSchemes.filter((scheme) => scheme.id !== id)
    );
  };

  const handleSubmitMakingScheme = async () => {
    const newMakingScheme = {
      markingSchemeId: Date.now(),
      markingSchemeName:
        makingSchemeName || `Marking Scheme ${makingSchemes.length + 1}`,
      totalQuestions: answerSchemes.length,
      questions: [...answerSchemes],
    };

    try {
      // Send POST request to backend API
      await axios.post(
        "http://localhost:8080/marking-schemes/",
        newMakingScheme
      );
      setMakingSchemes((prevMakingSchemes) => [
        ...prevMakingSchemes,
        newMakingScheme,
      ]);
      localStorage.setItem(
        "makingSchemes",
        JSON.stringify([...makingSchemes, newMakingScheme])
      );
    } catch (error) {
      console.error("Error saving marking scheme", error);
    }

    setAnswerSchemes([]);
    setMakingSchemeName("");
  };

  const handleLoadMakingScheme = (scheme) => {
    setEditingSchemeId(scheme.markingSchemeId);
    setAnswerSchemes(scheme.questions);
    setMakingSchemeName(scheme.markingSchemeName);
  };

  const handleDeleteMakingScheme = async (id) => {
    try {
      // Send DELETE request to backend API
      await axios.delete(`http://localhost:8080/marking-schemes/${id}`);
      const updatedMakingSchemes = makingSchemes.filter(
        (scheme) => scheme.markingSchemeId !== id
      );
      setMakingSchemes(updatedMakingSchemes);
      localStorage.setItem(
        "makingSchemes",
        JSON.stringify(updatedMakingSchemes)
      );
    } catch (error) {
      console.error("Error deleting marking scheme", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="flex">
        {/* Left Panel - Questions List */}
        <div className="w-1/4 p-4 bg-white h-screen overflow-y-auto border-r-2 border-r-neutral">
          <h2 className="text-h5 text-primaryBlue font-semibold mb-4">
            Questions
          </h2>
          {answerSchemes.map((scheme, index) => (
            <div
              key={scheme.id}
              className="p-4 bg-white shadow-sm rounded-md mb-2 border-2 border-gray-100"
            >
              <h3 className="font-semibold text-body1">
                {index + 1}. {scheme.question}
              </h3>
              <div className="flex justify-between">
                <p className="font-normal text-body2">
                  Type: {scheme.evaluationType ? "Direct" : "Essay"}
                </p>
                <p className="font-normal text-body2">
                  Marks: {scheme.allocatedMarks}
                </p>
              </div>

              {scheme.evaluationType === "false" && (
                <p>Keywords: {scheme.keywords}</p>
              )}

              <button
                onClick={() =>
                  handleEdit(
                    scheme.id,
                    scheme.question,
                    scheme.correctAnswer,
                    scheme.allocatedMarks,
                    scheme.evaluationType,
                    scheme.keywords
                  )
                }
                className="mr-2 mt-2 bg-green-100 text-white py-1 px-2 rounded-lg shadow-lg hover:bg-green-500 hover:shadow-xl transition-all duration-200"
              >
                ✏️
              </button>

              <button
                onClick={() => handleDelete(scheme.id)}
                className="mr-2 bg-red-100 text-white py-1 px-2 rounded-lg shadow-lg hover:bg-red-500 hover:shadow-xl transition-all duration-200"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* Middle Panel - Form */}
        <div className="w-2/4 p-8">
          <h1 className="text-h4 font-semibold text-primaryBlue mb-4">
            Add Marking Schemes
          </h1>

          {/* Add Form */}
          <form
            onSubmit={handleSubmit}
            className="mb-8 bg-white p-4 shadow-sm rounded-md border-2 border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>Add Questions & Answers separately</p>
              <br />
              <input
                type="text"
                name="question"
                placeholder="Enter Question"
                value={newAnswer.question}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              />
              <textarea
                name="correctAnswer"
                placeholder="Enter Answer Scheme"
                value={newAnswer.correctAnswer}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              ></textarea>
            </div>
            <div className="flex gap-4 mt-4">
              <input
                type="number"
                name="allocatedMarks"
                placeholder="Marks"
                value={newAnswer.allocatedMarks}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full"
                required
              />
              <select
                name="evaluationType"
                value={newAnswer.evaluationType}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="true">Direct</option>
                <option value="false">Essay</option>
              </select>
            </div>

            {newAnswer.evaluationType === "false" && (
              <input
                type="text"
                name="keywords"
                placeholder="Enter Keywords"
                value={newAnswer.keywords}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-md w-full mt-4"
              />
            )}

            <button
              type="submit"
              className="bg-secondaryBlue text-white font-medium py-2 px-4 rounded-md mt-4"
            >
              {editMode ? "Save Changes" : "Add"}
            </button>
          </form>

          {/* Button to Save Marking Scheme */}
          <div>
            <p>Enter Marking Scheme Name</p>
            <br />
            <input
              type="text"
              placeholder="Enter Marking Scheme Name"
              value={makingSchemeName}
              onChange={(e) => setMakingSchemeName(e.target.value)}
              className="p-2 border border-gray-300 rounded-md w-full mb-4"
            />
            {editMode ? (
              <button
                className="bg-primaryBlue text-white py-2 px-4 rounded-md mt-4 mr-2"
              >
                Edit Marking Scheme
              </button>
            ) : (
              <button
                onClick={handleSubmitMakingScheme}
                className="bg-primaryBlue text-white py-2 px-4 rounded-md mt-4 mr-2"
              >
                Save Marking Scheme
              </button>
            )}
            <Link
              to="/upload-files"
              className="bg-primaryBlue text-white py-2 px-4 rounded-md mt-4 mr-2"
            >
              Next Step: Upload
            </Link>
          </div>
        </div>

        {/* Right Panel - Saved Marking Schemes */}
        <div className="w-1/4 p-4 bg-white h-screen overflow-y-auto border-l-2 border-l-neutral">
          <h2 className="text-h5 text-primaryBlue font-semibold mb-4">
            Saved Marking Schemes
          </h2>
          {makingSchemes.map((scheme) => (
            <div
              key={scheme.markingSchemeId}
              className="p-4 bg-white shadow-md rounded-md mb-2"
            >
              <h3 className="font-bold">{scheme.markingSchemeName}</h3>
              <button
                onClick={() => handleLoadMakingScheme(scheme)}
                className="mr-2 mt-2 bg-green-100 py-1 px-2 rounded-lg shadow-lg hover:bg-green-500 hover:shadow-xl transition-all duration-200"
              >
                📂
              </button>
              <button
                onClick={() => handleDeleteMakingScheme(scheme.markingSchemeId)}
                className="mr-2 bg-red-100 text-white py-1 px-2 rounded-lg shadow-lg hover:bg-red-500 hover:shadow-xl transition-all duration-200"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MakeMarkingSchemePage;
