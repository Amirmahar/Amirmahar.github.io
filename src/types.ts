export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  tags: string[];
  icon: string;
  metric?: string;
  flowSteps: {
    name: string;
    type: string;
    status: 'idle' | 'active' | 'success';
    action: string;
  }[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'TRIGGER' | 'PARSER' | 'AGENT' | 'SYSTEM' | 'SUCCESS' | 'ERROR';
  message: string;
}

export interface FeatureNode {
  id: string;
  label: string;
  status: 'idle' | 'processing' | 'success';
  description: string;
  icon: string;
}
