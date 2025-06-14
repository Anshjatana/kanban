import {
  CTAButton,
  HeroContent,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  Input,
  InputGroup,
  Label,
  WelcomeForm,
} from "./styles";
import { ChevronRight } from "lucide-react";

interface HeroProps {
  userName: string;
  setUserName: (name: string) => void;
  handleGetStarted: () => void;
}

const Hero = ({ userName, setUserName, handleGetStarted }: HeroProps) => {
  return (
    <HeroSection>
      <HeroContent>
        <HeroTitle>
          Organize Your Work,
          <br />
          Amplify Your Productivity
        </HeroTitle>
        <HeroSubtitle>
          The most intuitive Kanban board to streamline your workflow,
          collaborate with your team, and get things done faster than ever.
        </HeroSubtitle>

        <WelcomeForm>
          <InputGroup>
            <Label htmlFor="name">What should we call you?</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputGroup>
          <CTAButton onClick={handleGetStarted}>
            Get Started
            <ChevronRight size={20} />
          </CTAButton>
        </WelcomeForm>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
