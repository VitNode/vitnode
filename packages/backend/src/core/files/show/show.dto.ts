import { PageInfo, PaginationArgs, SortDirectionEnum } from '@/utils';
import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

import { UploadCoreFilesObj } from '../helpers/upload/upload.dto';

enum ShowCoreFilesSortingColumnEnum {
  created = 'created',
  file_size = 'file_size',
}

registerEnumType(ShowCoreFilesSortingColumnEnum, {
  name: 'ShowCoreFilesSortingColumnEnum',
});

@InputType()
class ShowCoreFilesSortByArgs {
  @Field(() => ShowCoreFilesSortingColumnEnum)
  column: ShowCoreFilesSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreFilesArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => ShowCoreFilesSortByArgs, { nullable: true })
  sortBy?: ShowCoreFilesSortByArgs;
}

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
