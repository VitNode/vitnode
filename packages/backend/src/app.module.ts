import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { LanguageModel } from 'ai';
import { join } from 'path';

import {
  EmailSenderFunction,
  GlobalAdminEmailModule,
} from './core/admin/email/email.module';
import { GlobalCoreAiModule } from './core/ai/ai.module';
import { CoreModule } from './core/core.module';
import { GlobalProvidersModule } from './providers/providers.module';
import { GqlContext } from './utils';
import {
  DatabaseModuleArgs,
  InternalDatabaseModule,
} from './utils/database/database.module';
import { GqlThrottlerGuard } from './utils/guards/gql-throttler.guard';

const internalPaths = {
  backend: join(process.cwd(), 'src'),
  frontend: join(process.cwd(), '..', 'frontend', 'src'),
  uploads: join(process.cwd(), 'uploads'),
  plugins: join(process.cwd(), 'src', 'plugins'),
};

export const ABSOLUTE_PATHS_BACKEND = {
  backend: internalPaths.backend,
  schema: join(process.cwd(), 'schema.gql'),
  uploads: {
    public: join(internalPaths.uploads, 'public'),
    private: join(internalPaths.uploads, 'private'),
    temp: join(internalPaths.uploads, 'temp'),
  },
  plugins: internalPaths.plugins,
  plugin: ({ code }: { code: string }) => ({
    root: join(internalPaths.plugins, code),
    admin: join(internalPaths.plugins, code, 'admin'),
    config: join(internalPaths.plugins, code, 'config.json'),
    database: {
      init: join(internalPaths.plugins, code, 'admin', 'database'),
      schema: join(internalPaths.plugins, code, 'admin', 'database', 'schema'),
      migrations: join(
        internalPaths.plugins,
        code,
        'admin',
        'database',
        'migrations',
      ),
      migration_info: join(
        internalPaths.plugins,
        code,
        'admin',
        'database',
        'migrations',
        'meta',
        '_journal.json',
      ),
    },
    frontend: {
      admin_pages_auth: join(
        internalPaths.frontend,
        'app',
        '[locale]',
        'admin',
        '(auth)',
        code,
      ),
      admin_pages: join(
        internalPaths.frontend,
        'app',
        '[locale]',
        'admin',
        code,
      ),
      default_page: join(
        internalPaths.frontend,
        'plugins',
        code,
        'templates',
        'default-page.tsx',
      ),
      pages: join(internalPaths.frontend, 'src', 'app', '[locale]', code),
      pages_main: join(
        internalPaths.frontend,
        'src',
        'app',
        '[locale]',
        '(main)',
        code,
      ),
      pages_main_layout: join(
        internalPaths.frontend,
        'src',
        'app',
        '[locale]',
        '(main)',
        '(layout)',
        code,
      ),
      templates: join(internalPaths.frontend, 'plugins', code, 'templates'),
      plugin: join(internalPaths.frontend, 'plugins', code),
      languages: join(internalPaths.frontend, 'plugins', code, 'langs'),
    },
  }),
  frontend: {
    init: join(process.cwd(), '..', 'frontend'),
  },
};

const parseFrontendUrlFromEnv = () => {
  const envUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const frontendUrl = envUrl ? envUrl : 'http://localhost:3000';
  const urlObj = new URL(frontendUrl);

  return {
    url: frontendUrl,
    protocol: urlObj.protocol,
    hostname: urlObj.hostname,
    port: urlObj.port,
  };
};

const parseBackendUrlFromEnv = () => {
  const envUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const frontendUrl = envUrl ? envUrl : 'http://localhost:8080';
  const urlObj = new URL(frontendUrl);

  return {
    url: frontendUrl,
    protocol: urlObj.protocol,
    hostname: urlObj.hostname,
    port: urlObj.port,
  };
};

const replaceUrlToDomain = (url: string) => {
  const urlObj = new URL(url);
  let hostname = urlObj.hostname;

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    return hostname;
  }

  if (hostname.split('.').length > 2) {
    hostname = hostname.split('.').slice(1).join('.');
  }

  return hostname;
};

const config = () => {
  const frontend_url = parseFrontendUrlFromEnv();
  const backend_url = parseBackendUrlFromEnv();

  const data = {
    login_token_secret: process.env.LOGIN_TOKEN_SECRET ?? '',
    frontend_url: frontend_url.url,
    backend_url: backend_url.url,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
    cookies: {
      domain: replaceUrlToDomain(frontend_url.url),
      secure: frontend_url.protocol === 'https:',
      login_token: {
        expiresIn: 3, // 3 days
        expiresInRemember: 90, // 90 days
        name: 'vitnode-login-token',
        user_id: 'vitnode-user-id',
        admin: {
          name: 'vitnode-login-token-admin',
          admin_id: 'vitnode-admin-id',
          expiresIn: 1, // 1 day
        },
      },
      known_device: {
        name: 'vitnode-device',
        expiresIn: 365, // 1 year
      },
    },
  };

  if (!data.login_token_secret) {
    throw new Error('`LOGIN_TOKEN_SECRET` is not defined in .env file');
  }

  return data;
};

@Module({})
export class VitNodeCoreModule {
  static register({
    pathToEnvFile,
    database,
    email,
    ai,
  }: {
    ai?: LanguageModel;
    database: DatabaseModuleArgs;
    email?: EmailSenderFunction;
    pathToEnvFile: string;
  }): DynamicModule {
    return {
      module: VitNodeCoreModule,
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
          envFilePath: pathToEnvFile,
        }),
        ThrottlerModule.forRoot([
          {
            ttl: 1000,
            limit: 30,
          },
        ]),
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: ABSOLUTE_PATHS_BACKEND.schema,
          sortSchema: true,
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          context: ({ req, res }): GqlContext => ({ req, res }),
          debug: process.env.NODE_ENV === 'production' ? false : true,
        }),
        ScheduleModule.forRoot(),
        JwtModule.register({ global: true }),
        ServeStaticModule.forRoot({
          rootPath: ABSOLUTE_PATHS_BACKEND.uploads.public,
          serveRoot: '/public/',
        }),
        InternalDatabaseModule.register(database),
        GlobalProvidersModule,
        CoreModule,
        GlobalAdminEmailModule.register({ email }),
        GlobalCoreAiModule.register({ aiModel: ai }),
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: GqlThrottlerGuard,
        },
      ],
    };
  }
}
