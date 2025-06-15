import React, { createContext, useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import type { ColumnType, DragState, Task } from "../types/task.types";
import { storage } from "../utils/localStorage";
import { darkTheme, lightTheme } from "../lib/theme";

interface AppContextType {
  // Theme
  theme: "light" | "dark";
  toggleTheme: () => void;

  // User
  user: { name: string } | null;
  setUser: (user: { name: string } | null) => void;

  // Tasks
  tasks: Task[];
  selectedTask: Task | null;
  dragState: DragState;

  // Task actions
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, targetColumn: ColumnType) => void;
  selectTask: (task: Task | null) => void;

  // Drag actions
  startDrag: (task: Task) => void;
  endDrag: () => void;
  dragOver: (column: ColumnType | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState<"light" | "dark">(
    "dark"
  );
  const [user, setUser] = React.useState<{ name: string } | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    const savedTheme = storage.getTheme();
    const savedUser = storage.getUser();

    setCurrentTheme(savedTheme);
    setUser(savedUser);
  }, []);

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    storage.setTheme(newTheme);
  };

  const themeObject = currentTheme === "light" ? lightTheme : darkTheme;

  // Mock context value for now
  const contextValue: AppContextType = {
    theme: currentTheme,
    toggleTheme,
    user,
    setUser: (newUser) => {
      setUser(newUser);
      storage.setUser(newUser);
    },
    tasks: [],
    selectedTask: null,
    dragState: { isDragging: false, draggedTask: null, draggedOver: null },
    addTask: () => {},
    updateTask: () => {},
    deleteTask: () => {},
    moveTask: () => {},
    selectTask: () => {},
    startDrag: () => {},
    endDrag: () => {},
    dragOver: () => {},
  };

  return (
    <AppContext.Provider value={contextValue}>
      <ThemeProvider theme={themeObject}>{children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
