import { ChatOpenAI, OpenAIEmbeddings, AzureOpenAI, OpenAIEmbeddingsParams, AzureOpenAIInput } from '@langchain/openai';
import { getOpenaiApiKey,getNvidiaApiKey, getAzureApiKey } from '../../config';
import logger from '../../utils/logger';

export const loadOpenAIChatModels = async () => {
  const openAIApiKey = getOpenaiApiKey();
  const NvidiaApiKey = getNvidiaApiKey();
  if (!openAIApiKey) return {};

  try {
    const chatModels = {
      'meta/llama-3.1-405b-instruct': new ChatOpenAI({
        openAIApiKey: NvidiaApiKey,
        modelName: 'meta/llama-3.1-405b-instruct',
        temperature: 0.7,
        configuration: {
          baseURL: "https://integrate.api.nvidia.com/v1",
        },
        //baseUrl: "https://integrate.api.nvidia.com/v1/chat/completions",
      }),
      'GPT-3.5 turbo': new ChatOpenAI({
        openAIApiKey,
        modelName: 'gpt-3.5-turbo',
        temperature: 0.7,
      }),
      'GPT-4': new ChatOpenAI({
        openAIApiKey,
        modelName: 'gpt-4',
        temperature: 0.7,
      }),
      'GPT-4 turbo': new ChatOpenAI({
        openAIApiKey,
        modelName: 'gpt-4-turbo',
        temperature: 0.7,
      }),
      'GPT-4 omni': new ChatOpenAI({
        openAIApiKey,
        modelName: 'gpt-4o',
        temperature: 0.7,
      }),
      'GPT-4 omni mini': new ChatOpenAI({
        openAIApiKey,
        modelName: 'gpt-4o-mini',
        temperature: 0.7,
      }),
    };

    return chatModels;
  } catch (err) {
    logger.error(`Error loading OpenAI models: ${err}`);
    return {};
  }
};

export const loadOpenAIEmbeddingsModels = async () => {
  const openAIApiKey = getOpenaiApiKey();
  const NvidiaApiKey = getNvidiaApiKey();
  const AzureApiKey = getAzureApiKey();
  if (!openAIApiKey) return {};

  try {
    const embeddingModels = {
      'Text embedding 3 small Azure': new OpenAIEmbeddings({
        azureOpenAIApiKey: AzureApiKey,
        azureOpenAIApiInstanceName: "cog-blwrhurbg442k",
        azureOpenAIApiDeploymentName: "embedding",
        azureOpenAIApiVersion: "1",
        modelName: 'text-embedding-3-small', // 'text-embedding-3-small',
      }as Partial<OpenAIEmbeddingsParams> & Partial<AzureOpenAIInput>),
      'Text embedding 3 small': new OpenAIEmbeddings({
        openAIApiKey,
        modelName: 'text-embedding-3-small',
        //baseUrl: "https://integrate.api.nvidia.com/v1/chat/completions",
      }),
      'Text embedding 3 large': new OpenAIEmbeddings({
        openAIApiKey,
        modelName: 'text-embedding-3-large',
      }),
    };

    return embeddingModels;
  } catch (err) {
    logger.error(`Error loading OpenAI embeddings model: ${err}`);
    return {};
  }
};
