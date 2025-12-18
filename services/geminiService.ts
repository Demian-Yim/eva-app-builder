
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, EvaResponse } from "../types";

const evaResponseSchema: any = {
  type: Type.OBJECT,
  properties: {
    userUnderstanding: { type: Type.STRING, description: "사용자의 상황에 대한 Eva의 따뜻한 분석 (3줄 내외)" },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          name: { type: Type.STRING, description: "앱의 창의적인 한글 이름" },
          description: { type: Type.STRING, description: "앱에 대한 매력적인 설명" },
          features: { type: Type.ARRAY, items: { type: Type.STRING }, description: "핵심 기능 리스트" },
          targetAudience: { type: Type.STRING },
          difficulty: { type: Type.STRING, description: "제작 난이도 (쉬움/보통/도전적)" },
          detailedDesign: {
            type: Type.OBJECT,
            properties: {
              structure: { type: Type.ARRAY, items: { type: Type.STRING }, description: "주요 화면 구성" },
              buttons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "주요 버튼 및 메뉴" },
              dataStructure: { type: Type.STRING, description: "데이터 구조 설명" },
              flow: { type: Type.STRING, description: "사용자 경험 흐름" },
              aiFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "적용될 AI 기능" },
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
    if (!apiKey) {
      console.error("API_KEY가 설정되지 않았습니다.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    const promptText = `
    당신은 Eva, 비개발자를 위한 "쉬운 앱 도우미"입니다. 
    당신의 소중한 사용자 "${userName}"님을 위해 맞춤형 앱 기획안을 작성해야 합니다.
    
    [사용자 입력 정보]
    - 직무: ${input.job}
    - 직급: ${input.rank}
    - 선호 기능: ${input.style}
    - 현재 고민: ${input.painPoint}

    [지침]
    1. 반드시 한국어로 답변하세요.
    2. "${userName}"님에게 정중하고 친절한 어조를 유지하세요.
    3. JSON 형식을 엄격히 준수하세요.
    4. 기획안은 총 3개를 제안하세요.
    5. 프롬프트 내 기술 스택에는 "React, Tailwind CSS, Lucide Icons"를 반드시 포함하세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: evaResponseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("응답 텍스트가 비어있습니다.");
    
    const parsed = JSON.parse(text);
    return parsed as EvaResponse;

  } catch (error) {
    console.error("Gemini 서비스 에러:", error);
    return null;
  }
};
