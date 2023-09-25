import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

import { SignUpCoreMembersArgs } from './dto/sign_up-core_members.args';
import { SignUpCoreMembersObj } from './dto/sign_up-core_members.obj';

import { PrismaService } from '@/src/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';
import { removeSpecialCharacters } from '@/functions/removeSpecialCharacters';
import { CONFIG } from '@/config';
import { getCurrentDate } from '@/functions/date';
import { generateAvatarColor } from '@/functions/avatar/generateAvatarColor';

@Injectable()
export class SignUpCoreMembersService {
  constructor(private prisma: PrismaService) {}

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
    const currentDate = getCurrentDate();

    if (currentDate - birthday < thirteenYearsInUNIX) {
      throw new CustomError({
        message: 'You must be at least 13 years old',
        code: 'TOO_YOUNG'
      });
    }

    const passwordSalt = await genSalt(CONFIG.password_salt);
    const hashPassword = await hash(password, passwordSalt);

    return await this.prisma.core_members.create({
      data: {
        email,
        name,
        name_seo: convertToNameSEO,
        newsletter,
        password: hashPassword,
        joined: currentDate,
        avatar_color: generateAvatarColor(name),
        birthday
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
