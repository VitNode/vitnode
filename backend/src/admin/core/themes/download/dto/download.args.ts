import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Transform } from "class-transformer";

import { TransformString } from "@/types/database/text-language.type";

@ArgsType()
export class DownloadAdminThemesArgs {
  @Field(() => Int)
  id: number;

  @Transform(TransformString)
  @Field(() => String, { nullable: true })
  version: string | null;

  @Field(() => Int, { nullable: true })
  version_code: number | null;
}
