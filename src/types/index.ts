export interface Task {
  title: string;
  meta: string;
}

export interface Column {
  color: string;
  title: string;
  tasks: Task[];
}

export interface DemoProps {
  demoData: Column[];
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FeaturesProps {
  features: Feature[];
}

export interface HeroProps {
  userName: string;
  setUserName: (name: string) => void;
  handleGetStarted: () => void;
}

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscapeKey?: boolean;
  preventScroll?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}