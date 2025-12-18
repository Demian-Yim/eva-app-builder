
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, EvaResponse } from "../types";

const evaResponseSchema: any = {
  type: Type.OBJECT,
  properties: {
    userUnderstanding: { type: Type.STRING },
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
              structure: { type: Type.ARRAY, items: { type: Type.STRING } },
              buttons: { type: Type.ARRAY, items: { type: Type.STRING } },
              dataStructure: { type: Type.STRING },
              flow: { type: Type.STRING },
              aiFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["structure", "buttons", "dataStructure", "flow", "aiFeatures"],
          },
          prompt: {
            type: Type.OBJECT,
            properties: {
              appName: { type: Type.STRING },
              purpose: { type: Type.STRING },
              techStack: { type: Type.STRING },
              requirements: { type: Type.STRING },
              components: { type: Type.STRING },
              dataModel: { type: Type.STRING },
              stepByStepImplementation: { type: Type.STRING },
              finalRequest: { type: Type.STRING },
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
    if (!apiKey) return null;

    const ai = new GoogleGenAI({ apiKey });
    const promptText = `
    당신은 Eva, 비개발자를 위한 "쉬운 앱 도우미"입니다. 사용자 이름은 "${userName}"님입니다.
    다음 정보를 바탕으로 3가지 앱 기획안을 JSON 형식으로 작성해주세요.
    - 직무: ${input.job}, 직급: ${input.rank}, 스타일: ${input.style}, 고민: ${input.painPoint}
    모든 설명은 한국어로 정중하게 작성해야 하며, 기술 스택에는 React와 Tailwind CSS를 포함하세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: evaResponseSchema,
      },
    });

    if (!response.text) return null;
    return JSON.parse(response.text) as EvaResponse;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
