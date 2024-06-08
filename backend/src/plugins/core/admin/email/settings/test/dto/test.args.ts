import { ArgsType, Field, OmitType } from "@nestjs/graphql";
import { Transform } from "class-transformer";

import { SendAdminEmailServiceArgs } from "../../../send/dto/send.args";
import { TransformString } from "@/utils/types/database/text-language.type";

@ArgsType()
export class TestAdminEmailSettingsServiceArgs extends OmitType(
  SendAdminEmailServiceArgs,
  ["message", "html"] as const
) {
  @Field(() => String)
  @Transform(TransformString)
  message: string;
}
