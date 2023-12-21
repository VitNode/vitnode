import { ObjectType } from '@nestjs/graphql';

import { User } from '@/utils/decorators/user.decorator';

@ObjectType()
export class InternalAuthorizationCoreSessionObj extends User {}
