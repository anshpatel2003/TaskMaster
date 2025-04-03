
import React, { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";
import { Task, TaskStatus } from '@/types';

// Initial mock data
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finalize the project proposal document with all requirements',
    status: 'todo',
    priority: 'high',
    dueDate: '2023-06-30',
    createdAt: '2023-06-15T10:00:00Z',
    updatedAt: '2023-06-15T10:00:00Z',
    userId: '1',
    tags: ['work', 'important']
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review and approve pending pull requests',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '2023-06-16T09:30:00Z',
    updatedAt: '2023-06-16T14:20:00Z',
    userId: '1',
    tags: ['work', 'code']
  },
  {
    id: '3',
    title: 'Update documentation',
    description: 'Update project documentation with recent changes',
    status: 'completed',
    priority: 'low',
    createdAt: '2023-06-14T11:45:00Z',
    updatedAt: '2023-06-17T16:30:00Z',
    userId: '1',
    tags: ['work', 'docs']
  },
  {
    id: '4',
    title: 'Prepare for presentation',
    description: 'Create slides for the upcoming team presentation',
    status: 'todo',
    priority: 'high',
    dueDate: '2023-07-05',
    createdAt: '2023-06-18T13:15:00Z',
    updatedAt: '2023-06-18T13:15:00Z',
    userId: '1',
    tags: ['work', 'presentation']
  },
  {
    id: '5',
    title: 'Weekly team meeting',
    description: 'Attend the weekly team sync meeting',
    status: 'todo',
    priority: 'medium',
    dueDate: '2023-06-26',
    createdAt: '2023-06-19T08:00:00Z',
    updatedAt: '2023-06-19T08:00:00Z',
    userId: '1',
    tags: ['work', 'meeting']
  }
];

// Define the TaskContext type
interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

type TaskAction = 
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'UPDATE_TASK_STATUS'; payload: { id: string; status: TaskStatus } };

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask: Task = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return [...state, newTask];
    case 'UPDATE_TASK':
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...action.payload, updatedAt: new Date().toISOString() }
          : task
      );
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    case 'UPDATE_TASK_STATUS':
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              status: action.payload.status,
              updatedAt: new Date().toISOString()
            }
          : task
      );
    default:
      return state;
  }
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'ADD_TASK', payload: task });
    toast.success("Task added successfully");
  };

  const updateTask = (task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
    toast.success("Task updated successfully");
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
    toast.success("Task deleted successfully");
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    dispatch({
      type: 'UPDATE_TASK_STATUS',
      payload: { id, status }
    });
    toast.success(`Task moved to ${status.replace('-', ' ')}`);
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        addTask, 
        updateTask, 
        deleteTask, 
        updateTaskStatus 
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
