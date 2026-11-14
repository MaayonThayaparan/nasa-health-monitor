export function crewOffset(astronautId: string) {
  return (
    ([...astronautId].reduce((total, character) => total + character.charCodeAt(0), 0) % 7) - 3
  );
}

export function personalizedSeries(values: number[], astronautId: string, variation: number) {
  const offset = crewOffset(astronautId) * variation;
  return values.map((value, index) =>
    Number(Math.max(0, value + offset + ((index % 3) - 1) * variation * 0.25).toFixed(1)),
  );
}
