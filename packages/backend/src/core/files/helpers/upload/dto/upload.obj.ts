import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

import { FileUpload, GraphQLUpload } from '@/graphql-upload';

@ObjectType()
export class UploadCoreFilesObj {
  @Field(() => String)
  mimetype: string;

  @Field(() => String)
  file_name: string;

  @Field(() => String)
  file_name_original: string;

  @Field(() => String)
  dir_folder: string;

  @Field(() => String)
  extension: string;

  @Field(() => Int)
  file_size: number;

  @Field(() => Int, { nullable: true })
  width: number | null;

  @Field(() => Int, { nullable: true })
  height: number | null;
}

@InputType()
export class UploadWithKeepCoreFilesArgs {
  @Field(() => GraphQLUpload, { nullable: true })
  file?: Promise<FileUpload>;

  @Field(() => Boolean)
  keep: boolean;
}
