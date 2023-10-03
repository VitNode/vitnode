import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLUpload, Upload } from 'graphql-upload-minimal';

@ArgsType()
export class UploadAvatarCoreMembersArgs {
  @Field(() => String)
  user_id: string;

  @Field(() => GraphQLUpload)
  file: Promise<Upload>;
}
