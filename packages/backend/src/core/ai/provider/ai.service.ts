import { CustomError } from '@/errors';
import { AiProvider } from '@/providers';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { Injectable } from '@nestjs/common';
import { generateText, LanguageModel, streamText } from 'ai';

import { HelpersCoreAi } from '../ai.helpers';

@Injectable()
export class AiService extends HelpersCoreAi {
  private getModel(): LanguageModel | undefined {
    const aiCredentials = this.getAiCredentials();

    if (aiCredentials.provider === AiProvider.none || !aiCredentials.model) {
      return;
    }

    if (aiCredentials.provider === AiProvider.google) {
      const google = createGoogleGenerativeAI({
        apiKey: aiCredentials.key,
      });

      return google(aiCredentials.model);
    }

    const openai = createOpenAI({
      apiKey: aiCredentials.key,
    });

    return openai(aiCredentials.model);
  }

  async generateText(args: Omit<Parameters<typeof generateText>[0], 'model'>) {
    const model = this.getModel();
    if (!model) {
      throw new CustomError({
        code: 'AI_PROVIDER_NOT_SET',
        message: 'AI provider is not set.',
      });
    }

    try {
      const result = await generateText({
        model,
        ...args,
      });

      return result;
    } catch (error) {
      const err = error as Error;
      throw new CustomError({
        code: 'AI_ERROR',
        message: err.message,
      });
    }
  }

  async streamText(args: Omit<Parameters<typeof generateText>[0], 'model'>) {
    const model = this.getModel();
    if (!model) {
      throw new CustomError({
        code: 'AI_PROVIDER_NOT_SET',
        message: 'AI provider is not set.',
      });
    }

    try {
      const result = await streamText({
        model,
        ...args,
      });

      return result;
    } catch (error) {
      const err = error as Error;
      throw new CustomError({
        code: 'AI_ERROR',
        message: err.message,
      });
    }
  }
}
