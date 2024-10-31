import { Module } from '@nestjs/common';
import { FirebaseModule } from '@/gateway/firebase/firebase.module';
import { TaskController } from './controller/task.controller';
import { TaskService } from './service/task.service';
@Module({
  imports: [FirebaseModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
