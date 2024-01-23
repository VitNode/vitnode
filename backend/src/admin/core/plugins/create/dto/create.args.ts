import { ArgsType, Field } from '@nestjs/graphql';
import { Matches, MaxLength, MinLength } from 'class-validator';

@ArgsType()
export class CreateAdminPluginsArgs {
  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @Field(() => String)
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-z0-9-]*$/)
  code: string;

  @Field(() => String, { nullable: true })
  @MaxLength(255)
  description: string | null;

  @Field(() => String)
  support_url: string;

  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  author: string;

  @Field(() => String)
  author_url: string;
}
