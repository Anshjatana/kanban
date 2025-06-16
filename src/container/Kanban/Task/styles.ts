import styled from "styled-components";

export const TaskContainer = styled.div`
  background: ${(props) => props.theme.colors.bg.primary};
  border: 1px solid ${(props) => props.theme.colors.surface.primary};
  border-radius: 8px;
  padding: 1rem;
  cursor: grab;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${(props) => props.theme.colors.interactive.primary};
  }

  &:active {
    cursor: grabbing;
  }
    &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 30% 20%,
        ${(props) => props.theme.colors.interactive.primary}10 0%,
        transparent 50%
      ),
      radial-gradient(
        ${(props) => props.theme.colors.interactive.primary}15 0%,
        transparent 50%
      );
    pointer-events: none;
  }

  &.dragging {
    opacity: 0.5;
  }
`;

export const TaskContent = styled.div`
  margin-bottom: 0.75rem;
`;

export const TaskTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  text-align: left;
`;

export const TaskDescription = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin: 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-align: left;
`;

export const TaskMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const PriorityBadge = styled.span<{ $priority: string }>`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  text-transform: uppercase;
  background: ${(props) => {
    switch (props.$priority) {
      case "high":
        return "#ef444420";
      case "medium":
        return "#f59e0b20";
      case "low":
        return "#10b98120";
      default:
        return props.theme.colors.bg.tertiary;
    }
  }};
  color: ${(props) => {
    switch (props.$priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return props.theme.colors.text.secondary;
    }
  }};
`;

export const TaskActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.25rem;
  border-radius: 4px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.secondary};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.bg.tertiary};
    color: ${(props) => props.theme.colors.text.primary};
  }

  &.delete:hover {
    color: #ef4444;
    background: #ef444410;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

export const Open = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  gap: 0.5rem;
  cursor: pointer;
  background: ${(props) => props.theme.colors.bg.secondary};
`;
