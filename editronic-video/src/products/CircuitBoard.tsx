import React, { useMemo } from "react";
import { random } from "remotion";
import { useUid } from "../components/common";

type Trace = { d: string; end: [number, number]; w: number };

const buildTraces = (seed: string, count: number, size: number): Trace[] => {
  const traces: Trace[] = [];
  const g = 24;
  for (let i = 0; i < count; i++) {
    const r = (k: string) => random(`${seed}-${i}-${k}`);
    let x = Math.round((r("x") * size) / g) * g;
    let y = Math.round((r("y") * size) / g) * g;
    const pts: [number, number][] = [[x, y]];
    const segs = 2 + Math.floor(r("n") * 3);
    let horizontal = r("h") > 0.5;
    for (let s = 0; s < segs; s++) {
      const len = (2 + Math.floor(r(`l${s}`) * 9)) * g;
      const dir = r(`d${s}`) > 0.5 ? 1 : -1;
      if (s % 2 === 1) {
        // tramo a 45°
        const dir2 = r(`e${s}`) > 0.5 ? 1 : -1;
        x += (len / 2) * dir;
        y += (len / 2) * dir2;
      } else if (horizontal) {
        x += len * dir;
      } else {
        y += len * dir;
      }
      horizontal = !horizontal;
      x = Math.max(30, Math.min(size - 30, x));
      y = Math.max(30, Math.min(size - 30, y));
      pts.push([x, y]);
    }
    traces.push({
      d: pts.map((p, k) => `${k ? "L" : "M"}${p[0]} ${p[1]}`).join(" "),
      end: pts[pts.length - 1],
      w: r("w") > 0.75 ? 7 : r("w") > 0.35 ? 4 : 2.5,
    });
  }
  return traces;
};

