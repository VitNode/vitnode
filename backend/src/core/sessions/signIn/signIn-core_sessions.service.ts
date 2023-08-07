import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { SignInCoreSessionsArgs } from './dto/signIn-core_sessions.args';

import { PrismaService } from '../../../prisma/prisma.service';
import { AccessDeniedError } from '../../../../utils/errors/AccessDeniedError';

@Injectable()
export class SignInCoreSessionsService {
  constructor(private prisma: PrismaService) {}

  async signIn({ email, password }: SignInCoreSessionsArgs) {
    const user = await this.prisma.core_members.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new AccessDeniedError();
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new AccessDeniedError();
    }

    // TODO: Add create session

    return 'Success!';
  }
}
