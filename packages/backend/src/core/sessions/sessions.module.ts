import { Global, Module } from '@nestjs/common';

import { AuthorizationCoreSessionsResolver } from './authorization/authorization.resolver';
import { AuthorizationCoreSessionsService } from './authorization/authorization.service';
import { InternalAuthorizationCoreSessionsService } from './authorization/internal/internal_authorization.service';
import { DevicesCoreSessionsModule } from './devices/devices.module';
import { CoreSessionsCron } from './sessions.cron';
import { DeviceSignInCoreSessionsService } from './sign_in/device.service';
import { SignInCoreSessionsResolver } from './sign_in/sign_in.resolver';
import { SignInCoreSessionsService } from './sign_in/sign_in.service';
import { SignOutCoreSessionsResolver } from './sign_out/sign_out.resolver';
import { SignOutCoreSessionsService } from './sign_out/sign_out.service';
import { SignUpCoreSessionsResolver } from './sign_up/sign_up.resolver';
import { SignUpCoreSessionsService } from './sign_up/sign_up.service';

@Module({
  providers: [
    SignInCoreSessionsService,
    SignInCoreSessionsResolver,
    AuthorizationCoreSessionsService,
    AuthorizationCoreSessionsResolver,
    SignOutCoreSessionsService,
    SignOutCoreSessionsResolver,
    CoreSessionsCron,
    SignUpCoreSessionsResolver,
    SignUpCoreSessionsService,
  ],
  imports: [DevicesCoreSessionsModule],
})
export class CoreSessionsModule {}

@Global()
@Module({
  providers: [
    AuthorizationCoreSessionsService,
    AuthorizationCoreSessionsResolver,
    InternalAuthorizationCoreSessionsService,
    DeviceSignInCoreSessionsService,
  ],
  exports: [
    AuthorizationCoreSessionsService,
    AuthorizationCoreSessionsResolver,
    InternalAuthorizationCoreSessionsService,
    DeviceSignInCoreSessionsService,
  ],
})
export class GlobalCoreSessionsModule {}
