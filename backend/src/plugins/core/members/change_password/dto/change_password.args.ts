import { ArgsType, Field } from "@nestjs/graphql";
<<<<<<< HEAD
import { IsStrongPassword } from "class-validator";
=======
>>>>>>> cb04e9d3 (fix: Correct returning type in ChangePasswordCoreMembersResolver)

@ArgsType()
export class ChangePasswordCoreMembersArgs {
  @Field(() => String)
  key: string;

<<<<<<< HEAD
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
=======
>>>>>>> cb04e9d3 (fix: Correct returning type in ChangePasswordCoreMembersResolver)
  @Field(() => String)
  password: string;
}
