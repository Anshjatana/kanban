import styled from "styled-components";

export const ColumnContainer = styled.div`
  flex: 1;
  min-width: 320px;
  background: ${(props) => props.theme.colors.bg.secondary};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.surface.primary};
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1024px) {
    min-width: 100%;
  }
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const ColumnTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const StatusIndicator = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.$color};
  box-shadow: 0 0 8px ${(props) => props.$color}40;
`;

export const ColumnName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;

export const TaskCount = styled.span`
  background: ${(props) => props.theme.colors.bg.tertiary};
  color: ${(props) => props.theme.colors.text.secondary};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const AddTaskButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => props.theme.colors.bg.primary};
  border: 2px dashed ${(props) => props.theme.colors.surface.primary};
  color: ${(props) => props.theme.colors.text.secondary};
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    border-color: ${(props) => props.theme.colors.interactive.primary};
    color: ${(props) => props.theme.colors.interactive.primary};
    background: ${(props) => props.theme.colors.interactive.primary}10;
  }
`;

export const TasksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 50px;
`;

export const DropZone = styled.div`
  min-height: 100%;
  border-radius: 8px;
  transition: all 0.2s ease;

  &.drag-over {
    background: ${(props) => props.theme.colors.interactive.primary}10;
    border: 2px dashed ${(props) => props.theme.colors.interactive.primary};
  }
`;
