import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UploadCoreFilesObj {
  @Field(() => String)
  plugin: string;

  @Field(() => String)
  mimetype: string;

  @Field(() => String)
  file_name: string;

  @Field(() => String)
  dir_folder: string;

  @Field(() => String)
  extension: string;

  @Field(() => Int)
  file_size: number;
}
