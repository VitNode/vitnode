import { SignUpCoreSessionsArgs } from '@/core/sessions/sign_up/sign_up.dto';
import { ArgsType, OmitType } from '@nestjs/graphql';

@ArgsType()
export class CreateAdminMembersArgs extends OmitType(SignUpCoreSessionsArgs, [
  'newsletter',
] as const) {}
