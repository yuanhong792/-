interface KeywordRule {
  keyword: string;
  type: string;
  response: string;
}

interface KnowledgeOverviewItem {
  label: string;
  value: string;
}

interface ModelConfig {
  provider: string;
  apiKeyStatus: string;
  promptTemplates: string;
}

interface BotConfig {
  keywordRules: KeywordRule[];
  knowledgeBaseOverview: KnowledgeOverviewItem[];
  modelConfig: ModelConfig;
}

declare global {
  interface Window {
    botAPI?: {
      loadConfig: () => Promise<BotConfig>;
      updateModelConfig: (payload: Partial<ModelConfig>) => Promise<BotConfig>;
      importKeywordCsv: () => Promise<BotConfig>;
      exportKeywordCsv: () => Promise<boolean>;
      importKnowledgeCsv: () => Promise<BotConfig>;
      exportKnowledgeCsv: () => Promise<boolean>;
    };
  }
}

export {};
