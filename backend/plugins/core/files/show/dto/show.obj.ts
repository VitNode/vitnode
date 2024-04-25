import { Field, Int, ObjectType } from "@nestjs/graphql";

import { PageInfo } from "@/types/database/pagination.type";
import { UploadCoreFilesObj } from "../../helpers/upload/dto/upload.obj";

@ObjectType()
export class ShowCoreFiles extends UploadCoreFilesObj {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  created: Date;

  @Field(() => String, { nullable: true })
  security_key?: string;
}

@ObjectType()
export class ShowCoreFilesObj {
  @Field(() => [ShowCoreFiles])
  edges: ShowCoreFiles[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
