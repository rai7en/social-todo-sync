
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertTriangle, Users } from "lucide-react";
import { Task } from "@/types/task";

interface StatsCardsProps {
  tasks: Task[];
}

export const StatsCards = ({ tasks }: StatsCardsProps) => {
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const overdueTasks = tasks.filter(task => {
    const today = new Date();
    const taskDue = new Date(task.dueDate);
    return taskDue < today && task.status !== 'completed';
  }).length;
  const sharedTasks = tasks.filter(task => task.sharedWith && task.sharedWith.length > 0).length;

  const stats = [
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Shared",
      value: sharedTasks,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
