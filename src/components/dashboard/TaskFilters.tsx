
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, AlertTriangle } from "lucide-react";
import { TaskStatus, TaskPriority, TaskFilters as TaskFiltersType } from "@/types/task";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onFiltersChange: (filters: TaskFiltersType) => void;
}

export const TaskFilters = ({ filters, onFiltersChange }: TaskFiltersProps) => {
  const updateFilter = (key: keyof TaskFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: 'all',
      priority: 'all',
      search: '',
      dueToday: false,
      overdue: false,
    });
  };

  const statusOptions: { value: TaskStatus | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'All Tasks', color: 'bg-gray-100 text-gray-800' },
    { value: 'todo', label: 'To Do', color: 'bg-blue-100 text-blue-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  ];

  const priorityOptions: { value: TaskPriority | 'all'; label: string; color: string }[] = [
    { value: 'all', label: 'All Priorities', color: 'bg-gray-100 text-gray-800' },
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Quick Filters</label>
          <div className="space-y-2">
            <Button
              variant={filters.dueToday ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter('dueToday', !filters.dueToday)}
              className="w-full justify-start"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Due Today
            </Button>
            <Button
              variant={filters.overdue ? "destructive" : "outline"}
              size="sm"
              onClick={() => updateFilter('overdue', !filters.overdue)}
              className="w-full justify-start"
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Overdue
            </Button>
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <div className="space-y-2">
            {statusOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.status === option.value ? "default" : "ghost"}
                size="sm"
                onClick={() => updateFilter('status', option.value)}
                className="w-full justify-start"
              >
                <Badge className={`mr-2 ${option.color} border-0`}>
                  {option.label}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <div className="space-y-2">
            {priorityOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.priority === option.value ? "default" : "ghost"}
                size="sm"
                onClick={() => updateFilter('priority', option.value)}
                className="w-full justify-start"
              >
                <Badge className={`mr-2 ${option.color} border-0`}>
                  {option.label}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
};
