import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

import { TransformString } from "@/types/database/text-language.type";

@ArgsType()
export class EditGeneralAdminSettingsArgs {
  @Transform(TransformString)
  @IsNotEmpty()
  @Field(() => String)
  side_name: string;
}
