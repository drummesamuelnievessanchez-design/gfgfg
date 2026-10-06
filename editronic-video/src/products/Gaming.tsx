import React from "react";
import { useUid } from "../components/common";

/** Consola moderna de videojuegos (vista lateral, de pie). viewBox 520x1000 */
export const Console: React.FC<{ height: number; glow?: number; shine?: number }> = ({ height, glow = 1, shine = 0 }) => {
  const id = useUid("cn");
  const W = 520;
  const H = 1000;
  const shell =
    "M24 30 C 160 6, 340 14, 486 52 C 500 56, 504 70, 496 84 C 470 300, 452 600, 456 930 C 456 950, 444 962, 424 962 L 196 962 C 178 962, 168 952, 164 934 C 140 700, 92 380, 18 58 C 14 42, 14 32, 24 30 Z";
  const sx = -0.4 + shine * 1.8;
  return (
    <svg width={(height * W) / H} height={height} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}white`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.18" stopColor="#f7f8fb" />
          <stop offset="0.55" stopColor="#ffffff" />
          <stop offset="0.85" stopColor="#e2e6ee" />
          <stop offset="1" stopColor="#aab1be" />
        </linearGradient>
        <linearGradient id={`${id}core`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#050608" />
          <stop offset="0.5" stopColor="#1d2027" />
          <stop offset="1" stopColor="#050608" />
        </linearGradient>
        <linearGradient id={`${id}shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0.04" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={`${id}sh`} x1={sx - 0.2} y1="0" x2={sx + 0.2} y2="0.25">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}led`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <clipPath id={`${id}clip`}>
          <path d={shell} />
        </clipPath>
      </defs>
      {/* núcleo negro */}
      <rect x="56" y="40" width="400" height="944" rx="30" fill={`url(#${id}core)`} />
      {/* luz azul del núcleo */}
      <g opacity={glow}>
        <path d="M66 140 C 70 400, 72 700, 80 950" stroke="#3ec6ff" strokeWidth="16" fill="none" filter={`url(#${id}led)`} />
        <path d="M66 140 C 70 400, 72 700, 80 950" stroke="#bff0ff" strokeWidth="3" fill="none" />
      </g>
      {/* carcasa blanca */}
      <path d={shell} fill={`url(#${id}white)`} />
      <path d={shell} fill={`url(#${id}shade)`} />
      <path d={shell} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
      <path d="M60 90 C 120 380, 160 660, 186 940" stroke="rgba(0,0,0,0.10)" strokeWidth="4" fill="none" />
      {/* rejilla superior de ventilación */}
      {new Array(12).fill(0).map((_, i) => (
        <rect key={i} x={150 + i * 24} y={30 + i * 1.6} width={12} height={5} rx={2} fill="rgba(0,0,0,0.16)" />
      ))}
      <rect x="0" y="0" width={W} height={H} fill={`url(#${id}sh)`} clipPath={`url(#${id}clip)`} />
      {/* base */}
      <ellipse cx="300" cy="978" rx="170" ry="16" fill="#0c0d10" />
    </svg>
  );
};

