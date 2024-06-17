import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { TransformString } from "@vitnode/backend";

@ArgsType()
export class CreateAdminThemesArgs {
  @Transform(TransformString)
  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @Transform(TransformString)
  @IsNotEmpty()
  @Field(() => String)
  support_url: string;

  @Transform(TransformString)
  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  author: string;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  author_url: string | null;
}
