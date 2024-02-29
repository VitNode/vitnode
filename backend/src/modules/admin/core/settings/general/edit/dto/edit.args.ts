import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";

import { TransformString } from "@/src/types/database/text-language.type";

@ArgsType()
export class EditGeneralAdminSettingsArgs {
  @Transform(TransformString)
  @Field(() => String)
  side_name: string;
}
