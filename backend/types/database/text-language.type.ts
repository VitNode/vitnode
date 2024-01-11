import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TextLanguage {
  @Field(() => String)
  value: string;

  @Field(() => String)
  language_code: string;
}

@InputType()
export class TextLanguageInput {
  @Field(() => String)
  value: string;

  @Field(() => String)
  language_code: string;
}
