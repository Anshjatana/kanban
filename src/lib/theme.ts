export const lightTheme = {
  colors: {
    bg: {
      primary: "#ffffff",
      secondary: "rgb(234 234 234)",
      tertiary: "#f5f5f5",
      elevated: "#ffffff",
    },
    surface: {
      primary: "#ffffff",
      secondary: "#f8f9fa",
      hover: "#f1f3f4",
      border: "#e1e4e8",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#6b7280",
      tertiary: "#9ca3af",
      inverse: "#ffffff",
    },
    status: {
      todo: "#6366f1",
      inProgress: "#f59e0b",
      done: "#10b981",
    },
    interactive: {
      primary: "#5b21b6",
      primaryHover: "#4c1d95",
      danger: "#ef4444",
      dangerHover: "#dc2626",
    },
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },
};

export const darkTheme = {
  colors: {
    bg: {
      primary: "#0d0e10",
      secondary: "#16181c",
      tertiary: "#1c1f24",
      elevated: "#23262b",
    },
    surface: {
      primary: "#16181c",
      secondary: "#1c1f24",
      hover: "#23262b",
      border: "#2d3139",
    },
    text: {
      primary: "#f6f8fa",
      secondary: "#b3b7bf",
      tertiary: "#8b949e",
      inverse: "#1a1a1a",
    },
    status: {
      todo: "#7c3aed",
      inProgress: "#f59e0b",
      done: "#10b981",
    },
    interactive: {
      primary: "#8b5cf6",
      primaryHover: "#7c3aed",
      danger: "#f87171",
      dangerHover: "#ef4444",
    },
  },
  spacing: lightTheme.spacing,
  borderRadius: lightTheme.borderRadius,
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.4)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.6)",
  },
};

export type Theme = typeof lightTheme;
