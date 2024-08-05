import { Field, InputType } from '@nestjs/graphql';

import { FileUpload, GraphQLUpload } from '@/graphql-upload';

export interface UploadCoreFilesArgs {
  acceptMimeType: string[];
  file: Promise<FileUpload>;
  folder: string;
  maxUploadSizeBytes: number;
  plugin: string;
  secure?: boolean | null;
}

@InputType()
export class UploadWithKeepCoreFilesArgs {
  @Field(() => GraphQLUpload, { nullable: true })
  file?: Promise<FileUpload>;

  @Field(() => Boolean, { nullable: true })
  keep?: boolean;
}
