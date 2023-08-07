import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { CoreMembersModule } from './core/members/core_members.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoreSessionsModule } from './core/sessions/core_sessions.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true
    }),
    PrismaModule,
    CoreMembersModule,
    CoreSessionsModule
  ]
})
export class AppModule {}
