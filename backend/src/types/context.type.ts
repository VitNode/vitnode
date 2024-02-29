import type { Request, Response } from "express";

import type { User } from "@/src/utils/decorators/user.decorator";

export interface AuthRequest extends Request {
  user?: {
    id: User["id"];
  };
}

export interface Ctx {
  req: AuthRequest;
  res: Response;
}
