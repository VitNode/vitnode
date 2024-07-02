import { ArgsType, Field } from "@nestjs/graphql";
<<<<<<< HEAD
<<<<<<< HEAD
import { IsStrongPassword } from "class-validator";
=======
>>>>>>> cb04e9d3 (fix: Correct returning type in ChangePasswordCoreMembersResolver)
=======
import { IsStrongPassword } from "class-validator";
>>>>>>> 6a5b8f35 (feat: Hashing new password)

@ArgsType()
export class ChangePasswordCoreMembersArgs {
  @Field(() => String)
  key: string;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6a5b8f35 (feat: Hashing new password)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })
<<<<<<< HEAD
=======
>>>>>>> cb04e9d3 (fix: Correct returning type in ChangePasswordCoreMembersResolver)
=======
>>>>>>> 6a5b8f35 (feat: Hashing new password)
  @Field(() => String)
  password: string;
}
