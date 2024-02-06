import { ArgsType, Field } from "@nestjs/graphql";
import {
  ArrayMinSize,
  IsArray,
  MaxLength,
  ValidateNested
} from "class-validator";

import { TextLanguageInput } from "@/types/database/text-language.type";

@ArgsType()
export class CreateAdminNavArgs {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Field(() => [TextLanguageInput])
  name: TextLanguageInput[];

  @IsArray()
  @ValidateNested({ each: true })
  @Field(() => [TextLanguageInput])
  description: TextLanguageInput[];

  @Field(() => Boolean)
  external: boolean;

  @Field(() => String)
  @MaxLength(255)
  href: string;
}
