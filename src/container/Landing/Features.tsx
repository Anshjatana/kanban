import {
  FeatureCard,
  FeatureDescription,
  FeatureIcon,
  FeatureSection,
  FeaturesGrid,
  FeatureTitle,
  SectionTitle,
} from "./styles";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  features: Feature[];
}

const Features = ({ features }: FeaturesProps) => {
  return (
    <FeatureSection>
      <SectionTitle>Features</SectionTitle>
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
