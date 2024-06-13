import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LanguagesCoreMiddlewareObj {
  @Field(() => String)
  code: string;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Boolean)
  default: boolean;
}
