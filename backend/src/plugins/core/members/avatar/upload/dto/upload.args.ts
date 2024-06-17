import { ArgsType, Field } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "@vitnode/backend";

@ArgsType()
export class UploadAvatarCoreMembersArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
