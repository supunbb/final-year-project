// src/components/DetailViewPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailViewPage = () => {
  const { id } = useParams();
  const [resultDetails, setResultDetails] = useState(null);

  useEffect(() => {
    // Fetch result details based on the id from the backend
    // Update the state variable (resultDetails) with the fetched data

    // For simplicity, I'm using static data here
    const staticResultDetails = {
      id: 1,
      fileName: 'Student1.pdf',
      // Add more details like questions, answers, marks, etc.
    };

    setResultDetails(staticResultDetails);
  }, [id]);

  if (!resultDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Result Details</h1>
      <h2 className="text-2xl font-bold mb-4">{resultDetails.fileName}</h2>
      {/* Display more details like questions, answers, marks, etc. */}
    </div>
  );
};

export default DetailViewPage;
