import { UploadCoreFilesObj } from '@/core/files/helpers/upload/upload.dto';
import { FileUpload, GraphQLUpload } from '@/graphql-upload';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class UploadAvatarCoreMembersArgs {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;
}

@ObjectType()
export class UploadAvatarCoreMembersObj extends UploadCoreFilesObj {
  @Field(() => Int)
  id: number;
}
