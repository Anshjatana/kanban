// hooks/useTaskManager.ts
import { useTaskContext } from "../context/TaskContext";
import type { ColumnType } from "../types/task.types";

export const useTaskManager = () => {
  const { tasks, addTask, updateTask, deleteTask, selectTask, selectedTask } =
    useTaskContext();

  // Get tasks by column
  const getTasksByColumn = (column: ColumnType) => {
    return tasks.filter((task) => task.column === column);
  };

  // Get task counts
  const getTaskCounts = () => ({
    todo: getTasksByColumn("todo").length,
    inProgress: getTasksByColumn("in-progress").length,
    done: getTasksByColumn("done").length,
    total: tasks.length,
  });

  return {
    tasks,
    selectedTask,
    addTask,
    updateTask,
    deleteTask,
    selectTask,
    getTasksByColumn,
    getTaskCounts,
  };
};
