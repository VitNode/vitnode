import { core_users } from '@/database/schema/users';
import { CustomError, NotFoundError } from '@/errors';
import { getUserIp, removeSpecialCharacters } from '@/functions';
import { EmailProvider, getConfigFile } from '@/providers';
import { AuthRequest, GqlContext, InternalDatabaseService } from '@/utils';
import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { encryptPassword } from '../../password';
import { SignUpCoreSessionsArgs, SignUpCoreSessionsObj } from '../sign_up.dto';
import { AvatarColorService } from './avatar-color.service';

@Injectable()
export class SignUpHelperService extends AvatarColorService {
  constructor(private readonly databaseService: InternalDatabaseService) {
    super();
  }

  private readonly getDefaultData = async (): Promise<{
    email_verified: boolean;
    group_id: number;
  }> => {
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

      return {
        group_id: rootGroup.id,
        email_verified: true,
      };
    }

    const defaultGroup =
      await this.databaseService.db.query.core_groups.findFirst({
        where: (table, { and, eq }) =>
          and(eq(table.default, true), eq(table.root, false)),
      });

    if (!defaultGroup) {
      throw new NotFoundError('Default Group');
    }

    return {
      group_id: defaultGroup.id,
      email_verified: false,
    };
  };

  private readonly getLanguage = async (req: AuthRequest): Promise<string> => {
    const languageToSet: string =
      (Array.isArray(req.headers['x-vitnode-user-language'])
        ? req.headers['x-vitnode-user-language'][0]
        : req.headers['x-vitnode-user-language']) ?? 'en';

    // Check if language exists
    const lang = await this.databaseService.db.query.core_languages.findMany({
      columns: {
        code: true,
        default: true,
      },
    });

    if (!lang.find(l => l.code === languageToSet)) {
      return lang.find(l => l.default)?.code ?? 'en';
    }

    return languageToSet;
  };

  async signUp(
    { email: emailRaw, name, newsletter, password }: SignUpCoreSessionsArgs,
    { req }: GqlContext,
  ): Promise<SignUpCoreSessionsObj> {
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
    const config = getConfigFile();
    const { group_id, email_verified } = await this.getDefaultData();

    const user = await this.databaseService.db
      .insert(core_users)
      .values({
        email,
        name,
        name_seo: convertToNameSEO,
        newsletter,
        password: hashPassword,
        avatar_color: this.generateAvatarColor(name),
        group_id,
        email_verified:
          config.settings.authorization.require_confirm_email &&
          config.settings.email.provider !== EmailProvider.none
            ? email_verified
            : true,
        ip_address: getUserIp(req),
        language: await this.getLanguage(req),
      })
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = user[0];

    return { ...rest };
  }
}
