import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLUpload, Upload } from 'graphql-upload-minimal';

@ArgsType()
export class UploadCoreAttachmentsArgs {
  @Field(() => [GraphQLUpload])
  files: Promise<Upload[]>;
}
