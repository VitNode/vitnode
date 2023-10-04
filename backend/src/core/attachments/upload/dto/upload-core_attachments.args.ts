import { ArgsType, Field } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload-minimal';

@ArgsType()
export class UploadCoreAttachmentsArgs {
  @Field(() => [GraphQLUpload])
  files: Promise<FileUpload>[];

  @Field(() => Number)
  maxUploadSizeBytes: number;

  @Field(() => [String])
  acceptMimeType: string[];
}
