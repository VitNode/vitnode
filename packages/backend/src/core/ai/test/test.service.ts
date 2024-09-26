import { Injectable } from '@nestjs/common';

import { AiService } from '../provider/ai.service';

@Injectable()
export class TestCoreAiService {
  constructor(private readonly aiService: AiService) {}

  async test(): Promise<string> {
    const results = await this.aiService.generateText({
      prompt: 'Tell me a joke',
    });

    return 'test';
  }
}
