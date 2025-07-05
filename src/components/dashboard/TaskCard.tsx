
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Task, TaskStatus } from "@/types/task";
import { 
  Calendar, 
  Users, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  CheckCircle,
  Clock,
  AlertTriangle 
} from "lucide-react";
import { format, isToday, isPast } from "date-fns";

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onUpdate: (updates: Partial<Task>) => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onUpdate }: TaskCardProps) => {
  const dueDateObj = new Date(task.dueDate);
  const isOverdue = isPast(dueDateObj) && task.status !== 'completed';
  const isDueToday = isToday(dueDateObj);

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    todo: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    onUpdate({ status: newStatus });
  };

  return (
    <Card className={`transition-all hover:shadow-md ${isOverdue ? 'border-red-200 bg-red-50/50' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <h3 className={`font-semibold text-lg ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              <Badge className={`${priorityColors[task.priority]} border-0`}>
                {task.priority}
              </Badge>
              <Badge className={`${statusColors[task.status]} border-0`}>
                {task.status.replace('-', ' ')}
              </Badge>
            </div>

            {task.description && (
              <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
            )}

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : isDueToday ? 'text-orange-600' : ''}`}>
                <Calendar className="h-4 w-4" />
                <span>{format(dueDateObj, 'MMM d, yyyy')}</span>
                {isOverdue && <AlertTriangle className="h-4 w-4 text-red-600" />}
              </div>

              {task.sharedWith && task.sharedWith.length > 0 && (
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Shared with {task.sharedWith.length}</span>
                  <div className="flex -space-x-1">
                    {task.sharedWith.slice(0, 3).map((email, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-white">
                        <AvatarFallback className="text-xs">
                          {email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Quick status buttons */}
            <div className="flex space-x-1">
              {task.status !== 'completed' && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStatusChange('completed')}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              )}
              {task.status !== 'in-progress' && task.status !== 'completed' && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStatusChange('in-progress')}
                  className="text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                >
                  <Clock className="h-4 w-4" />
                </Button>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
