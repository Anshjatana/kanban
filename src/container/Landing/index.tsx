import { CheckCircle, Users, BarChart3 } from "lucide-react";
import { Wrapper } from "./styles";
import Features from "./Features";
import Demo from "./Demo";
import Hero from "./Hero";
import { demoData } from "../../constants";
import Footer from "./Footer";
import Navbar from "../../components/Navbar";
import { useAppContext } from "../../context/AppContext";

const Landing = () => {
  const { user, setUser } = useAppContext();

  const handleGetStarted = () => {
    window.location.href = "/tasks";
  };

  // Handler to update user name
  const handleSetUserName = (name: string) => {
    setUser({ name: name });
  };

  const features = [
    {
      icon: <CheckCircle size={24} />,
      title: "Easy Task Management",
      description:
        "Create, organize, and track your tasks with intuitive drag-and-drop functionality.",
    },
    {
      icon: <Users size={24} />,
      title: "Team Collaboration",
      description:
        "Work together seamlessly with real-time updates and team member assignments.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Progress Tracking",
      description:
        "Monitor your productivity with detailed analytics and progress visualization.",
    },
  ];

  return (
    <Wrapper>
      <Navbar />
      <Hero
        handleGetStarted={handleGetStarted}
        userName={user?.name || ""}
        setUserName={handleSetUserName}
      />
      <Demo demoData={demoData} />
      <Features features={features} />
      <Footer />
    </Wrapper>
  );
};

export default Landing;
