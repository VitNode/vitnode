import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

import { SignUpCoreMembersArgs } from './dto/sign_up.args';
import { SignUpCoreMembersObj } from './dto/sign_up.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';
import { removeSpecialCharacters } from '@/functions/remove-special-characters';
import { CONFIG } from '@/config';
import { currentDate } from '@/functions/date';
import { generateAvatarColor } from '@/functions/avatar/generateAvatarColor';

@Injectable()
export class SignUpCoreMembersService {
  constructor(private prisma: PrismaService) {}

  async signUp({
    email: emailRaw,
    name,
    newsletter,
    password
  }: SignUpCoreMembersArgs): Promise<SignUpCoreMembersObj> {
    const email = emailRaw.toLowerCase();

    const isAdmin = async (): Promise<string> => {
      const count = await this.prisma.core_members.count();

      if (!count) {
        return (
          await this.prisma.core_groups.findFirst({
            where: {
              default: false,
              root: true
            },
            select: {
              id: true
            }
          })
        ).id;
      }

      return (
        await this.prisma.core_groups.findFirst({
          where: {
            default: true
          },
          select: {
            id: true
          }
        })
      ).id;
    };
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
        id: convertToNameSEO
      }
    });

    if (checkNameSEO) {
      throw new CustomError({
        message: 'Name already exists',
        code: 'NAME_ALREADY_EXISTS'
      });
    }

    const dateNow = currentDate();

    const passwordSalt = await genSalt(CONFIG.password_salt);
    const hashPassword = await hash(password, passwordSalt);

    return await this.prisma.core_members.create({
      data: {
        email,
        name,
        id: convertToNameSEO,
        newsletter,
        password: hashPassword,
        joined: dateNow,
        avatar_color: generateAvatarColor(name),
        group: {
          connect: {
            id: await isAdmin()
          }
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        group_id: true,
        joined: true,
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
