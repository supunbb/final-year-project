  
// EvaluatePage.js

import React, { useState, useEffect } from 'react';
import ResultDetail from './ResultDetail'; // Adjust the import path
import NavigationBar from './NavigationBar';

const EvaluatePage = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch sessions and results data or load from local storage
    // Update the state variables (sessions and results) accordingly
    // For simplicity, I'm using static data here

    const staticSessions = [
      { id: 1, name: 'Session 1' },
      { id: 2, name: 'Session 2' },
      // Add more sessions as needed
    ];

    const staticResults = [
      { id: 1, sessionId: 1, fileName: 'Student1.pdf', /* Add more result details */ },
      { id: 2, sessionId: 1, fileName: 'Student2.pdf', /* Add more result details */ },
      { id: 3, sessionId: 2, fileName: 'Student3.pdf', /* Add more result details */ },
      // Add more results as needed
    ];

    setSessions(staticSessions);
    setResults(staticResults);
  }, []);

  const handleSessionClick = (sessionId) => {
    // Set the selected session when clicked
    setSelectedSession(sessionId);
  };

  return (
    
    <div className="container mx-auto p-8">
    <NavigationBar/>
      <h1 className="text-4xl font-bold mb-8">Evaluate Page</h1>

      {/* Display Sessions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Sessions</h2>
        <ul className="list-disc pl-6">
          {sessions.map((session) => (
            <li
              key={session.id}
              onClick={() => handleSessionClick(session.id)}
              className="cursor-pointer text-blue-500 hover:underline mb-2"
            >
              {session.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Display Results for Selected Session */}
      {selectedSession && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Results for Selected Session</h2>
          {results
            .filter((result) => result.sessionId === selectedSession)
            .map((result) => (
              <ResultDetail key={result.id} result={result} />
            ))}
        </div>
      )}
    </div>
  );
};

export default EvaluatePage;
