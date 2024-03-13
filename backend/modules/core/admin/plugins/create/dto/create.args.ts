import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsOptional, Matches, MaxLength, MinLength } from "class-validator";

import { TransformString } from "@/types/database/text-language.type";

@ArgsType()
export class CreateAdminPluginsArgs {
  @Transform(TransformString)
  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @Transform(TransformString)
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-z0-9-]*$/)
  @Field(() => String)
  code: string;

  @Transform(TransformString)
  @MaxLength(255)
  @IsOptional()
  @Field(() => String, { nullable: true })
  description: string | null;

  @Transform(TransformString)
  @Field(() => String)
  support_url: string;

  @Transform(TransformString)
  @MinLength(3)
  @MaxLength(100)
  @Field(() => String)
  author: string;

  @Transform(TransformString)
  @IsOptional()
  @Field(() => String, { nullable: true })
  author_url: string | null;
}
