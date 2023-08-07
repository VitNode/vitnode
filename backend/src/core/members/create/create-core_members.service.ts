import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';

import { CreateCoreMembersArgs } from './dto/create-core_members.args';
import { CreateCoreMembersObj } from './dto/create-core_members.obj';

import { PrismaService } from '../../../prisma/prisma.service';
import { CustomError } from '../../../../utils/errors/CustomError';
import { removeSpecialCharacters } from '../../../../functions/removeSpecialCharacters';
import { CONFIG_PASSWORD_SALT } from '../../../../config';
import { getCurrentDate } from '../../../../functions/date';
import { generateAvatarColor } from '../../../../functions/avatar/generateAvatarColor';

@Injectable()
export class CreateCoreMembersService {
  constructor(private prisma: PrismaService) {}

  async create({
    birthday,
    email,
    firstName,
    lastName,
    name,
    newsletter,
    password
  }: CreateCoreMembersArgs): Promise<CreateCoreMembersObj> {
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
    const oneDayUNIX = 86400;
    const thirteenYearsInUNIX = oneDayUNIX * 365 * 13;
    const currentDate = getCurrentDate();

    if (currentDate - birthday < thirteenYearsInUNIX) {
      throw new CustomError({
        message: 'You must be at least 13 years old',
        code: 'TOO_YOUNG'
      });
    }

    const passwordSalt = await genSalt(CONFIG_PASSWORD_SALT);
    const hashPassword = await hash(password, passwordSalt);

    const data = await this.prisma.core_members.create({
      data: {
        email,
        first_name: firstName,
        last_name: lastName,
        name,
        name_seo: convertToNameSEO,
        newsletter: !!newsletter,
        password: hashPassword,
        joined: currentDate,
        avatar_color: generateAvatarColor(name),
        birthday
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...rest } = data;

    return { ...rest };
  }
}
