
import { Card } from "@/components/ui/card";
import { TaskCard } from "./TaskCard";
import { Task } from "@/types/task";
import { Loader2 } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  isLoading: boolean;
}

export const TaskList = ({ tasks, onEditTask, onDeleteTask, onUpdateTask, isLoading }: TaskListProps) => {
  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
        <p className="text-gray-600">Loading your tasks...</p>
      </Card>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-600">Create your first task or adjust your filters to see more results.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={() => onEditTask(task)}
          onDelete={() => onDeleteTask(task.id)}
          onUpdate={(updates) => onUpdateTask(task.id, updates)}
        />
      ))}
    </div>
  );
};
