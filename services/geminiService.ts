
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
    if (!apiKey) throw new Error("API_KEY_MISSING");

    const ai = new GoogleGenAI({ apiKey });
    
    const promptText = `
    사용자 정보:
    - 이름: ${userName}
    - 직무: ${input.job}
    - 직급: ${input.rank}
    - 선호 스타일: ${input.style}
    - 주요 고민: ${input.painPoint}

    위 정보를 바탕으로 업무 효율을 높여줄 창의적인 앱 기획안 3개를 생성해 주세요.
    반드시 한국어로 따뜻하고 전문적으로 응답하세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: promptText,
      config: {
        systemInstruction: `당신은 Eva, 비개발자를 위한 "쉬운 앱 도우미"입니다. 
        사용자 "${userName}"님에게 정중하고 따뜻하게 응답하며, 전문적인 앱 기획 역량을 발휘하세요.
        모든 응답은 유효한 JSON 형식이어야 합니다.`,
        responseMimeType: "application/json",
        responseSchema: evaResponseSchema,
      },
    });

    let text = response.text;
    if (!text) throw new Error("EMPTY_RESPONSE");
    
    // JSON 추출 로직 보강
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      text = jsonMatch[0];
    }
    
    return JSON.parse(text) as EvaResponse;

  } catch (error) {
    console.error("Gemini 서비스 상세 에러:", error);
    return null;
  }
};
