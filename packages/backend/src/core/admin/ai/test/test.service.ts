import { AiService } from '@/core/ai/provider/ai.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestAdminCoreAiService {
  constructor(private readonly aiService: AiService) {}

  async test(prompt: string): Promise<string> {
    const results = await this.aiService.generateText({
      prompt,
    });

    return results.text;
  }
}
