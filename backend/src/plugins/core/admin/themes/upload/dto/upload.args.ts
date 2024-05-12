import { ArgsType, Field, Int } from "@nestjs/graphql";

import { FileUpload } from "@/utils/graphql-upload/uploads";
import { GraphQLUpload } from "@/utils/graphql-upload/graphql-upload";

@ArgsType()
export class UploadAdminThemesArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field(() => Int, { nullable: true })
  id: number | null;
}
