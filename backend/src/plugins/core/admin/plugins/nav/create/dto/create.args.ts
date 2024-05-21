import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

import { TransformString } from "@/utils/types/database/text-language.type";

@ArgsType()
export class CreateAdminNavPluginsArgs {
  @Field(() => String)
  plugin_code: string;

  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  @Transform(TransformString)
  code: string;

  @MaxLength(100)
  @Transform(TransformString)
  @IsNotEmpty()
  @Field(() => String)
  href: string;

  @Field(() => String, { nullable: true })
  icon: string | null;
}
