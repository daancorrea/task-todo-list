export enum Status {
  PENDING = 'PENDING',
  DONE = 'DONE',
}

export interface Task {
  id: number;
  title: string;
  status: Status;
  dueDate: string;
  description: string;
  userId: string;
}
