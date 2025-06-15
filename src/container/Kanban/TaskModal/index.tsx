import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import type { TaskModalProps, TaskType } from "../../../types/task.types";
import { PriorityBadge } from "../Task/styles";
import { FormGroup, Label, Select } from "./style";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Modal from "../../../components/Modal";

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
  targetColumnStatus,
}) => {
  const [formData, setFormData] = useState<TaskType>({
    id: task?.id || "",
    title: "",
    description: "",
    status: targetColumnStatus || "todo",
    priority: "low" as "low" | "medium" | "high",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        title: task.title,
        description: task.description || "",
        status: task.status,
        priority: task.priority || "low",
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      });
    } else {
      setFormData({
        id: "",
        title: "",
        description: "",
        status: targetColumnStatus || "todo",
        priority: "low",
        createdAt: 0,
        updatedAt: 0,
      });
    }
  }, [task, isOpen, targetColumnStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const modalFooter = (
    <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
      <Button variant="danger" onClick={onClose}>
        Cancel
      </Button>
      <Button
        isFullWidth
        type="submit"
        form="task-form"
        variant="primary"
        disabled={!formData.title.trim()}
      >
        {task ? "Update Task" : "Create Task"}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? "Edit Task" : "Create New Task"}
      size="md"
      footer={modalFooter}
    >
      <form id="task-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Task Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title..."
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description..."
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Priority</Label>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            {["low", "medium", "high"].map((priority) => (
              <PriorityBadge
                key={priority}
                $priority={priority as "low" | "medium" | "high"}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    priority: priority as "low" | "medium" | "high",
                  }))
                }
                style={{
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  opacity: formData.priority === priority ? 1 : 0.6,
                  border:
                    formData.priority === priority
                      ? "1px solid"
                      : "1px solid transparent",
                  transition: "all 0.2s ease",
                }}
              >
                <AlertCircle size={10} style={{ marginRight: "2px" }} />
                {priority}
              </PriorityBadge>
            ))}
          </div>
        </FormGroup>
      </form>
    </Modal>
  );
};

export default TaskModal;
