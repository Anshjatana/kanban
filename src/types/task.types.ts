export type ColumnType = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  column: ColumnType;
  priority: TaskPriority;
  createdAt: number;
  updatedAt: number;
}

export interface DragState {
  isDragging: boolean;
  draggedTask: Task | null;
  draggedOver: ColumnType | null;
}

export interface AppContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;

  user: { name: string } | null;
  setUser: (user: { name: string } | null) => void;

  tasks: Task[];
  selectedTask: Task | null;
  dragState: DragState;

  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, targetColumn: ColumnType) => void;
  selectTask: (task: Task | null) => void;

  startDrag: (task: Task) => void;
  endDrag: () => void;
  dragOver: (column: ColumnType | null) => void;
}
