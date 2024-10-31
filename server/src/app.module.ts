import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envConfiguration from './config/env';
import { FirebaseModule } from './gateway/firebase/firebase.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [envConfiguration],
    }),
    FirebaseModule,
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
