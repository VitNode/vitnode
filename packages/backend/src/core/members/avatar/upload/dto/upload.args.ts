import { FileUpload, GraphQLUpload } from '@/graphql-upload';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UploadAvatarCoreMembersArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
