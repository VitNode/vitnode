import { Mutation, Resolver } from '@nestjs/graphql';

import { TestCoreAiService } from './test.service';

@Resolver()
export class TestCoreAiResolver {
  constructor(private readonly service: TestCoreAiService) {}

  @Mutation(() => String)
  async core_ai__test(): Promise<string> {
    return this.service.test();
  }
}
