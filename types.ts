
export interface UserInput {
  job: string;
  rank: string;
  style: string;
  painPoint: string;
}

export interface DetailedDesign {
  structure: string[];
  buttons: string[];
  dataStructure: string;
  flow: string;
  aiFeatures: string[];
}

export interface PromptData {
  appName: string;
  purpose: string;
  techStack: string;
  requirements: string;
  components: string;
  dataModel: string;
  stepByStepImplementation: string;
  finalRequest: string;
}

export interface AppRecommendation {
  id: number;
  name: string;
  description: string;
  features: string[];
  targetAudience: string;
  difficulty: string; // Keep for internal logic, but maybe not display if requested
  detailedDesign: DetailedDesign;
  prompt: PromptData;
}

export interface EvaResponse {
  userUnderstanding: string;
  recommendations: AppRecommendation[];
}
