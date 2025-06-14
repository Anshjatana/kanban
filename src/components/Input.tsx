// src/components/Input/Input.tsx
import React, { forwardRef } from "react";
import styled, { css } from "styled-components";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "default" | "filled" | "minimal";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  hint?: string;
  inputSize?: InputSize;
  variant?: InputVariant;
  isFullWidth?: boolean;
  precedingIcon?: React.ReactNode;
  followingIcon?: React.ReactNode;
  isLoading?: boolean;
}

// Size styles
const getSizeStyles = (size: InputSize) => {
  const sizes = {
    sm: css`
      padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
      font-size: 0.875rem;
      min-height: 32px;
    `,
    md: css`
      padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
      font-size: 0.9375rem;
      min-height: 40px;
    `,
    lg: css`
      padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg}`};
      font-size: 1rem;
      min-height: 48px;
    `,
  };

  return sizes[size];
};

// Variant styles
const getVariantStyles = (variant: InputVariant, hasError: boolean) => {
  const baseStyles = css`
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

  const variants = {
    default: css`
      ${baseStyles}
      border: 1px solid ${({ theme }) =>
        hasError
          ? theme.colors.interactive.danger
          : theme.colors.surface.border};
      border-radius: ${({ theme }) => theme.borderRadius.md};

      &:hover:not(:disabled) {
        border-color: ${({ theme }) =>
          hasError
            ? theme.colors.interactive.danger
            : theme.colors.text.tertiary};
      }

      &:focus {
        border-color: ${({ theme }) =>
          hasError
            ? theme.colors.interactive.danger
            : theme.colors.interactive.primary};
      }
    `,
    filled: css`
      ${baseStyles}
      background-color: ${({ theme }) => theme.colors.surface.secondary};
      border: 1px solid transparent;
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
        border-color: ${({ theme }) => theme.colors.interactive.danger};
        background-color: ${({ theme }) => theme.colors.interactive.danger}10;
      `}
    `,
    minimal: css`
      ${baseStyles}
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

const InputContainer = styled.div<{ $isFullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  ${({ $isFullWidth }) =>
    $isFullWidth &&
    css`
      width: 100%;
    `}
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const InputWrapper = styled.div<{
  $hasIcon: boolean;
  $iconPosition: "leading" | "trailing" | "both";
  $size: InputSize;
}>`
  position: relative;
  display: flex;
  align-items: center;

  ${({ $hasIcon, $iconPosition, $size }) => {
    if (!$hasIcon) return "";

    const iconPadding = {
      sm: "32px",
      md: "36px",
      lg: "44px",
    };

    return css`
      input {
        ${($iconPosition === "leading" || $iconPosition === "both") &&
        css`
          padding-left: ${iconPadding[$size]};
        `}

        ${($iconPosition === "trailing" || $iconPosition === "both") &&
        css`
          padding-right: ${iconPadding[$size]};
        `}
      }
    `;
  }}
`;

const StyledInput = styled.input<{
  $variant: InputVariant;
  $size: InputSize;
  $hasError: boolean;
  $isFullWidth: boolean;
}>`
  font-family: inherit;

  ${({ $variant, $hasError }) => getVariantStyles($variant, $hasError)}
  ${({ $size }) => getSizeStyles($size)}

  ${({ $isFullWidth }) =>
    $isFullWidth &&
    css`
      width: 100%;
    `}
`;

const IconWrapper = styled.div<{
  $position: "leading" | "trailing";
  $size: InputSize;
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.tertiary};
  pointer-events: none;
  z-index: 1;

  ${({ $position, $size }) => {
    const offset = {
      sm: "8px",
      md: "12px",
      lg: "16px",
    };

    return css`
      ${$position}: ${offset[$size]};
    `;
  }}

  svg {
    width: 1em;
    height: 1em;
  }
`;

const LoadingSpinner = styled.div`
  width: 1em;
  height: 1em;
  border: 2px solid ${({ theme }) => theme.colors.surface.border};
  border-top: 2px solid ${({ theme }) => theme.colors.interactive.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const HelperText = styled.span<{ $isError: boolean }>`
  font-size: 0.75rem;
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors.interactive.danger : theme.colors.text.secondary};
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      inputSize = "md",
      variant = "default",
      isFullWidth = false,
      precedingIcon,
      followingIcon,
      isLoading = false,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasIcon = !!(precedingIcon || followingIcon || isLoading);

    let iconPosition: "leading" | "trailing" | "both" = "leading";
    if (precedingIcon && (followingIcon || isLoading)) {
      iconPosition = "both";
    } else if (followingIcon || isLoading) {
      iconPosition = "trailing";
    }

    const helperText = error || hint;

    return (
      <InputContainer $isFullWidth={isFullWidth}>
        {label && <Label htmlFor={inputId}>{label}</Label>}

        <InputWrapper
          $hasIcon={hasIcon}
          $iconPosition={iconPosition}
          $size={inputSize}
        >
          {precedingIcon && (
            <IconWrapper $position="leading" $size={inputSize}>
              {precedingIcon}
            </IconWrapper>
          )}

          <StyledInput
            ref={ref}
            id={inputId}
            $variant={variant}
            $size={inputSize}
            $hasError={hasError}
            $isFullWidth={isFullWidth}
            disabled={disabled || isLoading}
            {...props}
          />

          {(followingIcon || isLoading) && (
            <IconWrapper $position="trailing" $size={inputSize}>
              {isLoading ? <LoadingSpinner /> : followingIcon}
            </IconWrapper>
          )}
        </InputWrapper>

        {helperText && (
          <HelperText $isError={hasError}>{helperText}</HelperText>
        )}
      </InputContainer>
    );
  }
);

Input.displayName = "Input";

export default Input;
