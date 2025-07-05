
export type TaskStatus = 'todo' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  sharedWith?: string[];
  tags?: string[];
}

export interface TaskFilters {
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
  search: string;
  dueToday: boolean;
  overdue: boolean;
}
