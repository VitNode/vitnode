import { Injectable } from "@nestjs/common";
import { genSalt, hash } from "bcrypt";
import { count } from "drizzle-orm";
import { ConfigService } from "@nestjs/config";
import { removeSpecialCharacters } from "@vitnode/shared";
import { CustomError } from "@vitnode/backend";

import { SignUpCoreMembersArgs } from "./dto/sign_up.args";
import { SignUpCoreMembersObj } from "./dto/sign_up.obj";

import { generateAvatarColor } from "@/plugins/core/members/sign_up/functions/generate-avatar-color";
import { core_users } from "@/plugins/core/admin/database/schema/users";
import { DatabaseService } from "@/database/database.service";
import { getUserIp } from "@/functions/get-user-ip";
import { Ctx } from "@/utils/types/context.type";

@Injectable()
export class SignUpCoreMembersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService
  ) {}

  protected getGroupId = async (): Promise<number> => {
    const countUsers = await this.databaseService.db
      .select({ count: count() })
      .from(core_users);

    // If no users, return root group
    if (countUsers[0].count === 0) {
      const rootGroup =
        await this.databaseService.db.query.core_groups.findFirst({
          where: (table, { and, eq }) =>
            and(eq(table.default, false), eq(table.root, true))
        });

      return rootGroup.id;
    }

    const defaultGroup =
      await this.databaseService.db.query.core_groups.findFirst({
        where: (table, { and, eq }) =>
          and(eq(table.default, true), eq(table.root, false))
      });

    return defaultGroup.id;
  };

  async signUp(
    { email: emailRaw, name, newsletter, password }: SignUpCoreMembersArgs,
    { req }: Ctx
  ): Promise<SignUpCoreMembersObj> {
    const email = emailRaw.toLowerCase();

    const checkEmail = await this.databaseService.db.query.core_users.findFirst(
      {
        where: (table, { eq }) => eq(table.email, email)
      }
    );

    if (checkEmail) {
      throw new CustomError({
        message: "Email already exists",
        code: "EMAIL_ALREADY_EXISTS"
      });
    }

    const convertToNameSEO = removeSpecialCharacters(name);
    const checkNameSEO =
      await this.databaseService.db.query.core_users.findFirst({
        where: (table, { ilike }) => ilike(table.name_seo, convertToNameSEO)
      });

    if (checkNameSEO) {
      throw new CustomError({
        message: "Name already exists",
        code: "NAME_ALREADY_EXISTS"
      });
    }

    const passwordSalt = await genSalt(
      this.configService.getOrThrow("password_salt")
    );
    const hashPassword = await hash(password, passwordSalt);

    const user = await this.databaseService.db
      .insert(core_users)
      .values({
        email,
        name,
        name_seo: convertToNameSEO,
        newsletter,
        password: hashPassword,
        avatar_color: generateAvatarColor(name),
        group_id: await this.getGroupId(),
        ip_address: getUserIp(req)
      })
      .returning();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...rest } = user[0];

    return { ...rest };
  }
}
