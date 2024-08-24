import { Field, Int, ObjectType } from '@nestjs/graphql';

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
