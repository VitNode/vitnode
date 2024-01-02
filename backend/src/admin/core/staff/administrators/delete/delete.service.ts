import { Injectable } from '@nestjs/common';

import { DeleteAdminStaffAdministratorsArgs } from './dto/delete.args';

import { PrismaService } from '@/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';

@Injectable()
export class DeleteAdminStaffAdministratorsService {
  constructor(private prisma: PrismaService) {}

  async delete({ id }: DeleteAdminStaffAdministratorsArgs): Promise<string> {
    const permission = await this.prisma.core_admin_permissions.findUniqueOrThrow({
      where: { id }
    });
    if (permission.protected) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        message: 'You cannot delete this permission with protected flag.'
      });
    }

    await this.prisma.core_admin_permissions.delete({
      where: { id }
    });

    return 'Success!';
  }
}
