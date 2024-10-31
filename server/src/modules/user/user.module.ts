import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { FirebaseModule } from '@/gateway/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
