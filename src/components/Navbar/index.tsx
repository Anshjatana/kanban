import { Moon, Sun } from "lucide-react";
import styled from "styled-components";
import { useAppContext } from "../../context/AppContext";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  background: ${(props) => props.theme.colors.bg.primary}90;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid ${(props) => props.theme.colors.surface.border};
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.interactive.primary};
`;

const ThemeToggle = styled.button`
  background: ${(props) => props.theme.colors.surface.primary};
  border: 1px solid ${(props) => props.theme.colors.surface.border};
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${(props) => props.theme.shadows.md};
  color: ${(props) => props.theme.colors.text.primary};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${(props) => props.theme.shadows.lg};
    background: ${(props) => props.theme.colors.surface.hover};
  }
`;

const Navbar = () => {
  const { toggleTheme, theme } = useAppContext();

  return (
    <Header>
      <Logo>Kanban Space</Logo>
      <ThemeToggle onClick={toggleTheme}>
        {theme == "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </ThemeToggle>
    </Header>
  );
};

export default Navbar;
