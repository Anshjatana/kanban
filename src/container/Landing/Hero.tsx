import { ChevronRight } from "lucide-react";
import type { HeroProps } from "../../types";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {
  HeroContent,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  InputGroup,
  Label,
  WelcomeForm,
} from "./styles";

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
              isFullWidth
              id="name"
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputGroup>
          <Button size="sm" isFullWidth onClick={handleGetStarted}>
            Get Started
            <ChevronRight size={20} />
          </Button>
        </WelcomeForm>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
