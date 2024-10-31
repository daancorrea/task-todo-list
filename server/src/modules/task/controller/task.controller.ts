import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { CreateTaskDto } from '../dto/create-task';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { AuthGuard } from '@/common/guard/auth.guard';
import { Status } from '@/common/enum';

interface Task {
  id?: string;
  title: string;
  description: string;
  status: Status;
  dueDate: string;
}

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all tasks by user ID' })
  async getTaskByUserId(@Request() req): Promise<Task[]> {
    const userId = req.user.uid;
    return await this.taskService.getTasksByUserId(userId);
  }

  @Get('filter')
  @ApiOperation({ summary: 'Filter tasks by dueDate and/or status' })
  @ApiQuery({
    name: 'dueDate',
    required: false,
    description: 'Filter by due date',
  })
  @ApiQuery({
    name: 'status',
    enum: Status,
    required: false,
    description: 'Filter by task status',
  })
  async getTasksByUserIdAndFilters(
    @Request() req,
    @Query('dueDate') dueDate?: string,
    @Query('status') status?: Status,
  ): Promise<Task[]> {
    const userId = req.user.uid;
    return await this.taskService.getTasksByUserIdAndFilters(
      userId,
      dueDate,
      status,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Request() req,
  ): Promise<Task> {
    const userId = req.user.uid;
    return await this.taskService.createTask(createTaskDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  async deleteTask(@Param('id') id: string) {
    await this.taskService.deleteTask(id);
    return { message: 'Task deleted successfully' };
  }

  @Put('status/:taskId')
  @ApiOperation({ summary: 'Update task status' })
  @ApiParam({ name: 'taskId', description: 'ID of the task to update' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'enum',
          description: 'PENDING or DONE',
        },
      },
    },
  })
  async updateTaskStatus(
    @Param('taskId') taskId: string,
    @Body('status') status: Status,
  ): Promise<Task> {
    return await this.taskService.updateTaskStatus(taskId, status);
  }

  @Put(':taskId')
  @ApiOperation({ summary: 'Update task title or description' })
  @ApiParam({ name: 'taskId', description: 'ID of the task to update' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'New title for the task' },
        description: {
          type: 'string',
          description: 'New description for the task',
        },
      },
      required: [],
    },
  })
  async updateTaskDetails(
    @Param('taskId') taskId: string,
    @Body('title') title?: string,
    @Body('description') description?: string,
  ): Promise<Task> {
    return await this.taskService.updateTaskDetails(taskId, title, description);
  }
}
