import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TextLanguage {
  @Field(() => String)
  value: string;

  @Field(() => String)
  id_language: string;
}

@InputType()
export class TextLanguageInput {
  @Field(() => String)
  value: string;

  @Field(() => String)
  id_language: string;
}
