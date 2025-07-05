
import { useState, useEffect } from 'react';
import { Header } from './Header';
import { TaskFilters } from './TaskFilters';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { StatsCards } from './StatsCards';
import { useTasks } from '@/hooks/useTasks';
import { Task, TaskStatus, TaskPriority } from '@/types/task';

export const Dashboard = () => {
  const { tasks, addTask, updateTask, deleteTask, isLoading } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    status: 'all' as TaskStatus | 'all',
    priority: 'all' as TaskPriority | 'all',
    search: '',
    dueToday: false,
    overdue: false,
  });

  const filteredTasks = tasks.filter(task => {
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) && 
        !task.description?.toLowerCase().includes(filters.search.toLowerCase())) return false;
    
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const taskDue = new Date(task.dueDate);
    
    if (filters.dueToday && taskDue.toDateString() !== today.toDateString()) return false;
    if (filters.overdue && taskDue >= today) return false;
    
    return true;
  });

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const handleSubmitTask = async (taskData: Partial<Task>) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
    } else {
      await addTask(taskData as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>);
    }
    handleCloseForm();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateTask={() => setShowTaskForm(true)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <StatsCards tasks={tasks} />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <TaskFilters filters={filters} onFiltersChange={setFilters} />
            </div>
            
            <div className="lg:col-span-3">
              <TaskList
                tasks={filteredTasks}
                onEditTask={handleEditTask}
                onDeleteTask={deleteTask}
                onUpdateTask={updateTask}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {showTaskForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmitTask}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};
