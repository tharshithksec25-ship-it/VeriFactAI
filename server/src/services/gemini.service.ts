import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY is missing from environment variables.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const SYSTEM_PROMPT = `
You are an expert credibility analyst. Your task is to analyze the provided text and determine its trustworthiness.

You must output strict JSON in the following format:
{
  "content_type": "news | social_media | claim | image_claim | video_claim",
  "identified_claims": [string],
  "credibility_score": number (0-100),
  "credibility_level": "High | Medium | Low | Uncertain",
  "risk_indicators": [string],
  "analysis_summary": string,
  "responsible_ai_notice": string
}

Be objective, skeptical, and thorough. 
If the input content is harmful, hateful, or explicit, refuse to analyze it and set "credibility_score" to 0 and "analysis_summary" to "Content flagged as unsafe/violating policy."
`;

// Helper to strip markdown code blocks if present
const stripMarkdown = (text: string): string => {
    // Remove ```json and ``` wrappers if present
    return text.replace(/^```json\s*\n?/i, '').replace(/\n?```\s*$/, '').trim();
};

export const analyzeContent = async (text: string) => {
    try {
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: SYSTEM_PROMPT },
                        { text: `\n\nAnalyze this content:\n"${text}"` }
                    ]
                }
            ],
            generationConfig: {
                responseMimeType: "application/json",
            }
        });

        const response = await result.response;
        const rawText = response.text();

        console.log("Raw Gemini Response:", rawText.substring(0, 200)); // Log first 200 chars

        const cleanedText = stripMarkdown(rawText);
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Gemini API Error Details:", error);
        if (error instanceof Error) {
            console.error("Error message:", error.message);
            console.error("Error stack:", error.stack);
        }
        throw new Error("Failed to analyze content.");
    }
};
