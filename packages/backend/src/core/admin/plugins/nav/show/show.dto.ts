import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShowAdminNavPlugins {
  @Field(() => String)
  code: string;

  @Field(() => String, { nullable: true })
  icon?: null | string;

  @Field(() => [String])
  keywords: string[];
}

@ObjectType()
export class ShowAdminNavPluginsObj extends ShowAdminNavPlugins {
  @Field(() => [ShowAdminNavPlugins], { nullable: true })
  children?: null | ShowAdminNavPlugins[];
}
