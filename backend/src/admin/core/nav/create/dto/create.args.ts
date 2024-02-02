import { ArgsType, Field } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

import { TextLanguageInput } from '@/types/database/text-language.type';

@ArgsType()
export class CreateAdminNavArgs {
  @Field(() => [TextLanguageInput])
  @MinLength(3)
  @MaxLength(50)
  name: TextLanguageInput[];

  @Field(() => [TextLanguageInput])
  @MaxLength(50)
  description: TextLanguageInput[];

  @Field(() => Boolean)
  external: boolean;

  @Field(() => Number)
  parent_id: number;

  @Field(() => String)
  @MaxLength(255)
  href: string;
}
