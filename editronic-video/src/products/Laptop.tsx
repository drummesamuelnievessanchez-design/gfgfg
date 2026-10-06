import React from "react";
import { useUid } from "../components/common";

const W = 960;
const D = 620; // profundidad de la base
const H = 600; // alto de la pantalla

/* ---------------------------------------------------------------- ventilador */
export const Fan: React.FC<{ size: number; angle: number }> = ({ size, angle }) => {
  const id = useUid("fan");
  const blades = 11;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: "block" }}>
      <defs>
        <radialGradient id={`${id}hub`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#4a4f5a" />
          <stop offset="1" stopColor="#121419" />
        </radialGradient>
        <linearGradient id={`${id}blade`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c3038" />
          <stop offset="1" stopColor="#0d0f13" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="97" fill="#0a0b0e" stroke="#3a3e47" strokeWidth="3" />
      <g transform={`rotate(${angle} 100 100)`}>
        {new Array(blades).fill(0).map((_, i) => (
          <path
            key={i}
            transform={`rotate(${(360 / blades) * i} 100 100)`}
            d="M100 100 C 118 78, 150 62, 176 70 C 160 84, 136 98, 104 108 Z"
            fill={`url(#${id}blade)`}
            stroke="rgba(120,150,200,0.25)"
            strokeWidth="1"
          />
        ))}
      </g>
      <circle cx="100" cy="100" r="30" fill={`url(#${id}hub)`} />
      <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
    </svg>
  );
};

/* ------------------------------------------------------------- módulo RAM SO-DIMM */
export const SoDimm: React.FC<{ width: number }> = ({ width }) => {
  const id = useUid("so");
  return (
    <svg width={width} height={width * 0.45} viewBox="0 0 300 135" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e2a0" />
          <stop offset="1" stopColor="#b8892c" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="300" height="118" rx="5" fill="#0f5132" />
      <rect x="0" y="0" width="300" height="118" rx="5" fill="none" stroke="#1b7a4c" strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={18 + i * 70} y={20} width={52} height={66} rx={3} fill="#121418" />
      ))}
      {new Array(36).fill(0).map((_, i) => (
        <rect key={i} x={10 + i * 7.9 + (i > 20 ? 6 : 0)} y={106} width={5} height={24} rx={1} fill={`url(#${id}g)`} />
      ))}
    </svg>
  );
};

