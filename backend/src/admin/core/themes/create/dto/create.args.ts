import { ArgsType, Field } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@ArgsType()
export class CreateAdminThemesArgs {
  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @Field(() => String)
  support_url: string;

  @Field(() => String)
  @MinLength(3)
  @MaxLength(100)
  author: string;

  @Field(() => String)
  author_url: string;
}
