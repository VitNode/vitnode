import { GraphQLUpload } from "@/utils/graphql-upload/GraphQLUpload";
import { FileUpload } from "@/utils/graphql-upload/Upload";
import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class UploadAdminPluginsArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
