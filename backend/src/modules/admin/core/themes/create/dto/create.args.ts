import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { MaxLength, MinLength } from "class-validator";

import { TransformString } from "@/types/database/text-language.type";

@ArgsType()
export class CreateAdminThemesArgs {
  @Transform(TransformString)
  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  name: string;

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
