import { Injectable } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';
import { eq } from 'drizzle-orm';

import { CoreMiddlewareObj } from './dto/middleware.obj';

import { Ctx } from '@/types/context.type';
import { CONFIG } from '@/config';
import { convertUnixTime, currentDate } from '@/functions/date';
import { DatabaseService } from '@/database/database.service';
import { core_sessions_known_devices } from '@/src/admin/core/database/schema/sessions';

@Injectable()
export class CoreMiddlewareService {
  constructor(private databaseService: DatabaseService) {}

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
    const device = await this.databaseService.db
      .insert(core_sessions_known_devices)
      .values({
        ...this.getUserAgentData(req.headers['user-agent']),
        last_seen: currentDate(),
        ip_address: req.ip
      })
      .returning()[0];

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

    const device = await this.databaseService.db.query.core_sessions_known_devices.findFirst({
      where: (table, { eq }) => eq(table.id, know_device_id)
    });

    if (!device) {
      return await this.createKnowDevice({ req, res });
    }

    // Not update when last seen is less than 15 minutes
    if (device.last_seen > currentDate() - 60 * 15) {
      return know_device_id;
    }

    await this.databaseService.db
      .update(core_sessions_known_devices)
      .set({
        ...this.getUserAgentData(req.headers['user-agent']),
        last_seen: currentDate(),
        ip_address: req.ip
      })
      .where(eq(core_sessions_known_devices.id, device.id));

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

    const languages = await this.databaseService.db.query.core_languages.findMany({
      where: (table, { eq }) => eq(table.enabled, true)
    });

    const default_language = languages.find(language => language.default)?.id ?? 'en';

    return {
      languages,
      default_language
    };
  }
}
