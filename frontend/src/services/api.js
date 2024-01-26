// frontend/src/services/ApiService.js

const BASE_URL = 'http://localhost:3001/api'; // Adjust the URL based on your backend's address

const ApiService = {
  submitPdf: async (pdfFile) => {
    const formData = new FormData();
    formData.append('pdfFile', pdfFile);

    try {
      const response = await fetch(`${BASE_URL}/submit-pdf`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit PDF');
      }

      return response.json();
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  },
  // Add more API methods as needed
};

export default ApiService;
