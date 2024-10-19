import { core_admin_permissions } from '@/database/schema/admins';
import { CustomError, InternalServerError, NotFoundError } from '@/errors';
import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { ShowAdminStaffAdministrators } from '../show/show.dto';
import { CreateEditAdminStaffAdministratorsArgs } from './create-edit.dto';

@Injectable()
export class CreateEditAdminStaffAdministratorsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async create({
    group_id,
    user_id,
    permissions,
    id,
  }: CreateEditAdminStaffAdministratorsArgs): Promise<ShowAdminStaffAdministrators> {
    // Edit
    if (id) {
      const permission =
        await this.databaseService.db.query.core_admin_permissions.findFirst({
          where: (table, { eq }) => eq(table.id, id),
        });

      if (!permission) {
        throw new NotFoundError('Permission');
      }

      await this.databaseService.db
        .update(core_admin_permissions)
        .set({
          permissions,
        })
        .where(eq(core_admin_permissions.id, id));

      const data =
        await this.databaseService.db.query.core_admin_permissions.findFirst({
          where: (table, { eq }) => eq(table.id, id),
          with: {
            group: {
              columns: {
                id: true,
                color: true,
              },
            },
          },
        });

      if (!data) {
        throw new InternalServerError();
      }

      if (data.user_id) {
        const user = await getUser({
          id: data.user_id,
          db: this.databaseService.db,
        });

        return {
          ...data,
          user_or_group: {
            ...user,
          },
          permissions:
            data.permissions as ShowAdminStaffAdministrators['permissions'],
        };
      }

      if (!data.group) {
        throw new InternalServerError();
      }

      return {
        ...data,
        user_or_group: {
          ...data.group,
          group_name: [],
        },
        permissions:
          data.permissions as ShowAdminStaffAdministrators['permissions'],
      };
    }

    // Create
    if (!group_id && !user_id) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        message: 'You must provide either a group_id or a user_id.',
      });
    }

    const findPermission =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: (table, { eq, or }) =>
          or(
            user_id ? eq(table.user_id, user_id) : undefined,
            group_id ? eq(table.group_id, group_id) : undefined,
          ),
      });

    if (findPermission) {
      throw new CustomError({
        code: 'ALREADY_EXISTS',
        message: 'This user or group already has moderator permissions.',
      });
    }
    const [permission] = await this.databaseService.db
      .insert(core_admin_permissions)
      .values({
        user_id,
        group_id,
        permissions,
      })
      .returning();

    const data =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: (table, { eq }) => eq(table.id, permission.id),
        with: {
          group: {
            columns: {
              id: true,
              color: true,
            },
          },
        },
      });

    if (!data) {
      throw new NotFoundError('Permission');
    }

    if (data.user_id) {
      const user = await getUser({
        id: data.user_id,
        db: this.databaseService.db,
      });

      return {
        ...data,
        user_or_group: {
          ...user,
        },
        permissions:
          data.permissions as ShowAdminStaffAdministrators['permissions'],
      };
    }

    if (!data.group) {
      throw new NotFoundError('Group');
    }

    return {
      ...data,
      user_or_group: {
        ...data.group,
        group_name: [],
      },
      permissions:
        data.permissions as ShowAdminStaffAdministrators['permissions'],
    };
  }
}
