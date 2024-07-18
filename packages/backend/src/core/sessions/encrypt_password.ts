import { ConfigService } from '@nestjs/config';
import { genSalt, hash } from 'bcrypt';

async function encryptPassword(
  configService: ConfigService,
  password: string,
): Promise<string> {
  const passwordSalt = await genSalt(configService.getOrThrow('password_salt'));
  const hashPassword = await hash(password, passwordSalt);

  return hashPassword;
}

export { encryptPassword };
