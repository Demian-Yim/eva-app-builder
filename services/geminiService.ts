
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { UserInput, EvaResponse } from "../types";

// Define the schema for the structured response
const evaResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    userUnderstanding: { type: Type.STRING, description: "Analysis of the user's situation and needs." },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          features: { type: Type.ARRAY, items: { type: Type.STRING } },
          targetAudience: { type: Type.STRING },
          difficulty: { type: Type.STRING },
          detailedDesign: {
            type: Type.OBJECT,
            properties: {
              structure: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of screen names" },
              buttons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of button/menu names" },
              dataStructure: { type: Type.STRING, description: "Simple table description of data" },
              flow: { type: Type.STRING, description: "Simple flow description A -> B -> C" },
              aiFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of AI features" },
            },
            required: ["structure", "buttons", "dataStructure", "flow", "aiFeatures"],
          },
          prompt: {
            type: Type.OBJECT,
            properties: {
              appName: { type: Type.STRING },
              purpose: { type: Type.STRING },
              techStack: { type: Type.STRING, description: "Detailed tech stack (React, Tailwind, Lucide, etc.)" },
              requirements: { type: Type.STRING, description: "Detailed functional requirements" },
              components: { type: Type.STRING, description: "List of React components needed" },
              dataModel: { type: Type.STRING, description: "Technical data interface definitions" },
              stepByStepImplementation: { type: Type.STRING, description: "Implementation steps" },
              finalRequest: { type: Type.STRING, description: "Closing statement for the prompt" },
            },
            required: ["appName", "purpose", "techStack", "requirements", "components", "dataModel", "stepByStepImplementation", "finalRequest"],
          },
        },
        required: ["id", "name", "description", "features", "targetAudience", "difficulty", "detailedDesign", "prompt"],
      },
    },
  },
  required: ["userUnderstanding", "recommendations"],
};

export const generateAppPlan = async (input: UserInput, userName: string): Promise<EvaResponse | null> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey });

    const promptText = `
    당신은 Eva, 비개발자를 위한 "쉬운 앱 도우미"입니다.
    사용자 이름은 "${userName}"입니다. 절대로 다른 이름(예: 데미안)을 사용하지 마세요. 
    오직 "${userName}"님이라고만 불러주세요.

    사용자(${userName})가 입력한 정보를 바탕으로 앱 기획안을 작성해주세요.
    
    [사용자 정보]
    - 직무: ${input.job}
    - 직급: ${input.rank}
    - 좋아하는 스타일/기능: ${input.style}
    - 고민: ${input.painPoint}

    위 정보를 바탕으로 다음 단계들을 수행하여 JSON으로 응답해 주세요:
    1. 사용자 이해하기: ${userName}님의 상황을 고려하여 3줄 요약.
    2. 앱 3가지 추천:
       - 각 앱마다 '상세 기획(화면, 버튼, 데이터, 흐름)'과 '바로 만들기용 프롬프트'를 모두 포함해야 합니다.
       - 프롬프트 내용은 아주 구체적이고 기술적이어야 합니다. (React, Tailwind CSS, Lucide React 사용 명시)
       - 프롬프트의 'techStack'에는 "Single file index.html with React, Tailwind CSS via CDN, Lucide Icons"를 반드시 포함하세요.

    반드시 한국어로 정중하게(${userName}님 호칭 사용) 작성해주세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: evaResponseSchema,
      },
    });

    const text = response.text;
    if (!text) return null;
    
    // Add IDs if missing (safety check)
    const parsed = JSON.parse(text) as EvaResponse;
    parsed.recommendations = parsed.recommendations.map((rec, index) => ({
        ...rec,
        id: index
    }));
    
    return parsed;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
