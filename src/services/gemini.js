import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Sends parsed resume text to Gemini 2.5 Flash for ATS analysis.
 * @param {string} apiKey - Google Gemini API Key
 * @param {string} resumeText - Extracted resume content
 * @returns {Promise<Object>} Analyzed resume results JSON
 */
export const analyzeResume = async (apiKey, resumeText) => {
  if (!apiKey) {
    throw new Error('Gemini API key is required. Please provide a valid key.');
  }
  if (!resumeText || resumeText.trim().length === 0) {
    throw new Error('Resume text is empty. Please upload a valid document with readable text.');
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using gemini-2.5-flash as requested
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
      systemInstruction: 'You are an advanced AI Resume Analyzer and ATS (Applicant Tracking System) optimization expert. Your task is to analyze the provided resume text and generate a structured JSON feedback report. You must evaluate the resume based on key recruitment metrics: formatting, grammar, key skills (technical & soft), quantifiable achievements, project scope, and ATS keyword optimization. Be honest, professional, and actionable.',
    });

    const prompt = `
Analyze the following resume text and return a JSON object with the evaluation results.

Resume Text:
"""
${resumeText}
"""

The output MUST be a valid JSON object matching this structure exactly (do not wrap in markdown blocks, just return the JSON):
{
  "candidateName": "Extract the candidate full name, if not found use 'Candidate'",
  "email": "Extract candidate email, if not found use empty string",
  "phone": "Extract candidate phone number, if not found use empty string",
  "overallATS": 85, // An integer score between 0 and 100 based on ATS compliance and resume quality
  "summary": "AI-generated professional summary of the candidate's background, indicating what they are best suited for.",
  "strengths": [
    "List of 3-5 specific key strengths of the resume (e.g., 'Strong demonstration of cloud native technologies', 'Quantifiable impact in previous positions')"
  ],
  "weaknesses": [
    "List of 3-5 specific constructive weaknesses or gaps (e.g., 'Lack of metrics in junior engineer roles', 'No certifications listed for cloud engineering')"
  ],
  "missingSkills": [
    "Skills that are common for their role but are not explicitly mentioned in the resume (e.g., 'Docker', 'Kubernetes')"
  ],
  "technicalSkills": [
    "Technical skills found in the resume (e.g., 'React', 'JavaScript', 'Node.js')"
  ],
  "softSkills": [
    "Soft skills found or inferred from the resume (e.g., 'Leadership', 'Team Collaboration')"
  ],
  "grammarIssues": [
    "List of grammatical issues, spelling mistakes, or passive voice feedback (e.g., 'Passive voice detected in project section', 'Minor typos in experience list'). If none, return empty array."
  ],
  "formattingIssues": [
    "List of formatting improvements (e.g., 'Consider standardizing date format', 'Resume section headers are inconsistent'). If none, return empty array."
  ],
  "keywordOptimization": [
    "List of high-impact action verbs or SEO/ATS keywords they should add to rank higher (e.g., 'Spearheaded', 'Optimized', 'Architected')"
  ],
  "projectsFeedback": [
    "Constructive critique of their project section, advising on what to add or rephrase (e.g., 'Specify which database was used in project X', 'Mention user scaling metrics')"
  ],
  "educationFeedback": "Feedback on their education section (e.g., 'Clear education details. Consider listing GPA if above 3.5 or honors, if applicable.')",
  "experienceFeedback": "Feedback on their professional experience section (e.g., 'Excellent experience structure. Focus more on accomplishments rather than list of duties.')",
  "resumeSectionsScore": {
    "summary": 80, // Score between 0 and 100
    "skills": 85, // Score between 0 and 100
    "projects": 75, // Score between 0 and 100
    "experience": 90, // Score between 0 and 100
    "education": 95, // Score between 0 and 100
    "formatting": 80 // Score between 0 and 100
  },
  "recruiterFeedback": "A realistic, constructive recruiter paragraph summary summarizing how the candidate stands out and what single change would yield the highest interview rate improvement.",
  "recommendations": [
    "List of 4-7 actionable, prioritized steps to improve their resume overall."
  ]
}

Ensure that values like overallATS and resumeSectionsScore values are integers. Output only valid JSON.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse JSON
    const parsedData = JSON.parse(responseText);
    return parsedData;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(error.message || 'Failed to communicate with Gemini API. Check your network or API key.');
  }
};
