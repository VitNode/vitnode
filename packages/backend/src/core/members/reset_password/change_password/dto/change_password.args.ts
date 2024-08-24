import { ArgsType, Field } from '@nestjs/graphql';
import { IsStrongPassword } from 'class-validator';

@ArgsType()
export class ChangePasswordCoreMembersArgs {
  @Field(() => String)
  hashKey: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Field(() => String)
  password: string;
}
