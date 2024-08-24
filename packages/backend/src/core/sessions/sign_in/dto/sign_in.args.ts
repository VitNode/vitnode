import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SignInCoreSessionsArgs {
  @Field(() => Boolean, { nullable: true })
  admin?: boolean;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Boolean, { nullable: true })
  remember?: boolean;
}
