import { CustomError } from '@/errors';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { Injectable } from '@nestjs/common';
import { generateText, LanguageModel } from 'ai';

import { HelpersCoreAi } from '../ai.helpers';

@Injectable()
export class AiService extends HelpersCoreAi {
  private getModel(): LanguageModel {
    const aiCredentials = this.getAiCredentials();

    const google = createGoogleGenerativeAI({
      apiKey: aiCredentials.key,
    });

    return google('gemini-1.0-pro');
  }

  async generateText(args: Omit<Parameters<typeof generateText>[0], 'model'>) {
    try {
      const result = await generateText({
        model: this.getModel(),
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
