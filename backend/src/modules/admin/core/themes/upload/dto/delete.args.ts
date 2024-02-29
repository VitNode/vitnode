import { ArgsType, Field } from "@nestjs/graphql";

import { GraphQLUpload } from "@/src/utils/graphql-upload/GraphQLUpload";
import { FileUpload } from "@/src/utils/graphql-upload/Upload";

@ArgsType()
export class UploadAdminThemesArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
