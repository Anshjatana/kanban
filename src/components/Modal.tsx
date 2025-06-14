// src/components/Modal/Modal.tsx
import React, { useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscapeKey?: boolean;
  preventScroll?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
`;

// Size configurations
const getSizeStyles = (size: ModalSize) => {
  const sizes = {
    sm: css`
      width: 90vw;
      max-width: 400px;
      max-height: 90vh;
    `,
    md: css`
      width: 90vw;
      max-width: 500px;
      max-height: 90vh;
    `,
    lg: css`
      width: 90vw;
      max-width: 700px;
      max-height: 90vh;
    `,
    xl: css`
      width: 90vw;
      max-width: 900px;
      max-height: 90vh;
    `,
    full: css`
      width: 95vw;
      height: 95vh;
      max-width: none;
      max-height: none;
    `,
  };

  return sizes[size];
};

const Backdrop = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.bg.primary}80;
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};

  animation: ${({ $isClosing }) => ($isClosing ? fadeOut : fadeIn)} 0.2s
    ease-out;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    align-items: flex-end;
  }
`;

const ModalContainer = styled.div<{
  $size: ModalSize;
  $isClosing: boolean;
}>`
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  border: 1px solid ${({ theme }) => theme.colors.surface.border};
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  ${({ $size }) => getSizeStyles($size)}

  animation: ${({ $isClosing }) =>
    $isClosing ? slideOut : slideIn} 0.2s ease-out;

  @media (max-width: 768px) {
    width: 100%;
    max-height: 85vh;
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const ModalHeader = styled.div<{ $hasTitle: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) =>
    `${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
  flex-shrink: 0;

  ${({ $hasTitle }) =>
    !$hasTitle &&
    css`
      padding: ${({ theme }) => theme.spacing.md};
      border-bottom: none;
      justify-content: flex-end;
    `}
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface.hover};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.interactive.primary};
    outline-offset: 2px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};

  /* Custom scrollbar for better UX */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface.secondary};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.surface.border};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const ModalFooter = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing.md} ${theme.spacing.lg} ${theme.spacing.lg}`};
  border-top: 1px solid ${({ theme }) => theme.colors.surface.border};
  flex-shrink: 0;
`;

// Close icon component
const CloseIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5L5 15M5 5L15 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = "md",
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscapeKey = true,
  preventScroll = true,
  children,
  footer,
  className,
}) => {
  const [isClosing, setIsClosing] = React.useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscapeKey) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscapeKey]);

  // Handle scroll prevention
  useEffect(() => {
    if (!isOpen || !preventScroll) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, preventScroll]);

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      // Focus the modal container after a brief delay to ensure it's rendered
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);
    } else if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  // Handle focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200); // Match animation duration
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Backdrop $isClosing={isClosing} onClick={handleBackdropClick}>
      <ModalContainer
        ref={modalRef}
        $size={size}
        $isClosing={isClosing}
        className={className}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <ModalHeader $hasTitle={!!title}>
          {title && <ModalTitle id="modal-title">{title}</ModalTitle>}
          {showCloseButton && (
            <CloseButton
              onClick={handleClose}
              aria-label="Close modal"
              type="button"
            >
              <CloseIcon />
            </CloseButton>
          )}
        </ModalHeader>

        <ModalBody>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
