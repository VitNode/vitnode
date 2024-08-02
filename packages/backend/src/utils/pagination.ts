import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';

export enum SortDirectionEnum {
  asc = 'asc',
  desc = 'desc',
}

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;

  @Field(() => Int, { nullable: true })
  startCursor: number | null;

  @Field(() => Int, { nullable: true })
  endCursor: number | null;

  @Field(() => Number)
  totalCount: number;

  @Field(() => Number)
  count: number;
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
  cursor: number | null;

  @Field(() => Int, { nullable: true })
  first: number | null;

  @Field(() => Int, { nullable: true })
  last: number | null;
}
