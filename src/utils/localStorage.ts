import { getFirstName } from "./index";

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
