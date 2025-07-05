
import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '@/types/task';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Mock data for demonstration
  useEffect(() => {
    if (user) {
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Design new landing page',
          description: 'Create a modern, responsive landing page for the new product launch',
          status: 'in-progress',
          priority: 'high',
          dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: user.id,
          sharedWith: ['john@example.com'],
          tags: ['design', 'frontend']
        },
        {
          id: '2',
          title: 'Review pull requests',
          description: 'Review and merge pending pull requests from the team',
          status: 'todo',
          priority: 'medium',
          dueDate: new Date().toISOString(), // Today
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: user.id,
          tags: ['code-review']
        },
        {
          id: '3',
          title: 'Update documentation',
          description: 'Update API documentation with new endpoints',
          status: 'completed',
          priority: 'low',
          dueDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: user.id,
          tags: ['documentation']
        }
      ];
      
      setTasks(mockTasks);
      setIsLoading(false);
    }
  }, [user]);

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Task created",
      description: "Your task has been added successfully.",
    });
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
    
    toast({
      title: "Task updated",
      description: "Your task has been updated successfully.",
    });
  };

  const deleteTask = async (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "Your task has been removed successfully.",
    });
  };

  const updateTaskStatus = async (taskId: string, status: TaskStatus) => {
    await updateTask(taskId, { status });
  };

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
};
