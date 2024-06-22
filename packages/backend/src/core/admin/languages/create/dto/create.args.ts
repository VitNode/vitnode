import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

import { TransformString } from "../../../../../utils";

@ArgsType()
export class CreateCoreAdminLanguagesArgs {
  @Transform(TransformString)
  @Field(() => String)
  code: string;

  @Transform(TransformString)
  @IsNotEmpty()
  @Field(() => String)
  name: string;

  @Transform(TransformString)
  @IsNotEmpty()
  @Field(() => String)
  timezone: string;

  @Field(() => Boolean)
  time_24: boolean;

  @Field(() => Boolean)
  allow_in_input: boolean;

  @Field(() => String)
  @IsNotEmpty()
  locale: string;
}
