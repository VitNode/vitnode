import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { TransformString } from "vitnode-backend";

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

  @Field(() => String, { nullable: true })
  parent_code: string | null;
}
