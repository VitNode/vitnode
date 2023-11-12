import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateAdminGroupsObj {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
