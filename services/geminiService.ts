
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, EvaResponse } from "../types";

const evaResponseSchema: any = {
  type: Type.OBJECT,
  properties: {
    userUnderstanding: { 
      type: Type.STRING, 
      description: "사용자의 현재 상황과 고민에 대한 Eva의 따뜻한 공감과 분석 (3줄 내외)" 
    },
    recommendations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          name: { type: Type.STRING, description: "앱의 창의적이고 직관적인 한글 이름" },
          description: { type: Type.STRING, description: "앱의 목적과 가치를 설명하는 한 줄 문구" },
          features: { type: Type.ARRAY, items: { type: Type.STRING }, description: "핵심 기능 3-4가지" },
          targetAudience: { type: Type.STRING },
          difficulty: { type: Type.STRING, description: "쉬움 / 보통 / 도전적 중 선택" },
          detailedDesign: {
            type: Type.OBJECT,
            properties: {
              structure: { type: Type.ARRAY, items: { type: Type.STRING }, description: "주요 화면들" },
              buttons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "주요 메뉴 및 버튼" },
              dataStructure: { type: Type.STRING, description: "필요한 데이터 관리 방식" },
              flow: { type: Type.STRING, description: "사용자의 앱 사용 흐름" },
              aiFeatures: { type: Type.ARRAY, items: { type: Type.STRING }, description: "적용 가능한 AI 스마트 기능" },
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
      console.error("API_KEY가 설정되지 않았습니다. Vercel 환경 변수를 확인해주세요.");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const promptText = `
    다음은 사용자 "${userName}"님의 정보입니다:
    - 직무: ${input.job}
    - 직급: ${input.rank}
    - 원하는 기능: ${input.style}
    - 현재 고민: ${input.painPoint}

    위 정보를 바탕으로 데미안(사용자)님의 업무 효율을 극대화할 수 있는 맞춤형 앱 기획안 3개를 제안해 주세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: promptText,
      config: {
        systemInstruction: `당신은 Eva, 비개발자를 위한 "쉬운 앱 도우미"입니다. 
        사용자 "${userName}"님에게 정중하고 따뜻하게 응답하며, 전문적인 앱 기획 역량을 발휘하세요.
        모든 응답은 한국어로 작성해야 하며, 기술 스택에는 반드시 React, Tailwind CSS, Lucide Icons를 포함해야 합니다.`,
        responseMimeType: "application/json",
        responseSchema: evaResponseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("API 응답이 비어있습니다.");
    
    return JSON.parse(text) as EvaResponse;

  } catch (error) {
    console.error("Gemini 서비스 상세 에러:", error);
    return null;
  }
};
