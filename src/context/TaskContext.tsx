// context/TaskContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Task, ColumnType, DragState } from "../types/task.types";
import { storage } from "../utils/localstorage";

// Action types
type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Omit<Task, "id" | "createdAt" | "updatedAt"> }
  | { type: "UPDATE_TASK"; payload: { id: string; updates: Partial<Task> } }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "MOVE_TASK"; payload: { taskId: string; targetColumn: ColumnType } }
  | { type: "SELECT_TASK"; payload: Task | null }
  | { type: "START_DRAG"; payload: Task }
  | { type: "END_DRAG" }
  | { type: "DRAG_OVER"; payload: ColumnType | null };

// State interface
interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  dragState: DragState;
}

// Context interface
interface TaskContextType extends TaskState {
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, targetColumn: ColumnType) => void;
  selectTask: (task: Task | null) => void;
  startDrag: (task: Task) => void;
  endDrag: () => void;
  dragOver: (column: ColumnType | null) => void;
}

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Initial state
const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  dragState: {
    isDragging: false,
    draggedTask: null,
    draggedOver: null,
  },
};

// Reducer function
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    case "ADD_TASK": {
      const newTask: Task = {
        ...action.payload,
        id: generateId(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const updatedTasks = [...state.tasks, newTask];
      storage.setTasks(updatedTasks);

      return {
        ...state,
        tasks: updatedTasks,
      };
    }

    case "UPDATE_TASK": {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              ...action.payload.updates,
              updatedAt: Date.now(),
            }
          : task
      );

      storage.setTasks(updatedTasks);

      return {
        ...state,
        tasks: updatedTasks,
        selectedTask:
          state.selectedTask?.id === action.payload.id
            ? { ...state.selectedTask, ...action.payload.updates }
            : state.selectedTask,
      };
    }

    case "DELETE_TASK": {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      storage.setTasks(updatedTasks);

      return {
        ...state,
        tasks: updatedTasks,
        selectedTask:
          state.selectedTask?.id === action.payload ? null : state.selectedTask,
      };
    }

    case "MOVE_TASK": {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.taskId
          ? {
              ...task,
              status: action.payload.targetColumn,
              updatedAt: Date.now(),
            }
          : task
      );

      storage.setTasks(updatedTasks);

      return {
        ...state,
        tasks: updatedTasks,
        selectedTask:
          state.selectedTask?.id === action.payload.taskId
            ? { ...state.selectedTask, column: action.payload.targetColumn }
            : state.selectedTask,
      };
    }

    case "SELECT_TASK":
      return {
        ...state,
        selectedTask: action.payload,
      };

    case "START_DRAG":
      return {
        ...state,
        dragState: {
          isDragging: true,
          draggedTask: action.payload,
          draggedOver: null,
        },
      };

    case "END_DRAG":
      return {
        ...state,
        dragState: {
          isDragging: false,
          draggedTask: null,
          draggedOver: null,
        },
      };

    case "DRAG_OVER":
      return {
        ...state,
        dragState: {
          ...state.dragState,
          draggedOver: action.payload,
        },
      };

    default:
      return state;
  }
};

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider component
interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = storage.getTasks();
    if (savedTasks.length > 0) {
      dispatch({ type: "SET_TASKS", payload: savedTasks });
    }
  }, []);

  // Action creators
  const addTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    dispatch({ type: "UPDATE_TASK", payload: { id, updates } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const moveTask = (taskId: string, targetColumn: ColumnType) => {
    dispatch({ type: "MOVE_TASK", payload: { taskId, targetColumn } });
  };

  const selectTask = (task: Task | null) => {
    dispatch({ type: "SELECT_TASK", payload: task });
  };

  const startDrag = (task: Task) => {
    dispatch({ type: "START_DRAG", payload: task });
  };

  const endDrag = () => {
    dispatch({ type: "END_DRAG" });
  };

  const dragOver = (column: ColumnType | null) => {
    dispatch({ type: "DRAG_OVER", payload: column });
  };

  const contextValue: TaskContextType = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    selectTask,
    startDrag,
    endDrag,
    dragOver,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

// Custom hook
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
