import React, { forwardRef } from "react";
import styled, { css } from "styled-components";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "filled" | "minimal";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  inputSize?: InputSize;
  variant?: InputVariant;
  isFullWidth?: boolean;
}

// Size styles
const sizeStyles = {
  sm: css`
    padding: 8px 12px;
    font-size: 0.875rem;
    min-height: 32px;
  `,
  md: css`
    padding: 12px 12px;
    font-size: 0.9375rem;
    min-height: 40px;
  `,
  lg: css`
    padding: 16px 16px;
    font-size: 1rem;
    min-height: 48px;
  `,
};

// Base input styles
const baseInputStyles = css`
  font-family: inherit;
  background-color: ${({ theme }) => theme.colors.surface.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.interactive.primary}40;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.surface.secondary};
  }
`;

// Variant styles - using functions to properly access props
const getVariantStyles = (variant: InputVariant, hasError: boolean) => {
  const variants = {
    default: css`
      ${baseInputStyles}
      border: 1px solid ${({ theme }) =>
        hasError
          ? theme.colors.interactive.danger
          : theme.colors.surface.border};
      border-radius: ${({ theme }) => theme.borderRadius.md};

      &:hover:not(:disabled) {
        border-color: ${({ theme }) =>
          hasError
            ? theme.colors.interactive.danger
            : theme.colors.interactive.primary};
      }

      &:focus {
        border-color: ${({ theme }) =>
          hasError
            ? theme.colors.interactive.danger
            : theme.colors.interactive.primary};
      }
    `,
    filled: css`
      ${baseInputStyles}
      background-color: ${({ theme }) => theme.colors.surface.secondary};
      border: 1px solid
        ${({ theme }) =>
          hasError ? theme.colors.interactive.danger : "transparent"};
      border-radius: ${({ theme }) => theme.borderRadius.md};

      &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.colors.surface.hover};
      }

      &:focus {
        background-color: ${({ theme }) => theme.colors.surface.primary};
        border-color: ${({ theme }) =>
          hasError
            ? theme.colors.interactive.danger
            : theme.colors.interactive.primary};
      }

      ${hasError &&
      css`
        background-color: ${({ theme }) => theme.colors.interactive.danger}10;
      `}
    `,
    minimal: css`
      ${baseInputStyles}
      background-color: transparent;
      border: none;
      border-bottom: 2px solid
        ${({ theme }) =>
          hasError
            ? theme.colors.interactive.danger
            : theme.colors.surface.border};
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;

      &:hover:not(:disabled) {
        border-bottom-color: ${({ theme }) =>
          hasError
            ? theme.colors.interactive.danger
            : theme.colors.text.tertiary};
      }

      &:focus {
        border-bottom-color: ${({ theme }) =>
          hasError
            ? theme.colors.interactive.danger
            : theme.colors.interactive.primary};
        box-shadow: none;
      }
    `,
  };

  return variants[variant];
};

const Container = styled.div<{ $isFullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: ${({ $isFullWidth }) => ($isFullWidth ? "100%" : "auto")};
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StyledInput = styled.input<{
  $variant: InputVariant;
  $size: InputSize;
  $hasError: boolean;
  $isFullWidth: boolean;
}>`
  ${({ $variant, $hasError }) => getVariantStyles($variant, $hasError)}
  ${({ $size }) => sizeStyles[$size]}
  width: ${({ $isFullWidth }) => ($isFullWidth ? "100%" : "auto")};
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.interactive.danger};
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      inputSize = "md",
      variant = "default",
      isFullWidth = false,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36)}`;
    const hasError = !!error;

    return (
      <Container $isFullWidth={isFullWidth}>
        {label && <Label htmlFor={inputId}>{label}</Label>}

        <StyledInput
          ref={ref}
          id={inputId}
          $variant={variant}
          $size={inputSize}
          $hasError={hasError}
          $isFullWidth={isFullWidth}
          {...props}
        />

        {error && <ErrorText>{error}</ErrorText>}
      </Container>
    );
  }
);

Input.displayName = "Input";

export default Input;
