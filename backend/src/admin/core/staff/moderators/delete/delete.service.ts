import { Injectable } from '@nestjs/common';

import { DeleteAdminStaffModeratorsArgs } from './dto/delete.args';

import { PrismaService } from '@/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';
import { NotFountError } from '@/utils/errors/not-found';

@Injectable()
export class DeleteAdminStaffModeratorsService {
  constructor(private prisma: PrismaService) {}
  async delete({ id }: DeleteAdminStaffModeratorsArgs): Promise<string> {
    const permission = await this.prisma.core_moderator_permissions.findUnique({
      where: { id }
    });
    if (!permission) {
      throw new NotFountError('Permission');
    }
    if (permission.protected) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        message: 'You cannot delete this permission with protected flag.'
      });
    }

    await this.prisma.core_moderator_permissions.delete({
      where: { id }
    });

    return 'Success!';
  }
}
