import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, Min, ValidateNested } from 'class-validator';
import { Transform } from 'class-transformer';

import {
  IsTextLanguageInput,
  TextLanguageInput,
  TransformTextLanguageInput,
} from '../../../../../utils';

@InputType()
export class ContentCreateAdminGroups {
  @Field(() => Boolean)
  files_allow_upload: boolean;

  @Field(() => Int)
  @Min(-1)
  files_total_max_storage: number;

  @Field(() => Int)
  @Min(-1)
  files_max_storage_for_submit: number;
}

@ArgsType()
export class CreateAdminGroupsArgs {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];

  @Field(() => ContentCreateAdminGroups)
  content: ContentCreateAdminGroups;
}
