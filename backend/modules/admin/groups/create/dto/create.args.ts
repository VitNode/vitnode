import { ArgsType, Field } from "@nestjs/graphql";
import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { Transform } from "class-transformer";

import {
  IsTextLanguageInput,
  TextLanguageInput,
  TransformTextLanguageInput
} from "@/types/database/text-language.type";

@ArgsType()
export class CreateAdminGroupsArgs {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsTextLanguageInput()
  @Transform(TransformTextLanguageInput)
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];
}
