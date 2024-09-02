import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowCorePluginsObj {
  @Field(() => Boolean)
  allow_default: boolean;

  @Field(() => String)
  code: string;
}
