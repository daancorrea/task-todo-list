import { Status } from '@/common/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Title of the task' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Description of the task' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Status of the task', enum: Status })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    description: 'Due date of the task',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}
