import { FastifyRequest, FastifyReply } from "fastify";

import { User } from "@/utils/decorators/user.decorator";

export interface AuthRequest extends FastifyRequest {
  user?: {
    id: User["id"];
  };
}

export interface Ctx {
  req: AuthRequest;
  res: FastifyReply;
}
