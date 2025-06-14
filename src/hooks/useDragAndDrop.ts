// hooks/useDragAndDrop.ts
import { useTaskContext } from "../context/TaskContext";
import type { Task, ColumnType } from "../types/task.types";

export const useDragAndDrop = () => {
  const { startDrag, endDrag, moveTask, dragState } = useTaskContext();

  const handleDragStart = (task: Task) => {
    startDrag(task);
  };

  const handleDrop = (column: ColumnType) => {
    if (dragState.draggedTask && dragState.draggedTask.column !== column) {
      moveTask(dragState.draggedTask.id, column);
    }
    endDrag();
  };

  return {
    handleDragStart,
    handleDrop,
    isDragging: dragState.isDragging,
    draggedTask: dragState.draggedTask,
  };
};
