import { ArgsType, Field } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "vitnode-backend";

@ArgsType()
export class UploadAdminPluginsArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field(() => String, { nullable: true })
  code: string | null;
}
