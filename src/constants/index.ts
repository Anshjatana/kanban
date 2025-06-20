import { css } from "styled-components";
import type { ColumnType, TaskType } from "../types/task.types";
import type { ModalSize } from "../types";

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

export const getInitialTasks = (): TaskType[] => [
  {
    id: "task-1",
    title: "Set up project structure",
    description: "Create the basic folder structure and install dependencies",
    status: "todo",
    priority: "medium",
    createdAt: Date.now() - 86400000, // 1 day ago
    updatedAt: Date.now() - 86400000,
  },
  {
    id: "task-2",
    title: "Implement drag and drop",
    description: "Add HTML5 drag and drop functionality with smooth animations",
    status: "in-progress",
    priority: "high",
    createdAt: Date.now() - 43200000, // 12 hours ago
    updatedAt: Date.now() - 43200000,
  },
  {
    id: "task-3",
    title: "Design system setup",
    description: "Create theme provider and design tokens",
    status: "done",
    priority: "low",
    createdAt: Date.now() - 172800000, // 2 days ago
    updatedAt: Date.now() - 21600000, // 6 hours ago
  },
];

export const demoData = [
  {
    title: "To Do",
    color: "#ef4444",
    tasks: [
      { title: "Design new landing page", meta: "Due in 3 days" },
      { title: "Review user feedback", meta: "High priority" },
      { title: "Write unit tests", meta: "Due tomorrow" },
      { title: "Plan sprint goals", meta: "Team meeting at 3 PM" },
    ],
  },
  {
    title: "In Progress",
    color: "#f59e0b",
    tasks: [
      { title: "Implement dark mode", meta: "Sarah Johnson" },
      { title: "Fix mobile responsive issues", meta: "2 hours logged" },
      { title: "Refactor authentication logic", meta: "John Doe" },
      { title: "Optimize database queries", meta: "Performance improvement" },
    ],
  },
  {
    title: "Done",
    color: "#10b981",
    tasks: [
      { title: "Setup project repository", meta: "Completed yesterday" },
      { title: "Create wireframes", meta: "Approved by team" },
      { title: "Deploy staging environment", meta: "Completed 2 hours ago" },
      { title: "Update documentation", meta: "Reviewed by tech lead" },
    ],
  },
];

// Size configurations
export const getSizeStyles = (size: ModalSize) => {
  const sizes = {
    sm: css`
      width: 90vw;
      max-width: 400px;
      max-height: 90vh;
    `,
    md: css`
      width: 90vw;
      max-width: 500px;
      max-height: 90vh;
    `,
    lg: css`
      width: 90vw;
      max-width: 700px;
      max-height: 90vh;
    `,
    xl: css`
      width: 90vw;
      max-width: 900px;
      max-height: 90vh;
    `,
    full: css`
      width: 95vw;
      height: 95vh;
      max-width: none;
      max-height: none;
    `,
  };

  return sizes[size];
};

export const presetTaskData: ColumnType[] = [
  {
    id: "todo",
    title: "To Do",
    status: "todo",
    color: "#ef4444",
    tasks: [
      {
        id: "knbn-1",
        title: "Review project requirements",
        description:
          "Go through the project specification document and identify key deliverables",
        status: "todo",
        priority: "high",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "knbn-2",
        title: "Set up development environment",
        description:
          "Install necessary tools and configure the development workspace",
        status: "todo",
        priority: "medium",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: "knbn-3",
        title: "Create wireframes",
        description:
          "Design basic wireframes for the main user interface components",
        status: "todo",
        priority: "low",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    status: "in-progress",
    color: "#f59e0b",
    tasks: [
      {
        id: "knbn-4",
        title: "Implement authentication",
        description:
          "Build user login and registration functionality with JWT tokens",
        status: "in-progress",
        priority: "low",
        createdAt: Date.now() - 86400000, // 1 day ago
        updatedAt: Date.now(),
      },
      {
        id: "knbn-5",
        title: "Design database schema",
        description:
          "Create tables and relationships for user data and application content",
        status: "in-progress",
        priority: "medium",
        createdAt: Date.now() - 172800000, // 2 days ago
        updatedAt: Date.now(),
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    status: "done",
    color: "#10b981",
    tasks: [
      {
        id: "knbn-6",
        title: "Initialize project repository",
        description:
          "Set up Git repository with initial project structure and README",
        status: "done",
        priority: "high",
        createdAt: Date.now() - 259200000, // 3 days ago
        updatedAt: Date.now() - 172800000, // 2 days ago
      },
      {
        id: "knbn-7",
        title: "Research technology stack",
        description:
          "Evaluate and select appropriate frameworks and libraries for the project",
        status: "done",
        priority: "medium",
        createdAt: Date.now() - 345600000, // 4 days ago
        updatedAt: Date.now() - 259200000, // 3 days ago
      },
    ],
  },
];
