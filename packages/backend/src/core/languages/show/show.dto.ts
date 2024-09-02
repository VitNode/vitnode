import { PageInfo, PaginationArgs, SortDirectionEnum } from '@/utils';
import {
  ArgsType,
  Field,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

enum ShowCoreLanguagesSortingColumnEnum {
  created = 'created',
  updated = 'updated',
}

registerEnumType(ShowCoreLanguagesSortingColumnEnum, {
  name: 'ShowCoreLanguagesSortingColumnEnum',
});

@InputType()
class ShowCoreLanguagesSortByArgs {
  @Field(() => ShowCoreLanguagesSortingColumnEnum)
  column: ShowCoreLanguagesSortingColumnEnum;

  @Field(() => SortDirectionEnum)
  direction: SortDirectionEnum;
}

@ArgsType()
export class ShowCoreLanguagesArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => ShowCoreLanguagesSortByArgs, { nullable: true })
  sortBy?: ShowCoreLanguagesSortByArgs;
}

@ObjectType()
export class ShowCoreLanguages {
  @Field(() => Boolean)
  allow_in_input: boolean;

  @Field(() => String)
  code: string;

  @Field(() => Date)
  created: Date;

  @Field(() => Boolean)
  default: boolean;

  @Field(() => Boolean)
  enabled: boolean;

  @Field(() => Int)
  id: number;

  @Field(() => String)
  locale: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  protected: boolean;

  @Field(() => Boolean)
  time_24: boolean;

  @Field(() => String)
  timezone: string;

  @Field(() => Date)
  updated: Date;
}

@ObjectType()
export class ShowCoreLanguagesObj {
  @Field(() => [ShowCoreLanguages])
  edges: ShowCoreLanguages[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
