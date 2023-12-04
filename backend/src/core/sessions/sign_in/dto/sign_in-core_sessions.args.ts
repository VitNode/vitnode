import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SignInCoreSessionsArgs {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Boolean, { nullable: true })
  remember: boolean | null;

  @Field(() => Boolean, { nullable: true })
  admin: boolean | null;
}
