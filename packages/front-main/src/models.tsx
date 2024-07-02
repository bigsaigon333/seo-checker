export const enum Level {
  Good = "Good",
  Neutral = "Neutral",
  NeedsImprovement = "Needs Improvement",
}

export type Result = {
  name: string;
  level: Level;
  description: string | null;
};
