import { AiProvider } from '@/providers';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EditAdminCoreAiArgs {
  @Field(() => String, { nullable: true })
  key: null | string;

  @Field(() => AiProvider)
  provider: AiProvider;
}
