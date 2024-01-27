import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnswerSchemeCard from './AnswerSchemeCard';
import NavigationBar from './NavigationBar';

const MakeMarkingSchemePage = () => {
  const [newAnswer, setNewAnswer] = useState({
    question: '',
    scheme: '',
    marks: 0,
    questionType: 'direct',
  });

  const [answerSchemes, setAnswerSchemes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [makingSchemes, setMakingSchemes] = useState([]);
  const [selectedMakingScheme, setSelectedMakingScheme] = useState(null);
  const [makingSchemeName, setMakingSchemeName] = useState('');

  useEffect(() => {
    // Load making schemes from local storage
    const storedMakingSchemes = JSON.parse(localStorage.getItem('makingSchemes')) || [];
    setMakingSchemes(storedMakingSchemes);
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
      // Update existing question in edit mode
      setAnswerSchemes((prevSchemes) =>
        prevSchemes.map((scheme) =>
          scheme.id === editId ? { ...scheme, ...newAnswer } : scheme
        )
      );
      setEditMode(false);
    } else {
      // Add new question in normal mode
      setAnswerSchemes((prevSchemes) => [...prevSchemes, { id: Date.now(), ...newAnswer }]);
    }
    setNewAnswer({ question: '', scheme: '', marks: 0, questionType: 'direct' });
  };

  const handleEdit = (id, question, scheme, marks, questionType) => {
    // Set form fields for editing
    setNewAnswer({ question, scheme, marks, questionType });
    setEditMode(true);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setAnswerSchemes((prevSchemes) => prevSchemes.filter((scheme) => scheme.id !== id));
  };

  const handleSubmitMakingScheme = () => {
    // Save the current set of answer schemes as a making scheme
    const newMakingScheme = {
      id: Date.now(),
      name: makingSchemeName || `Making Scheme ${makingSchemes.length + 1}`,
      schemes: [...answerSchemes],
    };

    setMakingSchemes((prevMakingSchemes) => [...prevMakingSchemes, newMakingScheme]);

    // Clear the current set of answer schemes
    setAnswerSchemes([]);
    setNewAnswer({ question: '', scheme: '', marks: 0, questionType: 'direct' });

    // Save making schemes to local storage
    localStorage.setItem('makingSchemes', JSON.stringify([...makingSchemes, newMakingScheme]));
  };

  const handleLoadMakingScheme = (makingScheme) => {
    // Load a saved making scheme
    setSelectedMakingScheme(makingScheme);
    setAnswerSchemes(makingScheme.schemes);
    setMakingSchemeName(makingScheme.name);
  };

  return (
    <div className="container mx-auto p-8">
    <NavigationBar/>
      <h1 className="text-4xl font-bold mb-8">Making Schemes Dashboard</h1>

      {/* Add Form for Submitting/Editing Answer Schemes */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            name="scheme"
            placeholder="Enter Answer Scheme"
            value={newAnswer.scheme}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          ></textarea>
        </div>
        <div className="flex items-center mt-4">
          <label className="mr-2">Marks:</label>
          <input
            type="number"
            name="marks"
            value={newAnswer.marks}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="flex items-center mt-4">
          <label className="mr-2">Question Type:</label>
          <select
            name="questionType"
            value={newAnswer.questionType}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="direct">Direct</option>
            <option value="essay">Essay</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">
          {editMode ? 'Save Changes' : 'Submit'}
        </button>
      </form>

      {/* Display Existing Answer Schemes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {answerSchemes.map((scheme, index) => (
          <div key={scheme.id} className="relative">
            <AnswerSchemeCard question={scheme.question} scheme={scheme.scheme} />
            <div className="absolute top-0 right-0 flex space-x-2 p-1">
              <button
                onClick={() => handleEdit(scheme.id, scheme.question, scheme.scheme, scheme.marks, scheme.questionType)}
                className="bg-yellow-500 text-white p-1 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(scheme.id)}
                className="bg-red-500 text-white p-1 rounded-md"
              >
                Delete
              </button>
            </div>
            <div className="absolute bottom-0 left-0 bg-white text-gray-600 p-1 rounded-md">
              {`${index + 1}. ${scheme.questionType === 'direct' ? 'Direct' : 'Essay'}`}
            </div>
          </div>
        ))}
      </div>

      {/* Save and Load Making Scheme Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Save and Load Making Schemes</h2>
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Enter Making Scheme Name"
            value={makingSchemeName}
            onChange={(e) => setMakingSchemeName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSubmitMakingScheme}
            className="bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Submit Making Scheme
          </button>
        </div>

        <div className="flex space-x-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Saved Making Schemes</h3>
            {makingSchemes.length === 0 ? (
              <p>No making schemes saved yet.</p>
            ) : (
              <ul className="list-disc pl-6">
                {makingSchemes.map((scheme) => (
                  <li key={scheme.id}>
                    <button onClick={() => handleLoadMakingScheme(scheme)} className="underline">
                      {scheme.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedMakingScheme && (
            <div>
              <h3 className="text-xl font-bold mb-2">Loaded Making Scheme</h3>
              <p>{selectedMakingScheme.name}</p>
              <button
                onClick={() => {
                  setSelectedMakingScheme(null);
                  setAnswerSchemes([]);
                  setMakingSchemeName('');
                }}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md mt-4"
              >
                Clear Loaded Scheme
              </button>
            </div>
          )}
        </div>
        <div className="container mx-auto p-8">
        {/* ... (unchanged code) */}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Link to="/upload-files" className="bg-green-500 text-white py-2 px-4 rounded-md">
            Go to Upload File Page
          </Link>
          {/* New Button to Go to Functionality Page */}
          <Link to="/profile" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Go to Functionality Page
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MakeMarkingSchemePage;
