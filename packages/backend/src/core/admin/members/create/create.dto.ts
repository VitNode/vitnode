import { SignUpCoreSessionsArgs } from '@/core/sessions/sign_up/dto/sign_up.args';
import { ArgsType, OmitType } from '@nestjs/graphql';

@ArgsType()
export class CreateAdminMembersArgs extends OmitType(SignUpCoreSessionsArgs, [
  'newsletter',
] as const) {}