/** Placa electrónica hiperdetallada (vista superior). viewBox 1200x1200 */
export const CircuitBoard: React.FC<{
  width: number;
  frame: number;
  signal?: number; // 0..1 intensidad de los pulsos de señal
  seed?: string;
}> = ({ width, frame, signal = 1, seed = "pcb" }) => {
  const id = useUid("pcb");
  const traces = useMemo(() => buildTraces(seed, 120, 1200), [seed]);
  const S = 1200;

  const smd = useMemo(
    () =>
      new Array(140).fill(0).map((_, i) => ({
        x: random(`${seed}sx${i}`) * (S - 80) + 40,
        y: random(`${seed}sy${i}`) * (S - 80) + 40,
        r: random(`${seed}sr${i}`) > 0.5 ? 0 : 90,
        kind: random(`${seed}sk${i}`),
      })),
    [seed],
  );

  const qfp = (x: number, y: number, s: number, key: string) => {
    const pins = 14;
    const step = (s - 24) / pins;
    return (
      <g key={key}>
        {new Array(pins).fill(0).map((_, i) => (
          <g key={i}>
            <rect x={x + 12 + i * step + step * 0.2} y={y - 14} width={step * 0.55} height={16} fill={`url(#${id}pin)`} />
            <rect x={x + 12 + i * step + step * 0.2} y={y + s - 2} width={step * 0.55} height={16} fill={`url(#${id}pin)`} />
            <rect x={x - 14} y={y + 12 + i * step + step * 0.2} width={16} height={step * 0.55} fill={`url(#${id}pin)`} />
            <rect x={x + s - 2} y={y + 12 + i * step + step * 0.2} width={16} height={step * 0.55} fill={`url(#${id}pin)`} />
          </g>
        ))}
        <rect x={x} y={y} width={s} height={s} rx={6} fill={`url(#${id}chip)`} />
        <rect x={x + 3} y={y + 3} width={s - 6} height={s - 6} rx={4} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
        <circle cx={x + 18} cy={y + 18} r={6} fill="rgba(255,255,255,0.12)" />
      </g>
    );
  };

  const cap = (x: number, y: number, r: number, key: string) => (
    <g key={key}>
      <circle cx={x + 6} cy={y + 8} r={r + 4} fill="rgba(0,0,0,0.55)" />
      <circle cx={x} cy={y} r={r} fill={`url(#${id}alu)`} stroke="#2b2f38" strokeWidth={3} />
      <circle cx={x} cy={y} r={r * 0.78} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth={2} />
      <path d={`M${x - r * 0.55} ${y} L${x + r * 0.55} ${y} M${x} ${y - r * 0.55} L${x} ${y + r * 0.55}`} stroke="rgba(40,44,52,0.6)" strokeWidth={3} />
      <path d={`M${x - r} ${y} A${r} ${r} 0 0 1 ${x - r * 0.3} ${y - r * 0.95}`} stroke="#1a3f8a" strokeWidth={6} fill="none" opacity={0.9} />
    </g>
  );

  const pulseOffset = (i: number) => -((frame * (6 + (i % 5) * 2) + i * 137) % 1000);

  return (
    <svg width={width} height={width} viewBox={`0 0 ${S} ${S}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}board`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d2240" />
          <stop offset="0.55" stopColor="#081629" />
          <stop offset="1" stopColor="#050c18" />
        </linearGradient>
        <linearGradient id={`${id}chip`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2d34" />
          <stop offset="0.5" stopColor="#14161b" />
          <stop offset="1" stopColor="#0b0c0f" />
        </linearGradient>
        <linearGradient id={`${id}ihs`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2f4f8" />
          <stop offset="0.35" stopColor="#a9b0bc" />
          <stop offset="0.6" stopColor="#dfe3ea" />
          <stop offset="1" stopColor="#7d8492" />
        </linearGradient>
        <linearGradient id={`${id}pin`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e7b0" />
          <stop offset="1" stopColor="#b78a2c" />
        </linearGradient>
        <radialGradient id={`${id}alu`} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#c3c9d3" />
          <stop offset="1" stopColor="#6c7380" />
        </radialGradient>
        <pattern id={`${id}dots`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1.3" fill="rgba(120,170,255,0.10)" />
        </pattern>
        <filter id={`${id}glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width={S} height={S} rx="26" fill={`url(#${id}board)`} />
      <rect x="0" y="0" width={S} height={S} rx="26" fill={`url(#${id}dots)`} />

      {/* pistas de cobre bajo la máscara */}
      {traces.map((t, i) => (
        <path key={i} d={t.d} stroke="#c49a46" strokeOpacity={0.42} strokeWidth={t.w} fill="none" strokeLinejoin="round" strokeLinecap="round" />
      ))}
      {traces.map((t, i) => (
        <g key={`v${i}`}>
          <circle cx={t.end[0]} cy={t.end[1]} r={7} fill="#0a1424" stroke="#d8b25e" strokeWidth={3} />
        </g>
      ))}

      {/* pulsos de señal (azul / morado) */}
      <g filter={`url(#${id}glow)`} opacity={signal}>
        {traces.map((t, i) =>
          i % 3 === 0 ? (
            <path
              key={`s${i}`}
              d={t.d}
              pathLength={1000}
              stroke={i % 2 ? "#3ec6ff" : "#a66bff"}
              strokeWidth={t.w + 1.5}
              strokeDasharray="70 930"
              strokeDashoffset={pulseOffset(i)}
              strokeLinecap="round"
              fill="none"
            />
          ) : null,
        )}
      </g>

      {/* componentes SMD */}
      {smd.map((c, i) =>
        c.kind > 0.35 ? (
          <g key={`c${i}`} transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}>
            <rect x={-13} y={-6} width={26} height={12} rx={2} fill={c.kind > 0.7 ? "#1b1c20" : "#b88b4a"} />
            <rect x={-13} y={-6} width={6} height={12} fill="#dfe3ea" />
            <rect x={7} y={-6} width={6} height={12} fill="#dfe3ea" />
          </g>
        ) : null,
      )}

      {/* CPU / SoC central */}
      <g>
        <rect x={420} y={420} width={360} height={360} rx={16} fill="#0f3a2a" />
        <rect x={420} y={420} width={360} height={360} rx={16} fill="none" stroke="#c49a46" strokeOpacity={0.5} strokeWidth={3} />
        {new Array(10).fill(0).map((_, i) => (
          <g key={i}>
            <rect x={436 + i * 34} y={432} width={18} height={10} rx={2} fill="#c9a24c" />
            <rect x={436 + i * 34} y={758} width={18} height={10} rx={2} fill="#c9a24c" />
          </g>
        ))}
        <rect x={470} y={470} width={260} height={260} rx={12} fill={`url(#${id}ihs)`} />
        <rect x={470} y={470} width={260} height={130} rx={12} fill="rgba(255,255,255,0.12)" />
        <rect x={486} y={486} width={228} height={228} rx={8} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth={2} />
      </g>

      {qfp(130, 140, 150, "q1")}
      {qfp(900, 180, 130, "q2")}
      {qfp(170, 880, 140, "q3")}
      {/* módulo de memoria */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`m${i}`} x={860 + (i % 2) * 120} y={840 + Math.floor(i / 2) * 150} width={100} height={130} rx={6} fill={`url(#${id}chip)`} />
      ))}
      {/* condensadores electrolíticos */}
      {cap(360, 300, 38, "e1")}
      {cap(460, 300, 38, "e2")}
      {cap(840, 420, 34, "e3")}
      {cap(840, 520, 34, "e4")}
      {cap(330, 640, 34, "e5")}
      {cap(1060, 640, 44, "e6")}
      {/* inductores */}
      {[0, 1, 2, 3].map((i) => (
        <g key={`l${i}`}>
          <rect x={560 + i * 80} y={250} width={64} height={64} rx={10} fill="#3a3f49" />
          <rect x={574 + i * 80} y={264} width={36} height={36} rx={6} fill="#1d2027" />
        </g>
      ))}
      {/* orificios de montaje */}
      {[
        [50, 50],
        [S - 50, 50],
        [50, S - 50],
        [S - 50, S - 50],
      ].map(([x, y], i) => (
        <g key={`h${i}`}>
          <circle cx={x} cy={y} r={26} fill="#d4ad5a" />
          <circle cx={x} cy={y} r={14} fill="#03060c" />
        </g>
      ))}
    </svg>
  );
};
