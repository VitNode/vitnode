import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsEmail } from "class-validator";

import { TransformString } from "@/utils/types/database/text-language.type";

@ArgsType()
export class SendAdminEmailSettingsServiceArgs {
  @IsEmail()
  @Field(() => String)
  @Transform(TransformString)
  to: string;

  @IsEmail()
  @Field(() => String)
  @Transform(TransformString)
  from: string;
}
