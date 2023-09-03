import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => String)
  startCursor: string;

  @Field(() => String)
  endCursor: string;

  @Field(() => Number)
  totalCount: number;

  @Field(() => Number)
  count: number;
}
