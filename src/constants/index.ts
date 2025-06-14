import type { Task } from "../types/task.types";

export const COLUMNS = {
  TODO: "todo" as const,
  IN_PROGRESS: "in-progress" as const,
  DONE: "done" as const,
} as const;

export const COLUMN_CONFIG = [
  {
    id: COLUMNS.TODO,
    title: "Todo",
    color: "#f3f4f6",
  },
  {
    id: COLUMNS.IN_PROGRESS,
    title: "In Progress",
    color: "#fef3c7",
  },
  {
    id: COLUMNS.DONE,
    title: "Done",
    color: "#d1fae5",
  },
] as const;

export const getInitialTasks = (): Task[] => [
  {
    id: "task-1",
    title: "Set up project structure",
    description: "Create the basic folder structure and install dependencies",
    column: "todo",
    priority: "medium",
    createdAt: Date.now() - 86400000, // 1 day ago
    updatedAt: Date.now() - 86400000,
  },
  {
    id: "task-2",
    title: "Implement drag and drop",
    description: "Add HTML5 drag and drop functionality with smooth animations",
    column: "in-progress",
    priority: "high",
    createdAt: Date.now() - 43200000, // 12 hours ago
    updatedAt: Date.now() - 43200000,
  },
  {
    id: "task-3",
    title: "Design system setup",
    description: "Create theme provider and design tokens",
    column: "done",
    priority: "low",
    createdAt: Date.now() - 172800000, // 2 days ago
    updatedAt: Date.now() - 21600000, // 6 hours ago
  },
];
