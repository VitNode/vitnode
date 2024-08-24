import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class LanguageCoreMiddlewareObj {
  @Field(() => String)
  code: string;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  timezone: string;
}

@ObjectType()
export class CoreMiddlewareObj {
  @Field(() => String)
  default_language: string;

  @Field(() => [LanguageCoreMiddlewareObj])
  languages: LanguageCoreMiddlewareObj[];
}
