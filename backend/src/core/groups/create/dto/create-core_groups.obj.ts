import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateCoreGroupsObj {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
