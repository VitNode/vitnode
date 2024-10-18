import { AccessDeniedError } from '@/errors';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthorizationAdminSessionsObj } from '../../core/admin/sessions/authorization/authorization.dto';
import { GqlContext } from '../context';

interface AdminPermissionDecorator {
  group: string;
  permission: string;
  plugin_code: string;
}

export const AdminPermission =
  Reflector.createDecorator<AdminPermissionDecorator>();

@Injectable()
export class AdminAuthGuards implements CanActivate {
  constructor(
    @Inject('IOAdminAuthGuards')
    private readonly service: {
      authorization: (
        context: GqlContext,
      ) => Promise<AuthorizationAdminSessionsObj>;
    },
    private readonly reflector: Reflector,
  ) {}

  protected async getAuth({ req, res }: GqlContext) {
    const data = await this.service.authorization({
      req,
      res,
    });

    req.user = data.user ?? undefined;

    return data;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: GqlContext = GqlExecutionContext.create(context).getContext();
    const authorization = await this.getAuth(ctx);
    const permission: AdminPermissionDecorator | undefined = this.reflector.get(
      AdminPermission,
      context.getHandler(),
    );
    if (!permission || authorization.permissions.length === 0) {
      return !!authorization;
    }

    const plugin = authorization.permissions.find(
      plugin => plugin.plugin_code === permission.plugin_code,
    );
    if (!plugin) throw new AccessDeniedError();
    const group = plugin.groups.find(group => group.id === permission.group);
    if (!group) throw new AccessDeniedError();
    if (group.permissions.length === 0) return !!authorization;

    const permissionObj = group.permissions.find(
      item => item === permission.permission,
    );
    if (!permissionObj) throw new AccessDeniedError();

    return !!authorization;
  }
}
