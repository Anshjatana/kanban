import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContainer = styled.div`
  background: ${(props) => props.theme.colors.bg.primary};
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid ${(props) => props.theme.colors.surface.primary};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.surface.primary};
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.text.secondary};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colors.bg.tertiary};
    color: ${(props) => props.theme.colors.text.primary};
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.surface.primary};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.bg.secondary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.interactive.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.interactive.primary}20;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.surface.primary};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.bg.secondary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.interactive.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.interactive.primary}20;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.text.secondary};
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.surface.border};
  border-radius: 6px;
  background: ${(props) => props.theme.colors.bg.secondary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.interactive.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.interactive.primary}20;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.surface.primary};
  justify-content: flex-end;
`;
