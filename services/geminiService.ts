
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { ModelType, Message } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateText = async (
  prompt: string,
  model: ModelType = ModelType.FLASH,
  systemInstruction?: string
): Promise<string> => {
  const ai = getAI();
  const response: GenerateContentResponse = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction,
    },
  });
  return response.text || '';
};

export const generateImage = async (prompt: string): Promise<string> => {
  const ai = getAI();
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: ModelType.IMAGE,
    contents: {
      parts: [{ text: `Generate a high-quality professional square avatar icon for: ${prompt}. Minimalist, artistic, and modern style.` }],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
      },
    },
  });

  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Failed to generate image");
};

export const chatWithAgent = async (
  messages: Message[],
  model: ModelType,
  systemInstruction: string
): Promise<string> => {
  const ai = getAI();
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction,
    },
  });

  // Re-establish history excluding the last message (which we will send as the prompt)
  const history = messages.slice(0, -1).map(m => ({
    role: m.role,
    parts: m.parts
  }));

  // Unfortunately the simplified library wrapper 'chats.create' doesn't easily take history in this version's 'sendMessage'
  // So we use generateContent for standard Turn-based simulation if needed or direct chat.
  // We'll stick to generateContent for better control over the full context.
  
  const response = await ai.models.generateContent({
    model,
    contents: messages,
    config: {
      systemInstruction,
    }
  });

  return response.text || '';
};
