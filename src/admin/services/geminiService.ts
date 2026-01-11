
import { GoogleGenAI } from "@google/genai";

export const getDashboardInsights = async (stats: any) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  const model = "gemini-3-flash-preview";

  const prompt = `
    As an AI business analyst for a high-end Golf Club management software, analyze the following performance metrics and provide 3 concise, actionable insights (max 100 words total).
    
    Metrics:
    - Total Revenue: ${stats.revenue}
    - Total Bookings: ${stats.bookings}
    - Broker Commission: ${stats.commission}
    - Active Courses: ${stats.activeCourses}
    
    Output format: A short list of bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return "Unable to generate insights at this time.";
  }
};
