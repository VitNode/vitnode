import { CanActivate, Injectable } from '@nestjs/common';

import { AccessDeniedError } from '@/errors';

@Injectable()
export class OnlyForDevelopment implements CanActivate {
  canActivate(): boolean {
    if (process.env.NODE_ENV !== 'development') {
      throw new AccessDeniedError();
    }

    return true;
  }
}
