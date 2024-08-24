import { PageInfo } from '@/utils';
import { Field, Int, ObjectType } from '@nestjs/graphql';

import { UploadCoreFilesObj } from '../../helpers/upload/dto/upload.obj';

@ObjectType()
export class ShowCoreFiles extends UploadCoreFilesObj {
  @Field(() => Int)
  count_uses: number;

  @Field(() => Date)
  created: Date;

  @Field(() => String, { nullable: true })
  file_alt: null | string;

  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  security_key: null | string;
}

@ObjectType()
export class ShowCoreFilesObj {
  @Field(() => [ShowCoreFiles])
  edges: ShowCoreFiles[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
