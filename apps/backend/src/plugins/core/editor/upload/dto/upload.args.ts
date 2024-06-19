import { ArgsType, Field } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "vitnode-backend";

@ArgsType()
export class UploadCoreEditorArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field(() => String)
  folder: string;

  @Field(() => String)
  plugin: string;
}
