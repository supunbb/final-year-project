// frontend/src/utils/PdfProcessing.js

import pdfjs from 'pdfjs-dist';

const PdfProcessing = {
  extractTextFromPdf: async (pdfFile) => {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onload = async (event) => {
        try {
          const typedArray = new Uint8Array(event.target.result);
          const pdfDocument = await pdfjs.getDocument(typedArray).promise;
          const totalPages = pdfDocument.numPages;
          let text = '';

          for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            const pdfPage = await pdfDocument.getPage(pageNumber);
            const pageText = await pdfPage.getText();
            text += pageText + '\n'; // Add a newline between pages
          }

          resolve(text);
        } catch (error) {
          reject(new Error(`Error extracting text from PDF: ${error.message}`));
        }
      };

      fileReader.onerror = () => {
        reject(new Error('Error reading PDF file'));
      };

      fileReader.readAsArrayBuffer(pdfFile);
    });
  },
  // Add more PDF processing functions as needed
};

export default PdfProcessing;
