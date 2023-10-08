import { Injectable } from '@nestjs/common';

import { DeleteCoreAttachmentsArgs } from './dto/delete-core_attachments.args';

import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class DeleteCoreAttachmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async deleteFile({ id, module, module_id }: DeleteCoreAttachmentsArgs) {
    const file = await this.prisma.core_attachments.findFirst({
      where: {
        OR: [
          {
            id
          },
          {
            AND: [
              {
                module
              },
              {
                module_id
              }
            ]
          }
        ]
      }
    });

    return 'Success!';
  }
}
