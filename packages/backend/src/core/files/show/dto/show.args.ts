import { PaginationArgs, SortDirectionEnum } from '@/utils';
import { ArgsType, Field, InputType, registerEnumType } from '@nestjs/graphql';

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
