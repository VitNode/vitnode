import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";

import { TransformString } from "@/types/database/text-language.type";

@ArgsType()
export class CreateCoreAdminLanguagesArgs {
  @Transform(TransformString)
  @Field(() => String)
  code: string;

  @Transform(TransformString)
  @Field(() => String)
  name: string;

  @Transform(TransformString)
  @Field(() => String)
  timezone: string;
}
