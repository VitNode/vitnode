import { Request, Response } from 'express';

import { User } from '@/utils/decorators/user.decorator';

export interface AuthRequest extends Request {
  user?: User;
}

export interface Ctx {
  req: AuthRequest;
  res: Response;
}
