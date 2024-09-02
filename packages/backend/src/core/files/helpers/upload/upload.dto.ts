import { FileUpload, GraphQLUpload } from '@/graphql-upload';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

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

@ObjectType()
export class UploadCoreFilesObj {
  @Field(() => String)
  dir_folder: string;

  @Field(() => String)
  extension: string;

  @Field(() => String)
  file_name: string;

  @Field(() => String)
  file_name_original: string;

  @Field(() => Int)
  file_size: number;

  @Field(() => Int, { nullable: true })
  height: null | number;

  @Field(() => String)
  mimetype: string;

  @Field(() => Int, { nullable: true })
  width: null | number;
}
