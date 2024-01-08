import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

import { GraphQLUpload } from '@/utils/graphql-upload/GraphQLUpload';
import { FileUpload } from '@/utils/graphql-upload/Upload';

@ArgsType()
export class UploadCoreAttachmentsArgs {
  @Field(() => [FilesObj])
  files: FilesObj[];

  @Field(() => Number)
  maxUploadSizeBytes: number;

  @Field(() => [String])
  acceptMimeType: string[];

  @Field(() => String)
  module: string;

  @Field(() => Int)
  module_id: number;
}

@ObjectType()
export class FilesObj {
  @Field(() => GraphQLUpload)
  file: Promise<FileUpload>;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Int)
  position: number;
}
