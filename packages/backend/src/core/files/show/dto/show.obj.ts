import { Field, Int, ObjectType } from "@nestjs/graphql";

import { UploadCoreFilesObj } from "../../helpers/upload/dto/upload.obj";
import { PageInfo } from "../../../../utils";

@ObjectType()
export class ShowCoreFiles extends UploadCoreFilesObj {
  @Field(() => Int)
  id: number;

  @Field(() => Date)
  created: Date;

  @Field(() => String, { nullable: true })
  security_key?: string;

  @Field(() => String, { nullable: true })
  file_alt: string | null;

  @Field(() => Int)
  count_uses: number;
}

@ObjectType()
export class ShowCoreFilesObj {
  @Field(() => [ShowCoreFiles])
  edges: ShowCoreFiles[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
