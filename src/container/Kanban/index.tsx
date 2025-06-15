import styled from "styled-components";
import Navbar from "../../components/Navbar";
import KanbanBoard from "./KanbanBoard";
import Footer from "../Landing/Footer";

const Wrapper = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.colors.bg.primary};
  color: ${(props) => props.theme.colors.text.primary};
  transition: all 0.3s ease;
padding-top: 8rem;
  text-align: center;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.bg.primary} 0%,
    ${(props) => props.theme.colors.bg.secondary} 100%
  );
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 30% 20%,
        ${(props) => props.theme.colors.interactive.primary}30 0%,
        transparent 50%
      ),
      radial-gradient(
        ${(props) => props.theme.colors.interactive.primary}15 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

const Kanban = () => {
  return (
    <Wrapper>
      <Navbar />
      <KanbanBoard />
      <Footer />
    </Wrapper>
  );
};

export default Kanban;
