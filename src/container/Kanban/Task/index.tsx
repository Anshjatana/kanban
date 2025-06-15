import React from "react";
import {
  Edit2,
  Trash2,
  AlertCircle,
  SquareArrowOutUpRight,
} from "lucide-react";
import type { TaskType } from "../../../types/task.types";
import {
  ActionButton,
  HeaderWrapper,
  Open,
  PriorityBadge,
  TaskActions,
  TaskContainer,
  TaskContent,
  TaskDescription,
  TaskMeta,
  TaskTitle,
} from "./styles";

interface TaskProps {
  task: TaskType;
  onEdit: (task: TaskType) => void;
  onDelete: (taskId: string) => void;
  onDragStart: (task: TaskType) => void;
}

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete, onDragStart }) => {
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
    onDragStart(task);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <TaskContainer
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={isDragging ? "dragging" : ""}
    >
      <HeaderWrapper>
        <TaskContent>
          <TaskDescription style={{ marginBottom: "8px" }}>
            {task.id}
          </TaskDescription>
          <TaskTitle>{task.title}</TaskTitle>
          {task.description && (
            <TaskDescription>{task.description}</TaskDescription>
          )}
        </TaskContent>
        <Open onClick={() => onEdit(task)}>
          <TaskDescription style={{ marginBottom: "0px" }}>
            {" "}
            Open
          </TaskDescription>
          <SquareArrowOutUpRight size={12} />
        </Open>
      </HeaderWrapper>

      <TaskMeta>
        {task.priority && (
          <PriorityBadge $priority={task.priority}>
            <AlertCircle size={10} style={{ marginRight: "2px" }} />
            {task.priority}
          </PriorityBadge>
        )}

        <TaskActions>
          <ActionButton onClick={() => onEdit(task)}>
            <Edit2 size={14} />
          </ActionButton>
          <ActionButton className="delete" onClick={() => onDelete(task.id)}>
            <Trash2 size={14} />
          </ActionButton>
        </TaskActions>
      </TaskMeta>
    </TaskContainer>
  );
};

export default Task;
