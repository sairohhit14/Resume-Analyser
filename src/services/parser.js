import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth/mammoth.browser';

// Resolve the worker file locally using Vite's asset loader
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set the worker source to the locally bundled worker URL
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

/**
 * Extracts plain text from a PDF file in the browser.
 * @param {File} file 
 * @returns {Promise<string>}
 */
export const parsePDF = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const typedarray = new Uint8Array(e.target.result);
        const loadingTask = pdfjsLib.getDocument({ data: typedarray });
        const pdf = await loadingTask.promise;
        let text = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          text += pageText + '\n';
        }
        
        resolve(text.trim());
      } catch (error) {
        console.error('PDF parsing error:', error);
        reject(new Error('Failed to parse PDF resume. The file may be scanned, image-only, or corrupted.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Extracts plain text from a DOCX file in the browser.
 * @param {File} file 
 * @returns {Promise<string>}
 */
export const parseDOCX = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target.result;
        const result = await mammoth.extractRawText({ arrayBuffer });
        resolve(result.value.trim());
      } catch (error) {
        console.error('DOCX parsing error:', error);
        reject(new Error('Failed to parse DOCX resume. Ensure it is a valid Word document.'));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
