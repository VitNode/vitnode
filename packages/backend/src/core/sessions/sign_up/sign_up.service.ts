import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { SignUpCoreSessionsArgs } from './dto/sign_up.args';
import { SignUpCoreSessionsObj } from './dto/sign_up.obj';
import { AvatarColorService } from './helpers/avatar-color.service';
import { encryptPassword } from '../password';

import { CaptchaCoreCaptchaSecurityService } from '@/core/admin/security/captcha/captcha.service';
import { core_users } from '../../../database/schema/users';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { GqlContext } from '@/utils';
import { CustomError, NotFoundError } from '../../../errors';
import { getUserIp, removeSpecialCharacters } from '../../../functions';

@Injectable()
export class SignUpCoreSessionsService extends AvatarColorService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly captchaService: CaptchaCoreCaptchaSecurityService,
  ) {
    super();
  }

  private readonly getGroupId = async (): Promise<number> => {
    const countUsers = await this.databaseService.db
      .select({ count: count() })
      .from(core_users);

    // If no users, return root group
    if (countUsers[0].count === 0) {
      const rootGroup =
        await this.databaseService.db.query.core_groups.findFirst({
          where: (table, { and, eq }) =>
            and(eq(table.default, false), eq(table.root, true)),
        });

      if (!rootGroup) {
        throw new NotFoundError('Root Group');
      }

      return rootGroup.id;
    }

    const defaultGroup =
      await this.databaseService.db.query.core_groups.findFirst({
        where: (table, { and, eq }) =>
          and(eq(table.default, true), eq(table.root, false)),
      });

    if (!defaultGroup) {
      throw new NotFoundError('Default Group');
    }

    return defaultGroup.id;
  };

  async signUp(
    { email: emailRaw, name, newsletter, password }: SignUpCoreSessionsArgs,
    { request }: GqlContext,
  ): Promise<SignUpCoreSessionsObj> {
    await this.captchaService.validateCaptcha({ request });

    const email = emailRaw.toLowerCase();
    const checkEmail = await this.databaseService.db.query.core_users.findFirst(
      {
        where: (table, { eq }) => eq(table.email, email),
      },
    );

    if (checkEmail) {
      throw new CustomError({
        message: 'Email already exists',
        code: 'EMAIL_ALREADY_EXISTS',
      });
    }

    const convertToNameSEO = removeSpecialCharacters(name);
    const checkNameSEO =
      await this.databaseService.db.query.core_users.findFirst({
        where: (table, { ilike }) => ilike(table.name_seo, convertToNameSEO),
      });

    if (checkNameSEO) {
      throw new CustomError({
        message: 'Name already exists',
        code: 'NAME_ALREADY_EXISTS',
      });
    }

    const hashPassword = await encryptPassword(password);

    const user = await this.databaseService.db
      .insert(core_users)
      .values({
        email,
        name,
        name_seo: convertToNameSEO,
        newsletter,
        password: hashPassword,
        avatar_color: this.generateAvatarColor(name),
        group_id: await this.getGroupId(),
        ip_address: getUserIp(request),
      })
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = user[0];

    return { ...rest };
  }
}
