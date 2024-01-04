import { Injectable } from '@nestjs/common';

@Injectable()
export class TestPluginsService {
  async test(): Promise<string> {
    return 'Ok';
  }
}
