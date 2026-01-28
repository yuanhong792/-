
export enum ModelType {
  FLASH = 'gemini-3-flash-preview',
  PRO = 'gemini-3-pro-preview',
  IMAGE = 'gemini-2.5-flash-image'
}

export interface KnowledgeItem {
  id: string;
  name: string;
  content: string;
  type: 'text' | 'file';
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  systemInstruction: string;
  model: ModelType;
  avatarUrl: string;
  knowledgeBase: KnowledgeItem[];
  createdAt: number;
}

export interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export interface ChatHistory {
  agentId: string;
  messages: Message[];
}
