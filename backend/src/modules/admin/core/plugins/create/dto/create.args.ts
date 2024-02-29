import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { Matches, MaxLength, MinLength } from "class-validator";

import { TransformString } from "@/src/types/database/text-language.type";

@ArgsType()
export class CreateAdminPluginsArgs {
  @Transform(TransformString)
  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @Transform(TransformString)
  @Field(() => String)
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-z0-9-]*$/)
  code: string;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  @MaxLength(255)
  description: string | null;

  @Transform(TransformString)
  @Field(() => String)
  support_url: string;

  @Transform(TransformString)
  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  author: string;

  @Transform(TransformString)
  @Field(() => String)
  author_url: string;
}
