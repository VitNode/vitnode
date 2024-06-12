import { ArgsType, Field } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "@vitnode/backend";

@ArgsType()
export class UpdateCoreAdminLanguagesArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field(() => String)
  code: string;
}
