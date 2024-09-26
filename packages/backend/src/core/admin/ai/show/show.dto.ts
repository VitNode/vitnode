import { AiProvider } from '@/providers';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(AiProvider, {
  name: 'AiProvider',
});

@ObjectType()
export class ShowAdminCoreAiObj {
  @Field(() => AiProvider)
  provider: AiProvider;
}
