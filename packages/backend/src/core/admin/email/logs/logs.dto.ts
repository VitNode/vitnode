import { PageInfo, PaginationArgs } from '@/utils';
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class LogsAdminEmailArgs extends PaginationArgs {}

@ObjectType()
export class LogsAdminEmail {
  @Field(() => Date)
  created: Date;

  @Field(() => String)
  error: string;

  @Field(() => String)
  html: string;

  @Field(() => Number)
  id: number;

  @Field(() => String)
  subject: string;

  @Field(() => String)
  to: string;
}

@ObjectType()
export class LogsAdminEmailObj {
  @Field(() => [LogsAdminEmail])
  edges: LogsAdminEmail[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