/** Control inalámbrico moderno (vista superior). viewBox 1000x680 */
export const Controller: React.FC<{ width: number; glow?: number }> = ({ width, glow = 1 }) => {
  const id = useUid("ct");
  const W = 1000;
  const H = 680;
  const outline =
    "M500 128 L 640 126 C 700 124, 760 120, 812 140 C 866 160, 896 210, 912 270 C 938 360, 968 470, 972 556 C 976 626, 930 662, 876 652 C 830 644, 806 604, 784 560 C 760 512, 728 470, 680 462 L 320 462 C 272 470, 240 512, 216 560 C 194 604, 170 644, 124 652 C 70 662, 24 626, 28 556 C 32 470, 62 360, 88 270 C 104 210, 134 160, 188 140 C 240 120, 300 124, 360 126 Z";
  const center = "M300 210 C 300 180, 330 170, 360 170 L 640 170 C 670 170, 700 180, 700 210 L 700 400 C 700 440, 670 456, 630 456 L 370 456 C 330 456, 300 440, 300 400 Z";
  return (
    <svg width={width} height={(width * H) / W} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}white`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#e8ebf1" />
          <stop offset="1" stopColor="#b8bfcc" />
        </linearGradient>
        <linearGradient id={`${id}black`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2d35" />
          <stop offset="1" stopColor="#0b0c10" />
        </linearGradient>
        <radialGradient id={`${id}stick`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#3a3e47" />
          <stop offset="1" stopColor="#0a0b0e" />
        </radialGradient>
        <filter id={`${id}blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <path d={outline} fill="rgba(0,0,0,0.45)" transform="translate(10 18)" filter={`url(#${id}blur)`} />
      <path d={outline} fill={`url(#${id}white)`} />
      <path d={outline} fill="none" stroke="rgba(255,255,255,0.95)" strokeWidth="2" />
      {/* panel central negro */}
      <path d={center} fill={`url(#${id}black)`} />
      {/* panel táctil */}
      <rect x="350" y="138" width="300" height="150" rx="22" fill="#f1f3f7" stroke="rgba(0,0,0,0.12)" strokeWidth="2" />
      {/* barras de luz */}
      <g opacity={glow}>
        <path d="M352 160 L 352 270" stroke="#3ec6ff" strokeWidth="8" strokeLinecap="round" filter={`url(#${id}blur)`} />
        <path d="M648 160 L 648 270" stroke="#3ec6ff" strokeWidth="8" strokeLinecap="round" filter={`url(#${id}blur)`} />
      </g>
      <path d="M352 168 L 352 262" stroke="#9fe6ff" strokeWidth="3" strokeLinecap="round" opacity={glow} />
      <path d="M648 168 L 648 262" stroke="#9fe6ff" strokeWidth="3" strokeLinecap="round" opacity={glow} />
      {/* botones pequeños */}
      <rect x="318" y="170" width="14" height="40" rx="7" fill="#2b2e36" />
      <rect x="668" y="170" width="14" height="40" rx="7" fill="#2b2e36" />
      {/* cruceta */}
      <g transform="translate(210 290)">
        {[0, 90, 180, 270].map((r) => (
          <path key={r} transform={`rotate(${r})`} d="M-16 -22 L16 -22 L16 -58 C16 -64 12 -68 6 -68 L-6 -68 C-12 -68 -16 -64 -16 -58 Z" fill="#d8dce4" stroke="rgba(0,0,0,0.18)" strokeWidth="2" />
        ))}
      </g>
      {/* botones de acción (formas geométricas genéricas) */}
      <g transform="translate(790 290)">
        {[
          [0, -62],
          [62, 0],
          [0, 62],
          [-62, 0],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="27" fill="#e6e9ef" stroke="rgba(0,0,0,0.18)" strokeWidth="2" />
            {i === 0 && <path d={`M${x - 11} ${y + 8} L ${x} ${y - 11} L ${x + 11} ${y + 8} Z`} fill="none" stroke="#8a93a3" strokeWidth="3" />}
            {i === 1 && <circle cx={x} cy={y} r="11" fill="none" stroke="#8a93a3" strokeWidth="3" />}
            {i === 2 && <path d={`M${x - 9} ${y - 9} L ${x + 9} ${y + 9} M ${x + 9} ${y - 9} L ${x - 9} ${y + 9}`} stroke="#8a93a3" strokeWidth="3" />}
            {i === 3 && <rect x={x - 9} y={y - 9} width="18" height="18" fill="none" stroke="#8a93a3" strokeWidth="3" />}
          </g>
        ))}
      </g>
      {/* sticks analógicos */}
      {[380, 620].map((x) => (
        <g key={x}>
          <circle cx={x} cy={400} r="64" fill="#06070a" />
          <circle cx={x} cy={400} r="54" fill={`url(#${id}stick)`} />
          <circle cx={x} cy={400} r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
          <circle cx={x - 12} cy={388} r="14" fill="rgba(255,255,255,0.08)" />
        </g>
      ))}
      {/* botón central */}
      <circle cx="500" cy="420" r="18" fill="#1d2027" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
      {/* rejilla de altavoz */}
      {new Array(5).fill(0).map((_, i) => (
        <circle key={i} cx={470 + i * 15} cy={330} r="3" fill="#3a3e47" />
      ))}
    </svg>
  );
};
