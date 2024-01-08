import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';

import { TextLanguageInput } from '@/types/database/text-language.type';

@ArgsType()
export class EditAdminGroupsArgs {
  @Field(() => Int)
  id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];
}
