import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { MaxLength, MinLength } from "class-validator";

import { TransformString } from "@/types/database/text-language.type";

@ArgsType()
export class CreateAdminNavPluginsArgs {
  @Field(() => String)
  plugin_code: string;

  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  @Transform(TransformString)
  code: string;

  @Field(() => String, { nullable: true })
  icon: string | null;
}
