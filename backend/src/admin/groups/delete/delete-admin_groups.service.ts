import { Injectable } from '@nestjs/common';

import { DeleteAdminGroupsArgs } from './dto/delete-admin_groups.args';

import { PrismaService } from '@/prisma/prisma.service';
import { NotFountError } from '@/utils/errors/not-found';
import { CustomError } from '@/utils/errors/CustomError';

@Injectable()
export class DeleteAdminGroupsService {
  constructor(private prisma: PrismaService) {}

  async delete({ id }: DeleteAdminGroupsArgs): Promise<string> {
    const group = await this.prisma.core_groups.findUnique({
      where: { id }
    });

    if (!group) {
      throw new NotFountError('Group');
    }

    // Find default group
    const defaultGroup = await this.prisma.core_groups.findFirst({
      where: { default: true }
    });

    if (!defaultGroup) {
      throw new CustomError({
        code: 'INTERNAL_ERROR',
        message: 'Default group not found'
      });
    }

    // Move users to default group
    await this.prisma.core_members.updateMany({
      where: { group_id: id },
      data: { group_id: defaultGroup.id }
    });

    // Delete group
    await this.prisma.core_groups.delete({ where: { id }, include: { name: true } });

    return 'Success!';
  }
}
