import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  background: ${(props) => props.theme.colors.bg.primary};
  color: ${(props) => props.theme.colors.text.primary};
  transition: all 0.3s ease;
`;

export const HeroSection = styled.section`
  padding: 8rem 2rem 4rem;
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
        ${(props) => props.theme.colors.interactive.primary}20 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 70% 80%,
        ${(props) => props.theme.colors.interactive.primary}15 0%,
        transparent 50%
      );
    pointer-events: none;
  }
`;

export const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

export const HeroTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.text.primary} 0%,
    ${(props) => props.theme.colors.interactive.primary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.1;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const WelcomeForm = styled.div`
  background: ${(props) => props.theme.colors.surface.primary};
  border: 1px solid ${(props) => props.theme.colors.surface.border};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  padding: 2rem;
  margin: 2rem auto;
  max-width: 400px;
  box-shadow: ${(props) => props.theme.shadows.xl};
  backdrop-filter: blur(10px);
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.surface.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: ${(props) => props.theme.colors.bg.primary};
  color: ${(props) => props.theme.colors.text.primary};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.interactive.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.interactive.primary}20;
  }
`;

export const CTAButton = styled.button`
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.interactive.primary} 0%,
    ${(props) => props.theme.colors.interactive.primaryHover} 100%
  );
  color: ${(props) => props.theme.colors.text.inverse};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
  box-shadow: ${(props) => props.theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.xl};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const DemoSection = styled.section`
  padding: 4rem 2rem;
  background: ${(props) => props.theme.colors.bg.secondary};
`;

export const FeatureSection = styled.section`
  padding: 4rem 2rem;
  background: ${(props) => props.theme.colors.bg.primary};
`;

export const SectionTitle = styled.h3`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const KanbanDemo = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
`;

export const KanbanColumn = styled.div`
  background: ${(props) => props.theme.colors.surface.primary};
  border: 1px solid ${(props) => props.theme.colors.surface.border};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  padding: 1.5rem;
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${(props) => props.theme.shadows.xl};
  }
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const StatusDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

export const TaskCard = styled.div`
  background: ${(props) => props.theme.colors.bg.primary};
  border: 1px solid ${(props) => props.theme.colors.surface.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 1rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: ${(props) => props.theme.shadows.md};
    background: ${(props) => props.theme.colors.surface.hover};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TaskTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const TaskMeta = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 4rem;
`;

export const FeatureCard = styled.div`
  background: ${(props) => props.theme.colors.surface.primary};
  border: 1px solid ${(props) => props.theme.colors.surface.border};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  padding: 2rem;
  text-align: center;
  box-shadow: ${(props) => props.theme.shadows.md};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${(props) => props.theme.shadows.xl};
  }
`;

export const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.interactive.primary} 0%,
    ${(props) => props.theme.colors.interactive.primaryHover} 100%
  );
  border-radius: ${(props) => props.theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: ${(props) => props.theme.colors.text.inverse};
`;

export const FeatureTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
`;

export const FeatureDescription = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.6;
`;
