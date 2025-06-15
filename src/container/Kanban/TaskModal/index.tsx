import React, { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import Button from "../../../components/Button";
import type { TaskType } from "../../../types/task.types";
import {
  CloseButton,
  FormGroup,
  Label,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  Select,
} from "./style";
import Input from "../../../components/Input";
import { PriorityBadge } from "../Task/styles";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<TaskType, "id" | "createdAt" | "updatedAt">) => void;
  task?: TaskType | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  task,
}) => {
  const [formData, setFormData] = useState<TaskType>({
    id: task?.id || "",
    title: "",
    description: "",
    status: "todo",
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
        priority: task.priority || "",
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      });
    } else {
      setFormData({
        id: "",
        title: "",
        description: "",
        status: "todo",
        priority: "low",
        createdAt: 0,
        updatedAt: 0,
      });
    }
  }, [task, isOpen]);

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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{task ? "Edit Task" : "Create New Task"}</ModalTitle>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <ModalBody>
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
          </ModalBody>

          <ModalFooter>
            <Button variant="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              isFullWidth
              variant="primary"
              disabled={!formData.title.trim()}
            >
              {task ? "Update Task" : "Create Task"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default TaskModal;
