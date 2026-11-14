import type { LucideIcon } from 'lucide-react';

export type HealthStatus = 'stable' | 'monitor' | 'urgent';

export interface CrewMember {
  id: string;
  initials: string;
  name: string;
  role: string;
  color: string;
  location: string;
  status: HealthStatus;
  score: number;
  hr: number;
  bp: string;
  sleep: string;
  mood: number;
  dose: string;
  checked: string;
}

export interface EnvironmentMetric {
  label: string;
  value: string;
  status: HealthStatus;
  icon: LucideIcon;
}

export interface MissionAlert {
  level: HealthStatus;
  title: string;
  detail: string;
  action: string;
}

export interface TrendPoint {
  day: string;
  value: number;
}
