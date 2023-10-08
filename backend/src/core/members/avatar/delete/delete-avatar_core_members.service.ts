import { Injectable } from '@nestjs/common';

import { DeleteCoreAttachmentsService } from '../../../attachments/delete/delete-core_attachments.service';
import { User } from '@/utils/decorators/user.decorator';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class DeleteAvatarCoreMembersService {
  constructor(
    private readonly service: DeleteCoreAttachmentsService,
    private readonly prisma: PrismaService
  ) {}

  async deleteAvatar({ id }: User): Promise<string> {
    const file = await this.prisma.core_attachments.findFirst({
      where: {
        AND: [
          {
            module: 'core_members'
          },
          {
            module_id: id
          }
        ]
      }
    });

    if (!file) {
      return 'Avatar not found';
    }

    await this.service.deleteFile({
      module: {
        module: 'core_members',
        id: id
      }
    });

    return 'Success!';
  }
}
