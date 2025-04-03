
import React, { useState } from 'react';
import { TaskColumn } from './TaskColumn';
import { useTaskContext } from '@/contexts/TaskContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TaskForm } from './TaskForm';
import { PlusCircle, ListTodo, Clock, CheckSquare } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { tasks } = useTaskContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your board. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <TaskForm onComplete={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
        <div className="bg-gray-50 rounded-lg p-4 overflow-hidden flex flex-col">
          <TaskColumn 
            title="To Do" 
            status="todo" 
            tasks={tasks}
            icon={<ListTodo className="h-5 w-5 text-blue-500" />}
          />
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 overflow-hidden flex flex-col">
          <TaskColumn 
            title="In Progress" 
            status="in-progress" 
            tasks={tasks}
            icon={<Clock className="h-5 w-5 text-yellow-500" />}
          />
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 overflow-hidden flex flex-col">
          <TaskColumn 
            title="Completed" 
            status="completed" 
            tasks={tasks}
            icon={<CheckSquare className="h-5 w-5 text-green-500" />}
          />
        </div>
      </div>
    </div>
  );
};
