import { getFirstName } from "./index";
import { getInitialTasks } from "../constants";
import type { Task } from "../types/task.types";

const KEYS = {
  USER: "kanban-user",
  TASKS: "kanban-tasks",
  THEME: "kanban-theme",
} as const;

export const storage = {
  getUser: (): { name: string } | null => {
    try {
      const userStr = localStorage.getItem(KEYS.USER);
      if (!userStr) return null;

      const user = JSON.parse(userStr);
      if (user && typeof user.name === "string" && user.name.trim()) {
        // Get first name only when retrieving from storage
        const firstName = getFirstName(user.name);
        return firstName ? { name: firstName } : null;
      }
      return null;
    } catch (error) {
      console.warn("Failed to get user from localStorage:", error);
      return null;
    }
  },

  setUser: (user: { name: string } | null): void => {
    try {
      if (!user) {
        localStorage.removeItem(KEYS.USER);
        return;
      }

      // Store only the first name in title case
      const firstName = getFirstName(user.name);
      if (firstName) {
        localStorage.setItem(KEYS.USER, JSON.stringify({ name: firstName }));
      } else {
        localStorage.removeItem(KEYS.USER);
      }
    } catch (error) {
      console.warn("Failed to set user in localStorage:", error);
    }
  },

  getTasks: (): Task[] => {
    try {
      const tasksStr = localStorage.getItem(KEYS.TASKS);
      if (!tasksStr) {
        const initialTasks = getInitialTasks();
        storage.setTasks(initialTasks);
        return initialTasks;
      }

      const tasks = JSON.parse(tasksStr);
      if (Array.isArray(tasks)) {
        return tasks.filter(
          (task) =>
            task &&
            typeof task.id === "string" &&
            typeof task.title === "string" &&
            typeof task.description === "string" &&
            ["todo", "in-progress", "done"].includes(task.column) &&
            typeof task.createdAt === "number" &&
            typeof task.updatedAt === "number"
        );
      }

      const initialTasks = getInitialTasks();
      storage.setTasks(initialTasks);
      return initialTasks;
    } catch (error) {
      console.warn("Failed to get tasks from localStorage:", error);
      const initialTasks = getInitialTasks();
      storage.setTasks(initialTasks);
      return initialTasks;
    }
  },

  setTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.warn("Failed to set tasks in localStorage:", error);
    }
  },

  getTheme: (): "light" | "dark" => {
    try {
      const themeStr = localStorage.getItem(KEYS.THEME);
      if (themeStr === "light" || themeStr === "dark") {
        return themeStr;
      }

      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }

      return "light";
    } catch (error) {
      console.warn("Failed to get theme from localStorage:", error);
      return "dark";
    }
  },

  setTheme: (theme: "light" | "dark"): void => {
    try {
      localStorage.setItem(KEYS.THEME, theme);
    } catch (error) {
      console.warn("Failed to set theme in localStorage:", error);
    }
  },
};
