export type TaskPriority = "low" | "medium" | "high";

export interface TaskType {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: TaskPriority;
  createdAt: string | number;
  updatedAt: string | number;
}

export interface ColumnType {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  color: string;
  tasks: TaskType[];
}

export interface DragState {
  isDragging: boolean;
  draggedTask: TaskType | null;
  draggedOver: ColumnType | null;
}

export interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;

  user: { name: string } | null;
  setUser: (user: { name: string } | null) => void;

  tasks: TaskType[];
  selectedTask: TaskType | null;
  dragState: DragState;

  addTask: (task: Omit<TaskType, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<TaskType>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, targetColumn: ColumnType) => void;
  selectTask: (task: TaskType | null) => void;

  startDrag: (task: TaskType) => void;
  endDrag: () => void;
  dragOver: (column: ColumnType | null) => void;
}
