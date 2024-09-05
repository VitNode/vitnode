import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

@ArgsType()
export class ShowAdminNavPluginsArgs {
  @Field(() => String)
  plugin_code: string;
}

@ObjectType()
export class ShowAdminNavPlugins {
  @Field(() => String)
  code: string;

  @Field(() => String)
  href: string;

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
