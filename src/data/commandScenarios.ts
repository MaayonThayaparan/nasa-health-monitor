export type MissionMode = 'nominal' | 'mixed' | 'eva' | 'planet';
export type CrewLocation = 'cabin' | 'eva' | 'planet';
export type ScenarioCrew = {
  location: CrewLocation;
  workout: boolean;
  cardio: boolean;
  resilience: boolean;
  protocol: 'none' | 'active' | 'complete';
};

export const scenarioLabels: Record<MissionMode, string> = {
  nominal: 'All crew healthy in cabin',
  mixed: 'Cabin readiness mixed',
  eva: '3 in cabin · 1 EVA',
  planet: '2 in cabin · 1 EVA · 1 on planet',
};

export const scenarioCrew: Record<MissionMode, Record<string, ScenarioCrew>> = {
  nominal: {
    mira: { location: 'cabin', workout: true, cardio: true, resilience: true, protocol: 'none' },
    leon: { location: 'cabin', workout: true, cardio: true, resilience: true, protocol: 'none' },
    sara: { location: 'cabin', workout: true, cardio: true, resilience: true, protocol: 'none' },
    mateo: { location: 'cabin', workout: true, cardio: true, resilience: true, protocol: 'none' },
  },
  mixed: {
    mira: { location: 'cabin', workout: true, cardio: true, resilience: true, protocol: 'none' },
    leon: { location: 'cabin', workout: false, cardio: true, resilience: false, protocol: 'none' },
    sara: { location: 'cabin', workout: true, cardio: false, resilience: true, protocol: 'none' },
    mateo: {
      location: 'cabin',
      workout: false,
      cardio: false,
      resilience: false,
      protocol: 'active',
    },
  },
  eva: {
    mira: { location: 'cabin', workout: true, cardio: true, resilience: true, protocol: 'none' },
    leon: { location: 'cabin', workout: true, cardio: true, resilience: true, protocol: 'none' },
    sara: { location: 'cabin', workout: true, cardio: true, resilience: true, protocol: 'none' },
    mateo: {
      location: 'eva',
      workout: false,
      cardio: false,
      resilience: false,
      protocol: 'active',
    },
  },
  planet: {
    mira: { location: 'cabin', workout: true, cardio: true, resilience: true, protocol: 'none' },
    leon: { location: 'cabin', workout: false, cardio: true, resilience: true, protocol: 'none' },
    sara: {
      location: 'eva',
      workout: false,
      cardio: false,
      resilience: false,
      protocol: 'complete',
    },
    mateo: {
      location: 'planet',
      workout: false,
      cardio: false,
      resilience: false,
      protocol: 'active',
    },
  },
};
