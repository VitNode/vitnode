import { ArgsType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';

@ArgsType()
export class UploadAvatarCoreMembersArgs {
  @Field(() => String)
  user_id: string;

  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
