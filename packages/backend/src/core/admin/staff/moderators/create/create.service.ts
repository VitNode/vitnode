import { core_moderators_permissions } from '@/database/schema/moderators';
import { CustomError, NotFoundError } from '@/errors';
import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';

import { ShowAdminStaffModerators } from '../show/show.dto';
import { CreateAdminStaffModeratorsArgs } from './create.dto';

@Injectable()
export class CreateAdminStaffModeratorsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async create({
    group_id,
    unrestricted,
    user_id,
  }: CreateAdminStaffModeratorsArgs): Promise<ShowAdminStaffModerators> {
    if (!group_id && !user_id) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        message: 'You must provide either a group_id or a user_id.',
      });
    }

    const findPermission =
      await this.databaseService.db.query.core_moderators_permissions.findFirst(
        {
          where: (table, { eq, or }) =>
            or(
              user_id ? eq(table.user_id, user_id) : undefined,
              group_id ? eq(table.group_id, group_id) : undefined,
            ),
        },
      );

    if (findPermission) {
      throw new CustomError({
        code: 'ALREADY_EXISTS',
        message: 'This user or group already has moderator permissions.',
      });
    }

    const permission = await this.databaseService.db
      .insert(core_moderators_permissions)
      .values({
        user_id,
        group_id,
        unrestricted,
      })
      .returning();

    const data =
      await this.databaseService.db.query.core_moderators_permissions.findFirst(
        {
          where: (table, { eq }) => eq(table.id, permission[0].id),
          with: {
            group: {
              columns: {
                id: true,
                color: true,
              },
            },
          },
        },
      );

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
    };
  }
}
