import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { LanguageModel } from 'ai';

export const aiGoogle = ({
  api_key = '',
  model,
}: {
  api_key: string | undefined;
  model:
    | 'gemini-1.0-pro'
    | 'gemini-1.5-flash'
    | 'gemini-1.5-flash-latest'
    | 'gemini-1.5-pro'
    | 'gemini-1.5-pro-latest'
    | 'gemini-pro';
}): LanguageModel => {
  const google = createGoogleGenerativeAI({
    apiKey: api_key,
  });

  return google(model);
};
