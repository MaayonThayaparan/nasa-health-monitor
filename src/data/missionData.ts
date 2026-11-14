import { Activity, Radiation, ShieldAlert, Thermometer, Wind } from 'lucide-react';
import type { CrewMember, EnvironmentMetric, MissionAlert, TrendPoint } from '../types/mission';

export const crew: CrewMember[] = [
  {
    id: 'mira',
    initials: 'MN',
    name: 'Dr. Mira Nwosu',
    role: 'Commander · Medical lead',
    color: '#6ea8ff',
    location: 'Habitat A',
    status: 'stable',
    score: 92,
    hr: 68,
    bp: '118 / 76',
    sleep: '7.4h',
    mood: 4,
    dose: '0.21 mSv',
    checked: '18 min ago',
  },
  {
    id: 'leon',
    initials: 'LC',
    name: 'Leon Chen',
    role: 'Flight engineer',
    color: '#a980ff',
    location: 'Ops module',
    status: 'monitor',
    score: 74,
    hr: 82,
    bp: '124 / 81',
    sleep: '5.8h',
    mood: 3,
    dose: '0.38 mSv',
    checked: '12 min ago',
  },
  {
    id: 'sara',
    initials: 'SK',
    name: 'Sara Kim',
    role: 'Science officer',
    color: '#48d6b8',
    location: 'Habitat B',
    status: 'stable',
    score: 88,
    hr: 71,
    bp: '116 / 74',
    sleep: '7.0h',
    mood: 4,
    dose: '0.22 mSv',
    checked: '31 min ago',
  },
  {
    id: 'mateo',
    initials: 'MR',
    name: 'Mateo Ruiz',
    role: 'Systems specialist',
    color: '#ffac67',
    location: 'Shielded module',
    status: 'urgent',
    score: 58,
    hr: 94,
    bp: '132 / 86',
    sleep: '4.9h',
    mood: 2,
    dose: '0.86 mSv',
    checked: '5 min ago',
  },
];

export const environment = {
  normal: [
    { label: 'Cabin O₂', value: '21.0%', status: 'stable', icon: Wind },
    { label: 'Cabin CO₂', value: '2.7 mmHg', status: 'stable', icon: Activity },
    { label: 'Pressure', value: '101.2 kPa', status: 'stable', icon: ShieldAlert },
    { label: 'Temperature', value: '22.1°C', status: 'stable', icon: Thermometer },
    { label: 'Radiation', value: '0.18 mSv/h', status: 'stable', icon: Radiation },
  ] satisfies EnvironmentMetric[],
  solar: [
    { label: 'Cabin O₂', value: '21.0%', status: 'stable', icon: Wind },
    { label: 'Cabin CO₂', value: '2.7 mmHg', status: 'stable', icon: Activity },
    { label: 'Pressure', value: '101.2 kPa', status: 'stable', icon: ShieldAlert },
    { label: 'Temperature', value: '22.1°C', status: 'stable', icon: Thermometer },
    { label: 'Radiation', value: '0.86 mSv/h', status: 'urgent', icon: Radiation },
  ] satisfies EnvironmentMetric[],
};

export const trends = {
  normal: [
    { day: 'D-6', value: 67 },
    { day: 'D-5', value: 69 },
    { day: 'D-4', value: 70 },
    { day: 'D-3', value: 68 },
    { day: 'D-2', value: 71 },
    { day: 'Yesterday', value: 70 },
    { day: 'Today', value: 68 },
  ],
  solar: [
    { day: 'D-6', value: 67 },
    { day: 'D-5', value: 69 },
    { day: 'D-4', value: 72 },
    { day: 'D-3', value: 78 },
    { day: 'D-2', value: 83 },
    { day: 'Yesterday', value: 89 },
    { day: 'Today', value: 94 },
  ],
} satisfies Record<'normal' | 'solar', TrendPoint[]>;

export const alertsFor = (solar: boolean): MissionAlert[] =>
  solar
    ? [
        {
          level: 'urgent',
          title: 'Radiation exposure elevated',
          detail: 'Mateo Ruiz · cumulative dose trending upward',
          action: 'Open response plan',
        },
        {
          level: 'monitor',
          title: 'Recovery check-in overdue',
          detail: 'Leon Chen · sleep below baseline for 2 shifts',
          action: 'Start check-in',
        },
      ]
    : [
        {
          level: 'stable',
          title: 'All priority indicators nominal',
          detail: 'Next scheduled check-in: 13:00 UTC',
          action: 'View schedule',
        },
      ];
