import { ObjectType, PickType } from '@nestjs/graphql';

import { User } from '@/utils/decorators/user.decorator';

@ObjectType()
export class InternalAuthorizationCoreSessionObj extends PickType(User, ['id'] as const) {}
