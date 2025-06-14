import { createGlobalStyle } from "styled-components";
import type { Theme } from "./theme";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.colors.bg.primary};
    color: ${({ theme }: { theme: Theme }) => theme.colors.text.primary};
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  #root {
    height: 100%;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    
    &:focus-visible {
      outline: 2px solid ${({ theme }: { theme: Theme }) =>
        theme.colors.interactive.primary};
      outline-offset: 2px;
    }
  }

  input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
    
    &:focus {
      outline: 2px solid ${({ theme }: { theme: Theme }) =>
        theme.colors.interactive.primary};
      outline-offset: 2px;
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }: { theme: Theme }) => theme.colors.bg.secondary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: Theme }) => theme.colors.surface.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }: { theme: Theme }) => theme.colors.text.tertiary};
  }

  /* Custom selection colors */
  ::selection {
    background-color: ${({ theme }: { theme: Theme }) =>
      theme.colors.interactive.primary};
    color: ${({ theme }: { theme: Theme }) => theme.colors.text.inverse};
  }
`;
