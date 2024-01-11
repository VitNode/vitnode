import { ArgsType, Field } from '@nestjs/graphql';

import { GraphQLUpload } from '@/utils/graphql-upload/GraphQLUpload';
import { FileUpload } from '@/utils/graphql-upload/Upload';

@ArgsType()
export class UploadCoreFilesArgs {
  @Field(() => [GraphQLUpload])
  files: Promise<FileUpload>[];

  @Field(() => Number)
  maxUploadSizeBytes: number;

  @Field(() => [String])
  acceptMimeType: string[];

  @Field(() => String)
  module_name: string;
}
