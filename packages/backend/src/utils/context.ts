import { Request, Response } from 'express';

import { User } from '../decorators';

export interface AuthRequest extends Request {
  user?: {
    id: User['id'];
  };
}

export interface GqlContext {
  req: AuthRequest;
  res: Response;
}
