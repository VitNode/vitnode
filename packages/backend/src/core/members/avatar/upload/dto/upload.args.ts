import { ArgsType, Field } from '@nestjs/graphql';

import { FileUpload, GraphQLUpload } from '../../../../../graphql-upload';

@ArgsType()
export class UploadAvatarCoreMembersArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}