/* ------------------------------------------------------------- cubierta superior */
const KeyboardDeck: React.FC = () => {
  const id = useUid("kb");
  const cols = 14;
  const rows = 6;
  const kw = 52;
  const gap = 8;
  const startX = (W - (cols * kw + (cols - 1) * gap)) / 2;
  return (
    <svg width={W} height={D} viewBox={`0 0 ${W} ${D}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}alu`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b3f48" />
          <stop offset="0.5" stopColor="#2a2d34" />
          <stop offset="1" stopColor="#1c1e24" />
        </linearGradient>
        <linearGradient id={`${id}key`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d1f25" />
          <stop offset="1" stopColor="#0b0c0f" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={D} rx="26" fill={`url(#${id}alu)`} />
      <rect x={startX - 14} y={34} width={cols * kw + (cols - 1) * gap + 28} height={rows * 46 + 26} rx={14} fill="#0e0f13" />
      {new Array(rows).fill(0).map((_, r) =>
        new Array(cols).fill(0).map((__, c) => {
          const h = r === 0 ? 24 : 38;
          const y = 46 + (r === 0 ? 0 : 34 + (r - 1) * 46);
          if (r === rows - 1 && c > 4 && c < 10) {
            if (c !== 5) return null;
            return <rect key={`${r}-${c}`} x={startX + c * (kw + gap)} y={y} width={kw * 5 + gap * 4} height={h} rx={6} fill={`url(#${id}key)`} />;
          }
          return (
            <g key={`${r}-${c}`}>
              <rect x={startX + c * (kw + gap)} y={y} width={kw} height={h} rx={6} fill={`url(#${id}key)`} />
              <rect x={startX + c * (kw + gap) + 2} y={y + 2} width={kw - 4} height={3} rx={2} fill="rgba(255,255,255,0.07)" />
            </g>
          );
        }),
      )}
      {/* retroiluminación sutil */}
      <rect x={startX - 14} y={34} width={cols * kw + (cols - 1) * gap + 28} height={rows * 46 + 26} rx={14} fill="none" stroke="rgba(62,198,255,0.25)" strokeWidth={2} />
      <rect x={W / 2 - 170} y={380} width={340} height={200} rx={18} fill="#24272e" stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
      <rect x="0" y="0" width={W} height={D} rx="26" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={3} />
    </svg>
  );
};

/* -------------------------------------------------------- interior (rayos X) */
const Internals: React.FC<{ fanAngle: number }> = ({ fanAngle }) => {
  const id = useUid("in");
  return (
    <div style={{ position: "relative", width: W, height: D }}>
      <svg width={W} height={D} viewBox={`0 0 ${W} ${D}`} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id={`${id}pcb`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#123058" />
            <stop offset="1" stopColor="#081a33" />
          </linearGradient>
          <linearGradient id={`${id}cu`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f7b98a" />
            <stop offset="0.5" stopColor="#c46a32" />
            <stop offset="1" stopColor="#8a4520" />
          </linearGradient>
          <linearGradient id={`${id}bat`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#24262c" />
            <stop offset="1" stopColor="#15161a" />
          </linearGradient>
          <linearGradient id={`${id}die`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c8ced8" />
            <stop offset="1" stopColor="#6d7480" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width={W} height={D} rx="26" fill="#0b0c10" />
        {/* placa base */}
        <path d={`M30 30 H${W - 30} V330 H640 V360 H320 V330 H30 Z`} fill={`url(#${id}pcb)`} stroke="rgba(120,170,255,0.3)" strokeWidth={2} />
        {new Array(26).fill(0).map((_, i) => (
          <path
            key={i}
            d={`M${60 + i * 33} ${40 + (i % 4) * 8} v${70 + (i % 5) * 30} l18 18 h${(i % 3) * 22}`}
            stroke="#c49a46"
            strokeOpacity={0.35}
            strokeWidth={3}
            fill="none"
          />
        ))}
        {/* heatpipes de cobre */}
        <path d="M400 190 C 470 190, 520 140, 600 140 L 760 140" stroke={`url(#${id}cu)`} strokeWidth={26} fill="none" strokeLinecap="round" />
        <path d="M400 230 C 300 230, 260 160, 200 150" stroke={`url(#${id}cu)`} strokeWidth={22} fill="none" strokeLinecap="round" />
        {/* CPU / GPU */}
        <rect x={350} y={160} width={110} height={110} rx={8} fill="#1a3d2c" />
        <rect x={370} y={180} width={70} height={70} rx={4} fill={`url(#${id}die)`} />
        <rect x={500} y={200} width={90} height={90} rx={8} fill="#1a3d2c" />
        <rect x={515} y={215} width={60} height={60} rx={4} fill={`url(#${id}die)`} />
        {/* ranuras de memoria */}
        <rect x={640} y={210} width={240} height={34} rx={4} fill="#121418" />
        <rect x={640} y={258} width={240} height={34} rx={4} fill="#121418" />
        {/* SSD M.2 */}
        <rect x={60} y={250} width={240} height={52} rx={4} fill="#0c0d10" stroke="rgba(255,255,255,0.15)" />
        <rect x={150} y={260} width={50} height={32} rx={3} fill="#2a2d34" />
        {/* batería */}
        <rect x={60} y={380} width={W - 120} height={210} rx={14} fill={`url(#${id}bat)`} stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
        {[1, 2, 3].map((i) => (
          <line key={i} x1={60 + ((W - 120) / 4) * i} y1={392} x2={60 + ((W - 120) / 4) * i} y2={578} stroke="rgba(255,255,255,0.06)" strokeWidth={3} />
        ))}
        <rect x="0" y="0" width={W} height={D} rx="26" fill="none" stroke="rgba(62,198,255,0.35)" strokeWidth={3} />
      </svg>
      <div style={{ position: "absolute", left: 120, top: 60 }}>
        <Fan size={170} angle={fanAngle} />
      </div>
      <div style={{ position: "absolute", left: 720, top: 40 }}>
        <Fan size={170} angle={-fanAngle * 1.1} />
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------- pantalla */
const Screen: React.FC<{ glow: number; frame: number }> = ({ glow, frame }) => {
  const id = useUid("sc");
  const t = frame / 30;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`${id}wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0a0f2a" />
          <stop offset="0.5" stopColor="#1b0f3d" />
          <stop offset="1" stopColor="#05060f" />
        </linearGradient>
        <radialGradient id={`${id}b`} cx={0.3 + Math.sin(t) * 0.05} cy="0.35" r="0.6">
          <stop offset="0" stopColor="#1f7bff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#1f7bff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}p`} cx="0.72" cy={0.6 + Math.cos(t) * 0.05} r="0.55">
          <stop offset="0" stopColor="#7b2cff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7b2cff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}r`} cx="0.5" cy="1" r="0.5">
          <stop offset="0" stopColor="#e3141b" stopOpacity="0.7" />
          <stop offset="1" stopColor="#e3141b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}refl`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.13" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.02" />
          <stop offset="0.46" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} rx="24" fill="#0b0c0f" stroke="#2c2f37" strokeWidth={4} />
      <rect x="22" y="22" width={W - 44} height={H - 58} rx="8" fill="#000" />
      <g opacity={glow}>
        <rect x="22" y="22" width={W - 44} height={H - 58} rx="8" fill={`url(#${id}wall)`} />
        <rect x="22" y="22" width={W - 44} height={H - 58} rx="8" fill={`url(#${id}b)`} />
        <rect x="22" y="22" width={W - 44} height={H - 58} rx="8" fill={`url(#${id}p)`} />
        <rect x="22" y="22" width={W - 44} height={H - 58} rx="8" fill={`url(#${id}r)`} />
        {new Array(7).fill(0).map((_, i) => (
          <path
            key={i}
            d={`M22 ${300 + i * 24} C ${250} ${200 + i * 30 + Math.sin(t * 1.4 + i) * 40}, ${600} ${420 - i * 20 + Math.cos(t + i) * 40}, ${W - 22} ${260 + i * 26}`}
            stroke={i % 2 ? "#3ec6ff" : "#a66bff"}
            strokeOpacity={0.35}
            strokeWidth={2}
            fill="none"
          />
        ))}
      </g>
      <rect x="22" y="22" width={W - 44} height={H - 58} rx="8" fill={`url(#${id}refl)`} />
      <circle cx={W / 2} cy={11} r={4} fill="#1d2027" />
    </svg>
  );
};

/**
 * Laptop 3D real (CSS 3D): base horizontal + pantalla abisagrada.
 * xray: 0..1 barrido que revela el interior; explode: 0..1 eleva componentes.
 */
export const Laptop3D: React.FC<{
  frame: number;
  rotY: number;
  rotX: number;
  lid?: number; // ángulo de la pantalla hacia atrás (grados)
  xray?: number;
  explode?: number;
  screenGlow?: number;
}> = ({ frame, rotY, rotX, lid = 14, xray = 0, explode = 0, screenGlow = 1 }) => {
  const fanAngle = frame * 22;
  const scanY = xray * D;
  return (
    <div style={{ width: W, height: H + 40, perspective: 2600, perspectiveOrigin: "50% 30%" }}>
      <div
        style={{
          position: "relative",
          width: W,
          height: H + 40,
          transformStyle: "preserve-3d",
          transform: `translateY(${H * 0.45}px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${-D * 0.35}px)`,
        }}
      >
        {/* sombra en el piso */}
        <div
          style={{
            position: "absolute",
            left: -60,
            top: 20,
            width: W + 120,
            height: D + 60,
            transformOrigin: "50% 0%",
            transform: "rotateX(90deg) translateZ(-26px)",
            background: "radial-gradient(closest-side, rgba(0,0,0,0.85), transparent)",
          }}
        />
        {/* borde frontal (grosor) */}
        <div
          style={{
            position: "absolute",
            left: 10,
            top: 0,
            width: W - 20,
            height: 22,
            transform: `translateZ(${D}px)`,
            background: "linear-gradient(#5a5f6b, #1b1d22)",
            borderRadius: "0 0 14px 14px",
          }}
        />
        {/* base */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: W,
            height: D,
            transformOrigin: "50% 0%",
            transform: "rotateX(90deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
            <div style={{ position: "absolute", inset: 0, clipPath: `inset(${scanY}px 0 0 0)` }}>
              <KeyboardDeck />
            </div>
            <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 ${D - scanY}px 0)` }}>
              <Internals fanAngle={fanAngle} />
            </div>
            {xray > 0 && xray < 1 ? (
              <div
                style={{
                  position: "absolute",
                  left: -20,
                  right: -20,
                  top: scanY - 3,
                  height: 6,
                  background: "#bfefff",
                  boxShadow: "0 0 30px 10px rgba(62,198,255,0.9), 0 0 80px 30px rgba(123,44,255,0.5)",
                }}
              />
            ) : null}
            {/* módulo RAM que se eleva (vista explosionada) */}
            <div
              style={{
                position: "absolute",
                left: 650,
                top: 190,
                transform: `translateZ(${explode * 150}px) rotateX(${explode * -8}deg)`,
                opacity: Math.min(1, explode * 3),
                filter: `drop-shadow(0 0 ${20 * explode}px rgba(62,198,255,0.6))`,
              }}
            >
              <SoDimm width={230} />
            </div>
          </div>
        </div>
        {/* pantalla */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: -H,
            width: W,
            height: H,
            transformOrigin: "50% 100%",
            transform: `rotateX(${lid}deg)`,
            backfaceVisibility: "hidden",
          }}
        >
          <Screen glow={screenGlow} frame={frame} />
        </div>
      </div>
    </div>
  );
};
