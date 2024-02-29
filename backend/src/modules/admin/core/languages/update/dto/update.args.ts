import { ArgsType, Field } from "@nestjs/graphql";

import { GraphQLUpload } from "@/src/utils/graphql-upload/GraphQLUpload";
import { FileUpload } from "@/src/utils/graphql-upload/Upload";

@ArgsType()
export class UpdateCoreAdminLanguagesArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field(() => String)
  code: string;
}
