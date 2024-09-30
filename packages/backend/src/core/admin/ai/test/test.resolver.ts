import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { TestAdminCoreAiService } from './test.service';

@Resolver()
export class TestAdminCoreAiResolver {
  constructor(private readonly service: TestAdminCoreAiService) {}

  @Mutation(() => String)
  async admin__core_ai__test(
    @Args('prompt', { type: () => String }) prompt: string,
  ): Promise<string> {
    return this.service.test(prompt);
  }
}
