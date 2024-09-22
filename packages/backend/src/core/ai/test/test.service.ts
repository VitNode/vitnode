import { CustomError } from '@/errors';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { Injectable } from '@nestjs/common';
import { generateText } from 'ai';

import { AiService } from '../provider/ai.service';

@Injectable()
export class TestCoreAiService {
  constructor(private readonly aiService: AiService) {}

  async test(): Promise<string> {
    const google = createGoogleGenerativeAI({
      apiKey: '',
    });

    try {
      const result = await generateText({
        model: google('gemini-1.0-pro'),
        prompt: 'Tell me a joke',
      });
    } catch (error) {
      const err = error as Error;
      throw new CustomError({
        code: 'AI_ERROR',
        message: err.message,
      });
    }

    return 'test';
  }
}
