import styled, { css, keyframes } from "styled-components";
import { getSizeStyles } from "../../constants";
import type { ModalSize } from "../../types";

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

export const Backdrop = styled.div<{ $isClosing: boolean }>`
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

  @media (max-width: 1024px) {
    padding: ${({ theme }) => theme.spacing.md};
    align-items: flex-end;
  }
`;

export const ModalContainer = styled.div<{
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

  @media (max-width: 1024px) {
    width: 100%;
    max-height: 85vh;
    margin-bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const ModalHeader = styled.div<{ $hasTitle: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.bg.primary};
  padding: ${({ theme }) =>
    `${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md}`};
  // border-bottom: 1px solid ${({ theme }) => theme.colors.surface.border};
  flex-shrink: 0;

  ${({ $hasTitle }) =>
    !$hasTitle &&
    css`
      padding: ${({ theme }) => theme.spacing.md};
      border-bottom: none;
      justify-content: flex-end;
    `}
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: 1.4;
`;

export const CloseButton = styled.button`
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

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.bg.primary};
`;

export const ModalFooter = styled.div`
  padding: ${({ theme }) =>
    `${theme.spacing.md} ${theme.spacing.lg} ${theme.spacing.lg}`};
  border-top: 1px solid ${({ theme }) => theme.colors.surface.border};
  background-color: ${({ theme }) => theme.colors.bg.primary};
  flex-shrink: 0;
`;
