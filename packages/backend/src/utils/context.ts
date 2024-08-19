import { FastifyRequest, FastifyReply } from 'fastify';

import { User } from '../decorators';

export interface AuthRequest extends Request {
  user?: {
    id: User['id'];
  };
}

export interface GqlContext {
  // req
  reply: FastifyReply;
  request: FastifyRequest; // res
}
