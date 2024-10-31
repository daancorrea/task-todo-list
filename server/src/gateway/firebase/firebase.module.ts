import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseConfigService } from './config/firebase.config';
import { FirebaseAuthService, FirebaseDatabaseService } from './service';

@Module({
  imports: [ConfigModule],
  providers: [
    FirebaseAuthService,
    FirebaseDatabaseService,
    {
      provide: FirebaseConfigService,
      useFactory: (configService: ConfigService) =>
        new FirebaseConfigService(configService),
      inject: [ConfigService],
    },
  ],
  exports: [FirebaseAuthService, FirebaseDatabaseService],
})
export class FirebaseModule {}
