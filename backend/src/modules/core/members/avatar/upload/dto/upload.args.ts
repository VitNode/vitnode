import { ArgsType, Field } from "@nestjs/graphql";

import { FileUpload } from "@/src/utils/graphql-upload/Upload";
import { GraphQLUpload } from "@/src/utils/graphql-upload/GraphQLUpload";

@ArgsType()
export class UploadAvatarCoreMembersArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
