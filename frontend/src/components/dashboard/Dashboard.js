// src/components/Dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import AnswerSchemeCard from '../AnswerSchemeCard';

const Dashboard = () => {
  const [newAnswer, setNewAnswer] = useState({
    question: '',
    scheme: '',
    questionType: 'direct',
  });

  const [answerSchemes, setAnswerSchemes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [questionPapers, setQuestionPapers] = useState([]);
  const [selectedQuestionPaper, setSelectedQuestionPaper] = useState(null);
  const [questionPaperName, setQuestionPaperName] = useState('');

  useEffect(() => {
    // Load question papers from local storage
    const storedQuestionPapers = JSON.parse(localStorage.getItem('questionPapers')) || [];
    setQuestionPapers(storedQuestionPapers);
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
    setNewAnswer({ question: '', scheme: '', questionType: 'direct' });
  };

  const handleEdit = (id, question, scheme, questionType) => {
    // Set form fields for editing
    setNewAnswer({ question, scheme, questionType });
    setEditMode(true);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setAnswerSchemes((prevSchemes) => prevSchemes.filter((scheme) => scheme.id !== id));
  };

  const handleSaveQuestionPaper = () => {
    // Save the entire marking scheme as a question paper
    const newQuestionPaper = {
      id: Date.now(),
      name: questionPaperName || `Question Paper ${questionPapers.length + 1}`,
      schemes: [...answerSchemes],
    };

    setQuestionPapers((prevQuestionPapers) => [...prevQuestionPapers, newQuestionPaper]);

    // Clear the current marking scheme
    setAnswerSchemes([]);
    setNewAnswer({ question: '', scheme: '', questionType: 'direct' });

    // Save question papers to local storage
    localStorage.setItem('questionPapers', JSON.stringify([...questionPapers, newQuestionPaper]));
  };

  const handleLoadQuestionPaper = (questionPaper) => {
    // Load a saved question paper
    setSelectedQuestionPaper(questionPaper);
    setAnswerSchemes(questionPaper.schemes);
    setQuestionPaperName(questionPaper.name);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Answer Schemes Dashboard</h1>

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
          {editMode ? 'Save Changes' : 'Submit Answer Scheme'}
        </button>
      </form>

      {/* Display Existing Answer Schemes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {answerSchemes.map((scheme, index) => (
          <div key={scheme.id} className="relative">
            <AnswerSchemeCard question={scheme.question} scheme={scheme.scheme} />
            <div className="absolute top-0 right-0 flex space-x-2 p-1">
              <button
                onClick={() => handleEdit(scheme.id, scheme.question, scheme.scheme, scheme.questionType)}
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

      {/* Save and Load Question Paper Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Save and Load Question Papers</h2>
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Enter Question Paper Name"
            value={questionPaperName}
            onChange={(e) => setQuestionPaperName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleSaveQuestionPaper}
            className="bg-green-500 text-white py-2 px-4 rounded-md"
          >
            Save Question Paper
          </button>
        </div>

        <div className="flex space-x-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Saved Question Papers</h3>
            {questionPapers.length === 0 ? (
              <p>No question papers saved yet.</p>
            ) : (
              <ul className="list-disc pl-6">
                {questionPapers.map((paper) => (
                  <li key={paper.id}>
                    <button onClick={() => handleLoadQuestionPaper(paper)} className="underline">
                      {paper.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedQuestionPaper && (
            <div>
              <h3 className="text-xl font-bold mb-2">Loaded Question Paper</h3>
              <p>{selectedQuestionPaper.name}</p>
              <button
                onClick={() => {
                  setSelectedQuestionPaper(null);
                  setAnswerSchemes([]);
                  setQuestionPaperName('');
                }}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md mt-4"
              >
                Clear Loaded Paper
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
