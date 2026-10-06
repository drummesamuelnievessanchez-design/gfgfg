import React from "react";
import { FONT } from "../theme";
import { useUid } from "../components/common";

/* ---------------------------------------------- cartuchos de tinta CMYK */
export const InkCartridges: React.FC<{ width: number }> = ({ width }) => {
  const id = useUid("ink");
  const colors = ["#111317", "#00A6E8", "#E3007E", "#FFD400"];
  return (
    <svg width={width} height={width * 0.78} viewBox="0 0 500 390" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}body`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1a1c22" />
          <stop offset="0.35" stopColor="#3a3e48" />
          <stop offset="1" stopColor="#14161b" />
        </linearGradient>
        <linearGradient id={`${id}gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1bf" />
          <stop offset="1" stopColor="#b8892c" />
        </linearGradient>
        <linearGradient id={`${id}gloss`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {colors.map((c, i) => {
        const x = 20 + i * 118;
        const y = 40 + (i % 2) * 18;
        return (
          <g key={c}>
            <rect x={x} y={y} width="100" height="300" rx="12" fill={`url(#${id}body)`} />
            <rect x={x} y={y} width="100" height="70" rx="12" fill={c} />
            <rect x={x} y={y + 58} width="100" height="12" fill={c} />
            <rect x={x + 18} y={y + 110} width="64" height="120" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
            <rect x={x + 22} y={y + 170} width="56" height="56" rx="6" fill={c} opacity={0.55} />
            {[0, 1, 2].map((k) => (
              <rect key={k} x={x + 30 + k * 15} y={y + 254} width="9" height="22" rx="2" fill={`url(#${id}gold)`} />
            ))}
            <rect x={x} y={y} width="100" height="300" rx="12" fill={`url(#${id}gloss)`} />
          </g>
        );
      })}
    </svg>
  );
};

