import { ArgsType, Field } from "@nestjs/graphql";

import { GraphQLUpload } from "@/utils/graphql-upload/GraphQLUpload";
import { FileUpload } from "@/utils/graphql-upload/Upload";

@ArgsType()
export class UploadAdminThemesArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
