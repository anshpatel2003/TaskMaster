
import React from 'react';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus } from '@/types';
import { AlertCircle, ArrowRightCircle, CheckCircle2 } from 'lucide-react';

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  icon?: React.ReactNode;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ 
  title, 
  status, 
  tasks,
  icon 
}) => {
  // Filter tasks by status
  const filteredTasks = tasks.filter(task => task.status === status);
  
  const getStatusIcon = () => {
    switch (status) {
      case 'todo':
        return icon || <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'in-progress':
        return icon || <ArrowRightCircle className="h-5 w-5 text-yellow-500" />;
      case 'completed':
        return icon || <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center mb-4 gap-2">
        {getStatusIcon()}
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-sm bg-gray-100 px-2 py-0.5 rounded-full">
          {filteredTasks.length}
        </span>
      </div>
      
      <div className="flex-1 overflow-auto pb-4 pr-1">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            <p className="text-gray-500 text-sm">No tasks in this column</p>
          </div>
        )}
      </div>
    </div>
  );
};
