import React from "react";
import { Plus } from "lucide-react";
import type { ColumnType, TaskType } from "../../../types/task.types";
import Task from "../Task";
import {
  AddTaskButton,
  ColumnContainer,
  ColumnHeader,
  ColumnName,
  ColumnTitle,
  DropZone,
  StatusIndicator,
  TaskCount,
  TasksList,
} from "./Styles";

interface ColumnProps {
  column: ColumnType;
  onCreateTask: () => void;
  onEditTask: (task: TaskType) => void;
  onDeleteTask: (taskId: string) => void;
  onDragStart: (task: TaskType) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  onCreateTask,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
    onDragOver(e);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop(e);
  };

  return (
    <ColumnContainer>
      <ColumnHeader>
        <ColumnTitle>
          <StatusIndicator $color={column.color} />
          <ColumnName>{column.title}</ColumnName>
        </ColumnTitle>
        <TaskCount>{column.tasks.length}</TaskCount>
      </ColumnHeader>

      <AddTaskButton onClick={onCreateTask}>
        <Plus size={16} />
        Add New Task
      </AddTaskButton>

      <DropZone
        className={isDragOver ? "drag-over" : ""}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <TasksList>
          {column.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onDragStart={onDragStart}
            />
          ))}
        </TasksList>
      </DropZone>
    </ColumnContainer>
  );
};

export default Column;
