
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Task } from '@/types';
import { useTaskContext } from '@/contexts/TaskContext';
import { 
  Calendar, 
  Clock, 
  Edit, 
  Trash2, 
  ArrowRightCircle,
  CheckCircle2,
  AlertCircle,
  Tag
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TaskForm } from './TaskForm';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask, updateTaskStatus } = useTaskContext();
  const [open, setOpen] = React.useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-blue-500';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleMoveTask = (newStatus: 'todo' | 'in-progress' | 'completed') => {
    updateTaskStatus(task.id, newStatus);
  };

  return (
    <Card className="animate-fade-in task-card w-full mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">
              {formatDate(task.createdAt)}
            </CardDescription>
          </div>
          <Badge className={`${getPriorityColor(task.priority)} text-white`}>
            {task.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-sm text-gray-700 mb-3">{task.description}</p>
        
        {task.dueDate && (
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>
        )}
        
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {task.tags.map(tag => (
              <div key={tag} className="flex items-center bg-gray-100 text-xs px-2 py-1 rounded-full">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex space-x-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogDescription>
                  Make changes to your task here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <TaskForm existingTask={task} onComplete={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs text-destructive" 
            onClick={() => deleteTask(task.id)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
        
        <div className="flex space-x-1">
          {task.status !== 'todo' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => handleMoveTask('todo')}
              title="Move to Todo"
            >
              <AlertCircle className="h-4 w-4 text-blue-500" />
            </Button>
          )}
          
          {task.status !== 'in-progress' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => handleMoveTask('in-progress')}
              title="Move to In Progress"
            >
              <ArrowRightCircle className="h-4 w-4 text-yellow-500" />
            </Button>
          )}
          
          {task.status !== 'completed' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => handleMoveTask('completed')}
              title="Mark as Completed"
            >
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
