/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FirebaseConfigService } from '../config/firebase.config';
import * as admin from 'firebase-admin';
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
export class FirebaseDatabaseService {
  public readonly database: admin.firestore.Firestore;

  constructor(private firebaseConfigService: FirebaseConfigService) {
    this.database = this.firebaseConfigService.firebaseApp.firestore();
  }

  async getTasksByUserId(userId: string): Promise<Task[]> {
    try {
      const firestoreTasks = await this.database
        .collection('task')
        .where('userId', '==', userId)
        .get();

      if (firestoreTasks.empty) {
        return [];
      }

      const tasks: Task[] = firestoreTasks.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      return tasks;
    } catch (error) {
      throw new BadRequestException('Failed to fetch tasks.');
    }
  }

  async createTask(task: Task): Promise<Task> {
    try {
      const taskData = {
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        userId: task.userId,
      };
      const taskRef = await this.database.collection('task').add(taskData);
      return { id: taskRef.id, ...taskData };
    } catch (error) {
      throw new BadRequestException('Failed to create task.');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const taskRef = this.database.collection('task').doc(id);
      const taskDoc = await taskRef.get();
      if (!taskDoc.exists) {
        throw new NotFoundException(`Task with ID ${id} not found.`);
      }
      await taskRef.delete();
    } catch (error) {
      throw new BadRequestException('Failed to delete task.');
    }
  }

  async updateTaskStatus(id: string, status: Status): Promise<Task> {
    try {
      const taskRef = this.database.collection('task').doc(id);
      const taskDoc = await taskRef.get();

      if (!taskDoc.exists) {
        throw new NotFoundException(`Task with ID ${id} not found.`);
      }

      await taskRef.update({ status });
      return { id: taskDoc.id, ...taskDoc.data(), status } as Task;
    } catch (error) {
      throw new BadRequestException('Failed to update task status.');
    }
  }

  async updateTaskDetails(
    id: string,
    title?: string,
    description?: string,
  ): Promise<Task> {
    try {
      const taskRef = this.database.collection('task').doc(id);
      const taskDoc = await taskRef.get();

      if (!taskDoc.exists) {
        throw new NotFoundException(`Task with ID ${id} not found.`);
      }

      const updates: Partial<Task> = {};
      if (title) updates.title = title;
      if (description) updates.description = description;

      await taskRef.update(updates);
      return { id: taskDoc.id, ...taskDoc.data(), ...updates } as Task;
    } catch (error) {
      throw new BadRequestException('Failed to update task details.');
    }
  }
}
