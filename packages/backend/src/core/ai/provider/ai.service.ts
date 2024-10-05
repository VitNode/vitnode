import { CustomError } from '@/errors';
import { Inject, Injectable } from '@nestjs/common';
import { generateText, LanguageModel, streamText } from 'ai';

import { HelpersCoreAi } from '../ai.helpers';

@Injectable()
export class AiService extends HelpersCoreAi {
  constructor(
    @Inject('VITNODE_AI_MODEL')
    private readonly model?: LanguageModel,
  ) {
    super();
  }

  private getModel(): LanguageModel {
    if (!this.model) {
      throw new CustomError({
        code: 'AI_PROVIDER_NOT_SET',
        message: 'AI provider is not set.',
      });
    }

    return this.model;
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

  async streamText(args: Omit<Parameters<typeof generateText>[0], 'model'>) {
    try {
      const result = await streamText({
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
