import { ArgsType, Field } from "@nestjs/graphql";

import { FileUpload } from "@/utils/graphql-upload/uploads";
import { GraphQLUpload } from "@/utils/graphql-upload/graphql-upload";

@ArgsType()
export class UploadAdminPluginsArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field(() => String, { nullable: true })
  code: string | null;
}
