import { FileUpload, GraphQLUpload } from '@/graphql-upload';
import { Field, InputType } from '@nestjs/graphql';

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
