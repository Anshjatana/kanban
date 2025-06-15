import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Column from "../Column";
import TaskModal from "../TaskModal";
import type { ColumnType, TaskType } from "../../../types/task.types";
import { useAppContext } from "../../../context/AppContext";
import { presetTaskData } from "../../../constants";

const BoardContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 70vh;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const BoardHeader = styled.div`
  text-align: center;
  margin: 0 1rem;
  margin-bottom: 2rem;
`;

const BoardTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.interactive.primary},
    ${(props) => props.theme.colors.interactive.primaryHover}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
`;

const BoardSubtitle = styled.em`
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: 1.1rem;
`;

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>(presetTaskData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [draggedTask, setDraggedTask] = useState<TaskType | null>(null);
  const [targetColumnStatus, setTargetColumnStatus] = useState<
    "todo" | "in-progress" | "done" | null
  >(null);
  const { user } = useAppContext();

  // Loading tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("kanban-tasks");
    if (savedTasks) {
      const tasks: TaskType[] = JSON.parse(savedTasks);
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          tasks: tasks.filter((task) => task.status === column.status),
        }))
      );
    }
  }, []);

  // Save tasks to localStorage whenever columns change
  useEffect(() => {
    const allTasks = columns.flatMap((column) => column.tasks);
    localStorage.setItem("kanban-tasks", JSON.stringify(allTasks));
  }, [columns]);

  const handleCreateTask = (columnStatus: "todo" | "in-progress" | "done") => {
    setEditingTask(null);
    setTargetColumnStatus(columnStatus);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: TaskType) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const sortTasksByPriority = (tasks: TaskType[]) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...tasks].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  const handleSaveTask = (
    taskData: Omit<TaskType, "id" | "createdAt" | "updatedAt">
  ) => {
    const now = new Date().toISOString();

    if (editingTask && editingTask.id) {
      // Update existing task
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          tasks: sortTasksByPriority(
            column.tasks.map((task) =>
              task.id === editingTask.id
                ? { ...task, ...taskData, updatedAt: now }
                : task
            )
          ),
        }))
      );
    } else {
      const allCurrentTasks = columns.flatMap((column) => column.tasks);
      const totalTasks = allCurrentTasks.length;

      const newTask: TaskType = {
        id: `knbn-${totalTasks + 1}`,
        ...taskData,
        status: targetColumnStatus || taskData.status, // Use targetColumnStatus
        createdAt: now,
        updatedAt: now,
      };

      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.status === newTask.status
            ? {
                ...column,
                tasks: sortTasksByPriority([...column.tasks, newTask]),
              }
            : column
        )
      );
    }

    setIsModalOpen(false);
    setEditingTask(null);
    setTargetColumnStatus(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      }))
    );
  };

  const handleDragStart = (task: TaskType) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent,
    targetStatus: "todo" | "in-progress" | "done"
  ) => {
    e.preventDefault();

    if (!draggedTask) return;

    if (draggedTask.status === targetStatus) {
      setDraggedTask(null);
      return;
    }

    // Updating task status and move between columns
    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.status === draggedTask.status) {
          // Removing from source column
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== draggedTask.id),
          };
        } else if (column.status === targetStatus) {
          // Adding to target column and sort by priority
          const updatedTasks = [
            ...column.tasks,
            {
              ...draggedTask,
              status: targetStatus,
              updatedAt: new Date().toISOString(),
            },
          ];
          return {
            ...column,
            tasks: sortTasksByPriority(updatedTasks),
          };
        }
        return column;
      })
    );

    setDraggedTask(null);
  };

  return (
    <>
      <BoardHeader>
        <BoardTitle>
          Hi {user?.name || "User"}, Manage your tasks efficiently
        </BoardTitle>
        <BoardSubtitle>
          "Turning ideas into action, one task at a time."
        </BoardSubtitle>
        <BoardSubtitle></BoardSubtitle>
      </BoardHeader>

      <BoardContainer>
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onCreateTask={() => handleCreateTask(column.status)}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          />
        ))}
      </BoardContainer>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
          setTargetColumnStatus(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
        targetColumnStatus={targetColumnStatus || "todo"}
      />
    </>
  );
};

export default KanbanBoard;
