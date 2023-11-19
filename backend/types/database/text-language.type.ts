import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TextLanguage {
  @Field(() => String)
  name: string;

  @Field(() => String)
  id_language: string;
}
