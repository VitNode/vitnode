import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";

@ObjectType()
export class ShowCoreFiles {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  created: Date;

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

@ObjectType()
export class ShowCoreFilesObj {
  @Field(() => [ShowCoreFiles])
  edges: ShowCoreFiles[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
