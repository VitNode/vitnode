import { Injectable } from '@nestjs/common';

import { UploadCoreAttachmentsArgs } from './dto/upload-core_attachments.args';

import { PrismaService } from '@/src/prisma/prisma.service';

@Injectable()
export class UploadCoreAttachmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async upload({ files }: UploadCoreAttachmentsArgs) {
    return 'UploadCoreAttachmentsService';
  }
}
