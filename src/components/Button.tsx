import React from "react";
import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  precedingIcon?: React.ReactNode;
  followingIcon?: React.ReactNode;
  children: React.ReactNode;
}

// Variant styles
const getVariantStyles = (variant: ButtonVariant) => {
  const variants = {
    primary: css`
      background-color: ${({ theme }) => theme.colors.interactive.primary};
      color: ${({ theme }) => theme.colors.text.inverse};
      border: 1px solid ${({ theme }) => theme.colors.interactive.primary};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) =>
          theme.colors.interactive.primaryHover};
        border-color: ${({ theme }) => theme.colors.interactive.primaryHover};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.shadows.md};
      }

      &:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: ${({ theme }) => theme.shadows.sm};
      }
    `,
    secondary: css`
      background-color: ${({ theme }) => theme.colors.surface.secondary};
      color: ${({ theme }) => theme.colors.text.primary};
      border: 1px solid ${({ theme }) => theme.colors.surface.border};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.surface.hover};
        border-color: ${({ theme }) => theme.colors.text.tertiary};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.shadows.sm};
      }

      &:active:not(:disabled) {
        transform: translateY(0);
        background-color: ${({ theme }) => theme.colors.surface.secondary};
      }
    `,
    danger: css`
      background-color: ${({ theme }) => theme.colors.interactive.danger};
      color: ${({ theme }) => theme.colors.text.inverse};
      border: 1px solid ${({ theme }) => theme.colors.interactive.danger};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) =>
          theme.colors.interactive.dangerHover};
        border-color: ${({ theme }) => theme.colors.interactive.dangerHover};
        transform: translateY(-1px);
        box-shadow: ${({ theme }) => theme.shadows.md};
      }

      &:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: ${({ theme }) => theme.shadows.sm};
      }
    `,
  };

  return variants[variant];
};

// Size styles
const getSizeStyles = (size: ButtonSize) => {
  const sizes = {
    sm: css`
      padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
      font-size: 0.875rem;
      min-height: 32px;
      gap: ${({ theme }) => theme.spacing.xs};
    `,
    md: css`
      padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
      font-size: 0.9375rem;
      min-height: 40px;
      gap: ${({ theme }) => theme.spacing.sm};
    `,
    lg: css`
      padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
      font-size: 1rem;
      min-height: 48px;
      gap: ${({ theme }) => theme.spacing.sm};
    `,
  };

  return sizes[size];
};

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $isFullWidth: boolean;
  $isLoading: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-family: inherit;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all 0.2s ease;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  position: relative;
  overflow: hidden;

  ${({ $variant }) => getVariantStyles($variant)}
  ${({ $size }) => getSizeStyles($size)}

  ${({ $isFullWidth }) =>
    $isFullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      cursor: not-allowed;
      pointer-events: none;
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.interactive.primary};
    outline-offset: 2px;
  }
`;

const IconWrapper = styled.span<{ $position: "leading" | "trailing" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 1em;
    height: 1em;
  }
`;

const LoadingSpinner = styled.div`
  width: 1em;
  height: 1em;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  isFullWidth = false,
  precedingIcon,
  followingIcon,
  disabled,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $isFullWidth={isFullWidth}
      $isLoading={isLoading}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && precedingIcon && (
        <IconWrapper $position="leading">{precedingIcon}</IconWrapper>
      )}
      {children}
      {!isLoading && followingIcon && (
        <IconWrapper $position="trailing">{followingIcon}</IconWrapper>
      )}
    </StyledButton>
  );
};

export default Button;
