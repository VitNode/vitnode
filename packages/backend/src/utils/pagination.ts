import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';

export enum SortDirectionEnum {
  asc = 'asc',
  desc = 'desc',
}

@ObjectType()
export class PageInfo {
  @Field(() => Number)
  count: number;

  @Field(() => Int, { nullable: true })
  endCursor: null | number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => Int, { nullable: true })
  startCursor: null | number;

  @Field(() => Number)
  totalCount: number;
}

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  cursor?: number;

  @Field(() => Int, { nullable: true })
  first?: number;

  @Field(() => Int, { nullable: true })
  last?: number;
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { nullable: true })
  cursor: null | number;

  @Field(() => Int, { nullable: true })
  first: null | number;

  @Field(() => Int, { nullable: true })
  last: null | number;
}
