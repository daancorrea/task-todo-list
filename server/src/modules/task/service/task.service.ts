import { Injectable } from '@nestjs/common';
import { FirebaseDatabaseService } from '@/gateway/firebase/service';
import { CreateTaskDto } from '../dto/create-task';
import { Status } from '@/common/enum';

interface Task {
  id?: string;
  title: string;
  description: string;
  status: Status;
  dueDate: string;
  userId: string;
}

@Injectable()
export class TaskService {
  constructor(
    private readonly firebaseDatabaseService: FirebaseDatabaseService,
  ) {}

  async getTasksByUserId(id: string): Promise<Task[]> {
    return await this.firebaseDatabaseService.getTasksByUserId(id);
  }

  async getTasksByUserIdAndFilters(
    userId: string,
    dueDate?: string,
    status?: Status,
  ): Promise<Task[]> {
    const tasks = await this.firebaseDatabaseService.getTasksByUserId(userId);

    return tasks.filter((task) => {
      const matchesDueDate = dueDate ? task.dueDate === dueDate : true;
      const matchesStatus = status ? task.status === status : true;
      return matchesDueDate && matchesStatus;
    });
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    userId: string,
  ): Promise<Task> {
    return await this.firebaseDatabaseService.createTask({
      ...createTaskDto,
      userId,
    });
  }

  async deleteTask(id: string): Promise<void> {
    await this.firebaseDatabaseService.deleteTask(id);
  }

  async updateTaskStatus(taskId: string, status: Status): Promise<Task> {
    return await this.firebaseDatabaseService.updateTaskStatus(taskId, status);
  }

  async updateTaskDetails(
    taskId: string,
    title?: string,
    description?: string,
  ): Promise<Task> {
    return await this.firebaseDatabaseService.updateTaskDetails(
      taskId,
      title,
      description,
    );
  }
}
