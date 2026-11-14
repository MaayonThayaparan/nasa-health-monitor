const regions = [
  ['Brain / eyes', 'brain', 100, 42],
  ['Heart / circulation', 'heart', 100, 103],
  ['Lungs / respiration', 'lungs', 100, 82],
  ['Bones / muscles', 'bones', 100, 148],
  ['Metabolism', 'metabolism', 100, 126],
  ['Whole body', 'whole', 100, 190],
] as const;
export type BodyRegion = (typeof regions)[number][1];
export function BodyMap({
  selected,
  onSelect,
}: {
  selected: BodyRegion;
  onSelect: (_region: BodyRegion) => void;
}) {
  return (
    <div className="body-map" aria-label="Interactive physical health body map">
      <svg viewBox="0 0 200 230" role="img" aria-label="Front-facing astronaut body diagram">
        <circle
          cx="100"
          cy="36"
          r="23"
          className={selected === 'brain' ? 'body-active' : 'body-shape'}
        />
        <path
          d="M74 63 Q100 52 126 63 L139 132 L121 151 L116 215 L103 215 L100 162 L97 215 L84 215 L79 151 L61 132 Z"
          className="body-shape"
        />
        <path d="M75 70 L48 126 M125 70 L152 126" className="body-shape limbs" />
        {regions.map(([label, id, x, y]) => (
          <g
            key={id}
            tabIndex={0}
            role="button"
            aria-label={label}
            onClick={() => onSelect(id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') onSelect(id);
            }}
          >
            <circle
              cx={x}
              cy={y}
              r="8"
              className={selected === id ? 'hotspot selected' : 'hotspot'}
            />
            <text x={x + 13} y={y + 4}>
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
