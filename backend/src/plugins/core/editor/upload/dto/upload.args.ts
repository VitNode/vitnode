import { ArgsType, Field } from "@nestjs/graphql";

import { FileUpload } from "@/utils/graphql-upload/upload";
import { GraphQLUpload } from "@/utils/graphql-upload/graphql-upload";

@ArgsType()
export class UploadCoreEditorArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field(() => String)
  folder: string;

  @Field(() => String)
  plugin: string;
}
