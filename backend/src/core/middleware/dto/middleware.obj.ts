import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class LanguageCoreMiddlewareObj {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  timezone: string;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  enabled: boolean;
}

@ObjectType()
export class CoreMiddlewareObj {
  @Field(() => [LanguageCoreMiddlewareObj])
  languages: LanguageCoreMiddlewareObj[];

  @Field(() => String)
  default_language: string;
}
