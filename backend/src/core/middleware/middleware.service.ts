import { Injectable } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';

import { CoreMiddlewareObj } from './dto/middleware.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { Ctx } from '@/types/context.type';
import { CONFIG } from '@/config';
import { convertUnixTime, currentDate } from '@/functions/date';

@Injectable()
export class CoreMiddlewareService {
  constructor(private prisma: PrismaService) {}

  protected getUserAgentData(userAgent: string) {
    const user_parser = new UAParser(userAgent).getResult();

    return {
      user_agent: userAgent,
      uagent_browser: user_parser.browser.name ?? 'Uagent from tests',
      uagent_version: user_parser.browser.version ?? 'Uagent from tests',
      uagent_os: user_parser.os.name
        ? `${user_parser.os.name} ${user_parser.os.version}`
        : 'Uagent from tests',
      uagent_device_vendor: user_parser.device.vendor ?? 'Uagent from tests',
      uagent_device_model: user_parser.device.model ?? 'Uagent from tests',
      uagent_device_type: user_parser.device.type ?? 'Uagent from tests'
    };
  }

  protected async createKnowDevice({ req, res }: Ctx): Promise<string> {
    const device = await this.prisma.core_sessions_known_devices.create({
      data: {
        ...this.getUserAgentData(req.headers['user-agent']),
        last_seen: currentDate()
      }
    });

    // Set cookie
    res.cookie(CONFIG.cookies.known_device.name, device.id, {
      httpOnly: true,
      secure: true,
      domain: CONFIG.cookie.domain,
      path: '/',
      expires: new Date(convertUnixTime(currentDate() + CONFIG.cookies.known_device.expiresIn)),
      sameSite: 'none'
    });

    return device.id;
  }

  protected async checkDevice({ req, res }: Ctx): Promise<string> {
    const know_device_id: string | undefined = req.cookies[CONFIG.cookies.known_device.name];
    if (!know_device_id) {
      return await this.createKnowDevice({ req, res });
    }

    const device = await this.prisma.core_sessions_known_devices.findFirst({
      where: {
        id: know_device_id
      }
    });
    if (!device) {
      return await this.createKnowDevice({ req, res });
    }

    // Not update when last seen is less than 1 hour
    if (device.last_seen > currentDate() - 3600) {
      return know_device_id;
    }

    await this.prisma.core_sessions_known_devices.update({
      where: {
        id: device.id
      },
      data: {
        last_seen: currentDate()
      }
    });

    // Update sign in date
    res.cookie(CONFIG.cookies.known_device.name, know_device_id, {
      httpOnly: true,
      secure: true,
      domain: CONFIG.cookie.domain,
      path: '/',
      expires: new Date(convertUnixTime(currentDate() + CONFIG.cookies.known_device.expiresIn)),
      sameSite: 'none'
    });

    return know_device_id;
  }

  async middleware(context: Ctx): Promise<CoreMiddlewareObj> {
    await this.checkDevice(context);

    const languages = await this.prisma.core_languages.findMany({
      where: {
        enabled: true
      }
    });
    const default_language = languages.find(language => language.default)?.id ?? 'en';

    return {
      languages,
      default_language
    };
  }
}
