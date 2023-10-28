import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

import { SignUpCoreMembersArgs } from './dto/sign_up-core_members.args';
import { SignUpCoreMembersObj } from './dto/sign_up-core_members.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';
import { removeSpecialCharacters } from '@/functions/remove-special-characters';
import { CONFIG } from '@/config';
import { currentDate } from '@/functions/date';
import { generateAvatarColor } from '@/functions/avatar/generateAvatarColor';

@Injectable()
export class SignUpCoreMembersService {
  constructor(private prisma: PrismaService) {}

  protected async checkIfUserIsFirst(): Promise<boolean> {
    const count = await this.prisma.core_members.count();
    const result = count <= 0;

    // If there is no user, create default records
    if (result) {
      await this.prisma.core_groups.createMany({
        data: [
          {
            id: 1,
            name: 'Administrator',
            created: currentDate()
          },
          {
            id: 2,
            name: 'Moderator',
            created: currentDate()
          },
          {
            id: 3,
            name: 'Member',
            created: currentDate()
          }
        ]
      });

      // Create default admin
      await this.prisma.core_admin_access.create({
        data: {
          group_id: 1,
          permissions: '*',
          created: currentDate()
        }
      });
    }

    return result;
  }

  async signUp({
    birthday,
    email,
    name,
    newsletter,
    password
  }: SignUpCoreMembersArgs): Promise<SignUpCoreMembersObj> {
    const checkEmail = await this.prisma.core_members.findUnique({
      where: {
        email
      }
    });

    if (checkEmail) {
      throw new CustomError({
        message: 'Email already exists',
        code: 'EMAIL_ALREADY_EXISTS'
      });
    }

    const convertToNameSEO = removeSpecialCharacters(name);
    const checkNameSEO = await this.prisma.core_members.findUnique({
      where: {
        name_seo: convertToNameSEO
      }
    });

    if (checkNameSEO) {
      throw new CustomError({
        message: 'Name already exists',
        code: 'NAME_ALREADY_EXISTS'
      });
    }

    // Check if birthday is valid 13 years old
    // TODO: Fix this, not working properly
    const oneDayUNIX = 86400;
    const thirteenYearsInUNIX = oneDayUNIX * 365 * 13;
    const dateNow = currentDate();

    if (dateNow - birthday < thirteenYearsInUNIX) {
      throw new CustomError({
        message: 'You must be at least 13 years old',
        code: 'TOO_YOUNG'
      });
    }

    const passwordSalt = await genSalt(CONFIG.password_salt);
    const hashPassword = await hash(password, passwordSalt);

    const isAdmin = await this.checkIfUserIsFirst();

    return await this.prisma.core_members.create({
      data: {
        email,
        name,
        name_seo: convertToNameSEO,
        newsletter,
        password: hashPassword,
        joined: dateNow,
        avatar_color: generateAvatarColor(name),
        birthday,
        group: {
          connect: {
            id: isAdmin ? 1 : 3
          }
        }
      },
      select: {
        id: true,
        name: true,
        name_seo: true,
        email: true,
        group_id: true,
        joined: true,
        birthday: true,
        avatar: true,
        image_cover: true,
        posts: true,
        followers: true,
        reactions: true,
        newsletter: true,
        avatar_color: true,
        unread_notifications: true
      }
    });
  }
}
