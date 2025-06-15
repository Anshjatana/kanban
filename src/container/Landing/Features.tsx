import type { FeaturesProps } from "../../types";
import {
  FeatureCard,
  FeatureDescription,
  FeatureIcon,
  FeatureSection,
  FeaturesGrid,
  FeatureTitle,
  SectionTitle,
} from "./styles";

const Features = ({ features }: FeaturesProps) => {
  return (
    <FeatureSection>
      <SectionTitle>Why to use?</SectionTitle>
      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeatureSection>
  );
};

export default Features;