/* ---------------------------------------------- cartucho de toner */
export const Toner: React.FC<{ width: number }> = ({ width }) => {
  const id = useUid("tn");
  return (
    <svg width={width} height={width * 0.5} viewBox="0 0 600 300" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b3f49" />
          <stop offset="0.35" stopColor="#1b1d23" />
          <stop offset="1" stopColor="#090a0d" />
        </linearGradient>
        <linearGradient id={`${id}cap`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5c616c" />
          <stop offset="1" stopColor="#24272e" />
        </linearGradient>
        <linearGradient id={`${id}drum`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d8f4a" />
          <stop offset="0.5" stopColor="#7ed08a" />
          <stop offset="1" stopColor="#245a2d" />
        </linearGradient>
      </defs>
      <path d="M40 80 Q40 50 70 50 L530 50 Q560 50 560 80 L560 200 Q560 240 520 250 L100 250 Q40 240 40 200 Z" fill={`url(#${id}b)`} />
      <rect x="40" y="200" width="520" height="22" fill={`url(#${id}drum)`} opacity={0.9} />
      <rect x="20" y="60" width="44" height="180" rx="12" fill={`url(#${id}cap)`} />
      <rect x="536" y="60" width="44" height="180" rx="12" fill={`url(#${id}cap)`} />
      <rect x="200" y="20" width="200" height="46" rx="16" fill="none" stroke="#2f323a" strokeWidth="16" />
      <rect x="110" y="96" width="380" height="70" rx="10" fill="rgba(255,255,255,0.05)" />
      <rect x="110" y="96" width="10" height="70" fill="#e3141b" />
      <text x="140" y="144" fill="rgba(255,255,255,0.85)" fontFamily={FONT} fontWeight={800} fontSize="34" letterSpacing="8">
        TONER
      </text>
      <path d="M60 60 L540 60" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
    </svg>
  );
};

/* ---------------------------------------------- teclado */
export const Keyboard: React.FC<{ width: number }> = ({ width }) => {
  const id = useUid("kbd");
  const cols = 15;
  const rows = 5;
  return (
    <svg width={width} height={width * 0.42} viewBox="0 0 760 320" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}case`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#34373f" />
          <stop offset="1" stopColor="#111216" />
        </linearGradient>
        <linearGradient id={`${id}key`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2d34" />
          <stop offset="1" stopColor="#0d0e11" />
        </linearGradient>
        <linearGradient id={`${id}rgb`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1f7bff" />
          <stop offset="0.5" stopColor="#7b2cff" />
          <stop offset="1" stopColor="#e3141b" />
        </linearGradient>
        <filter id={`${id}f`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <rect x="20" y="40" width="720" height="250" rx="22" fill={`url(#${id}rgb)`} filter={`url(#${id}f)`} opacity={0.55} />
      <rect x="20" y="30" width="720" height="250" rx="22" fill={`url(#${id}case)`} stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
      {new Array(rows).fill(0).map((_, r) =>
        new Array(cols).fill(0).map((__, c) => {
          if (r === rows - 1 && c > 3 && c < 10) {
            if (c !== 4) return null;
            return <rect key={`${r}${c}`} x={44 + c * 45.5} y={58 + r * 44} width={45.5 * 6 - 6} height={38} rx={6} fill={`url(#${id}key)`} />;
          }
          return (
            <g key={`${r}${c}`}>
              <rect x={44 + c * 45.5} y={58 + r * 44} width={39.5} height={38} rx={6} fill={`url(#${id}key)`} />
              <rect x={47 + c * 45.5} y={60 + r * 44} width={33.5} height={4} rx={2} fill="rgba(255,255,255,0.08)" />
            </g>
          );
        }),
      )}
      <rect x="44" y="275" width="672" height="3" rx="2" fill={`url(#${id}rgb)`} opacity={0.9} />
    </svg>
  );
};

/* ---------------------------------------------- mouse */
export const Mouse: React.FC<{ width: number }> = ({ width }) => {
  const id = useUid("ms");
  const shape = "M150 30 C 230 30, 270 110, 270 220 C 270 350, 230 430, 150 430 C 70 430, 30 350, 30 220 C 30 110, 70 30, 150 30 Z";
  return (
    <svg width={width} height={width * 1.5} viewBox="0 0 300 450" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}b`} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#4a4e58" />
          <stop offset="0.45" stopColor="#1f2127" />
          <stop offset="1" stopColor="#08090b" />
        </radialGradient>
        <filter id={`${id}f`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <path d={shape} fill={`url(#${id}b)`} />
      <path d="M150 34 L150 170" stroke="rgba(0,0,0,0.6)" strokeWidth="3" />
      <path d="M40 170 C 100 186, 200 186, 260 170" stroke="rgba(0,0,0,0.5)" strokeWidth="3" fill="none" />
      <rect x="138" y="70" width="24" height="64" rx="12" fill="#0b0c0f" stroke="rgba(255,255,255,0.2)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="141" x2="159" y1={82 + i * 10} y2={82 + i * 10} stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      ))}
      <path d="M44 300 C 60 380, 100 420, 150 424 C 200 420, 240 380, 256 300" stroke="#e3141b" strokeWidth="6" fill="none" filter={`url(#${id}f)`} />
      <path d="M44 300 C 60 380, 100 420, 150 424 C 200 420, 240 380, 256 300" stroke="#ff6a70" strokeWidth="2.5" fill="none" />
      <path d={shape} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
      <ellipse cx="105" cy="90" rx="30" ry="50" fill="rgba(255,255,255,0.08)" transform="rotate(-20 105 90)" />
    </svg>
  );
};

/* ---------------------------------------------- audífonos */
export const Headphones: React.FC<{ width: number }> = ({ width }) => {
  const id = useUid("hp");
  return (
    <svg width={width} height={width} viewBox="0 0 400 400" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}band`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a4e58" />
          <stop offset="1" stopColor="#15171c" />
        </linearGradient>
        <radialGradient id={`${id}cup`} cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#4c505b" />
          <stop offset="0.5" stopColor="#1d1f25" />
          <stop offset="1" stopColor="#07080a" />
        </radialGradient>
        <linearGradient id={`${id}metal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1f3f7" />
          <stop offset="0.5" stopColor="#8f96a3" />
          <stop offset="1" stopColor="#d5d9e0" />
        </linearGradient>
      </defs>
      <path d="M70 230 C 60 90, 140 40, 200 40 C 260 40, 340 90, 330 230" stroke={`url(#${id}band)`} strokeWidth="30" fill="none" strokeLinecap="round" />
      <path d="M78 220 C 72 100, 145 56, 200 56 C 255 56, 328 100, 322 220" stroke="rgba(255,255,255,0.14)" strokeWidth="3" fill="none" />
      {[
        [80, -1],
        [320, 1],
      ].map(([x, s]) => (
        <g key={x}>
          <rect x={x - 10} y={190} width="20" height="50" rx="6" fill={`url(#${id}metal)`} />
          <ellipse cx={x} cy={290} rx="62" ry="84" fill={`url(#${id}cup)`} />
          <ellipse cx={x} cy={290} rx="62" ry="84" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="2" />
          <ellipse cx={x + s * 6} cy={290} rx="34" ry="50" fill="none" stroke="#7b2cff" strokeWidth="4" opacity={0.85} />
          <ellipse cx={x + s * 6} cy={290} rx="34" ry="50" fill="none" stroke="#a66bff" strokeWidth="12" opacity={0.18} />
        </g>
      ))}
    </svg>
  );
};

/* ---------------------------------------------- cargador + cable USB-C */
export const Charger: React.FC<{ width: number }> = ({ width }) => {
  const id = useUid("ch");
  return (
    <svg width={width} height={width * 0.8} viewBox="0 0 500 400" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}w`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#e3e7ee" />
          <stop offset="1" stopColor="#aeb5c2" />
        </linearGradient>
        <linearGradient id={`${id}pin`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8f96a3" />
          <stop offset="0.5" stopColor="#f6f7f9" />
          <stop offset="1" stopColor="#7d8492" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1f7bff" />
          <stop offset="1" stopColor="#7b2cff" />
        </linearGradient>
      </defs>
      {/* cable */}
      <path d="M190 250 C 250 360, 330 380, 380 330 C 430 280, 360 220, 320 260 C 280 300, 360 360, 430 300 C 460 270, 470 220, 450 170" stroke="#0e0f13" strokeWidth="16" fill="none" strokeLinecap="round" />
      <path d="M190 250 C 250 360, 330 380, 380 330 C 430 280, 360 220, 320 260 C 280 300, 360 360, 430 300 C 460 270, 470 220, 450 170" stroke={`url(#${id}c)`} strokeWidth="4" fill="none" strokeLinecap="round" opacity={0.6} />
      {/* conector USB-C */}
      <rect x="430" y="110" width="40" height="70" rx="10" fill="#15171c" />
      <rect x="438" y="76" width="24" height="40" rx="8" fill={`url(#${id}pin)`} />
      <rect x="444" y="84" width="12" height="22" rx="4" fill="#2a2d34" />
      {/* clavijas */}
      <rect x="90" y="40" width="16" height="60" rx="3" fill={`url(#${id}pin)`} />
      <rect x="164" y="40" width="16" height="60" rx="3" fill={`url(#${id}pin)`} />
      {/* cuerpo */}
      <rect x="50" y="90" width="170" height="170" rx="34" fill={`url(#${id}w)`} />
      <rect x="50" y="90" width="170" height="170" rx="34" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <rect x="112" y="226" width="46" height="18" rx="6" fill="#1b1d22" />
      <text x="135" y="180" textAnchor="middle" fill="rgba(0,0,0,0.35)" fontFamily={FONT} fontWeight={800} fontSize="30" letterSpacing="2">
        65W
      </text>
    </svg>
  );
};
