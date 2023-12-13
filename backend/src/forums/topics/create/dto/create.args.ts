import { ArgsType, Field } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

import { TextLanguageInput } from '@/types/database/text-language.type';

@ArgsType()
export class CreateForumTopicsArgs {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Field(() => [TextLanguageInput])
  content: TextLanguageInput[];

  @Field(() => String)
  forum_id: string;
}
