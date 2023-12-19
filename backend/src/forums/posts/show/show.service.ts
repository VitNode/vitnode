import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../../prisma/prisma.service';

@Injectable()
export class ShowPostsForumsService {
  constructor(private prisma: PrismaService) {}

  async show(): Promise<string> {
    return 'Hello World!';
  }
}
