import React from "react";
import { FONT } from "../theme";
import { useUid } from "../components/common";

/** Reflejo especular que recorre la superficie (shine 0..1) */
const Shine: React.FC<{ id: string; shine: number; w: number; h: number; clip: string }> = ({ id, shine, w, h, clip }) => {
  const x = -0.6 + shine * 2.2;
  return (
    <>
      <defs>
        <linearGradient id={`${id}sh`} x1={x - 0.25} y1="0" x2={x + 0.25} y2="0.35" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={w} height={h} fill={`url(#${id}sh)`} clipPath={`url(#${clip})`} style={{ mixBlendMode: "screen" }} />
    </>
  );
};

/* ------------------------------------------------------- Memoria RAM DDR */
export const RamStick: React.FC<{ width: number; shine?: number }> = ({ width, shine = 0 }) => {
  const id = useUid("ram");
  const W = 1330;
  const H = 400;
  const body = `M30 70 L120 70 L140 40 L330 40 L350 70 L520 70 L540 40 L790 40 L810 70 L980 70 L1000 40 L1190 40 L1210 70 L1300 70 L1300 320 L30 320 Z`;
  return (
    <svg width={width} height={(width * H) / W} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}spr`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff4b52" />
          <stop offset="0.18" stopColor="#e3141b" />
          <stop offset="0.6" stopColor="#a30b12" />
          <stop offset="1" stopColor="#5e050a" />
        </linearGradient>
        <linearGradient id={`${id}blk`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b2e36" />
          <stop offset="1" stopColor="#0c0d11" />
        </linearGradient>
        <linearGradient id={`${id}gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1bf" />
          <stop offset="0.5" stopColor="#d9ac4a" />
          <stop offset="1" stopColor="#9a6e1e" />
        </linearGradient>
        <clipPath id={`${id}clip`}>
          <path d={body} />
        </clipPath>
      </defs>
      {/* PCB */}
      <rect x="40" y="250" width="1250" height="120" rx="6" fill="#0b2a1c" />
      {new Array(72).fill(0).map((_, i) => (
        <rect key={i} x={58 + i * 16.8 + (i >= 38 ? 14 : 0)} y={322} width={10} height={48} rx={2} fill={`url(#${id}gold)`} />
      ))}
      <rect x="682" y="320" width="18" height="60" fill="#05060b" />
      {/* disipador */}
      <path d={body} fill={`url(#${id}spr)`} />
      <path d="M30 210 L1300 210 L1300 320 L30 320 Z" fill={`url(#${id}blk)`} clipPath={`url(#${id}clip)`} />
      <path d="M30 206 L1300 206" stroke="#ff6a70" strokeWidth="3" opacity="0.8" />
      {new Array(18).fill(0).map((_, i) => (
        <path key={i} d={`M${120 + i * 62} 230 l40 0`} stroke="rgba(255,255,255,0.08)" strokeWidth={6} strokeLinecap="round" />
      ))}
      <text x="80" y="160" fill="rgba(255,255,255,0.92)" fontFamily={FONT} fontWeight={800} fontSize="54" letterSpacing="6">
        DDR4
      </text>
      <text x="1250" y="160" textAnchor="end" fill="rgba(255,255,255,0.75)" fontFamily={FONT} fontWeight={600} fontSize="34" letterSpacing="4">
        16GB · 3200
      </text>
      <path d={body} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <Shine id={id} shine={shine} w={W} h={H} clip={`${id}clip`} />
    </svg>
  );
};

/* ------------------------------------------------------- SSD SATA 2.5" */
export const SsdSata: React.FC<{ width: number; shine?: number }> = ({ width, shine = 0 }) => {
  const id = useUid("ssd");
  const W = 1000;
  const H = 760;
  return (
    <svg width={width} height={(width * H) / W} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}case`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5d626d" />
          <stop offset="0.45" stopColor="#3a3e47" />
          <stop offset="1" stopColor="#1d2026" />
        </linearGradient>
        <linearGradient id={`${id}side`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2d34" />
          <stop offset="1" stopColor="#0f1014" />
        </linearGradient>
        <linearGradient id={`${id}label`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#15171d" />
          <stop offset="1" stopColor="#07080b" />
        </linearGradient>
        <linearGradient id={`${id}gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff1bf" />
          <stop offset="1" stopColor="#b8892c" />
        </linearGradient>
        <clipPath id={`${id}clip`}>
          <rect x="20" y="20" width="960" height="640" rx="34" />
        </clipPath>
      </defs>
      {/* grosor */}
      <path d="M20 640 L20 660 Q20 720 80 720 L920 720 Q980 720 980 660 L980 640 Z" fill={`url(#${id}side)`} />
      {/* conectores SATA (datos + energía) */}
      <rect x="250" y="676" width="150" height="32" rx="4" fill="#07080b" />
      <rect x="430" y="676" width="300" height="32" rx="4" fill="#07080b" />
      {new Array(7).fill(0).map((_, i) => (
        <rect key={`d${i}`} x={262 + i * 19} y={686} width={10} height={14} fill={`url(#${id}gold)`} />
      ))}
      {new Array(15).fill(0).map((_, i) => (
        <rect key={`p${i}`} x={442 + i * 19} y={686} width={10} height={14} fill={`url(#${id}gold)`} />
      ))}
      {/* carcasa */}
      <rect x="20" y="20" width="960" height="640" rx="34" fill={`url(#${id}case)`} />
      <rect x="20" y="20" width="960" height="640" rx="34" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="3" />
      <rect x="70" y="70" width="860" height="540" rx="18" fill={`url(#${id}label)`} />
      <rect x="70" y="70" width="10" height="540" fill="#e3141b" />
      <text x="130" y="230" fill="#fff" fontFamily={FONT} fontWeight={900} fontSize="120" letterSpacing="10">
        SSD
      </text>
      <text x="134" y="300" fill="rgba(255,255,255,0.7)" fontFamily={FONT} fontWeight={600} fontSize="40" letterSpacing="8">
        SATA III · 2.5"
      </text>
      <text x="134" y="540" fill="rgba(62,198,255,0.95)" fontFamily={FONT} fontWeight={700} fontSize="44" letterSpacing="6">
        SOLID STATE DRIVE
      </text>
      {new Array(6).fill(0).map((_, i) => (
        <rect key={i} x={640 + i * 40} y={190} width={24} height={150} rx={4} fill="rgba(255,255,255,0.06)" />
      ))}
      {[
        [50, 50],
        [950, 50],
        [50, 630],
        [950, 630],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill="#1b1d22" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      ))}
      <Shine id={id} shine={shine} w={W} h={H} clip={`${id}clip`} />
    </svg>
  );
};

/* ------------------------------------------------------- SSD M.2 NVMe 2280 */
export const M2Nvme: React.FC<{ width: number; shine?: number }> = ({ width, shine = 0 }) => {
  const id = useUid("m2");
  const W = 1440;
  const H = 360;
  const board = "M60 40 H1340 A 26 26 0 0 0 1340 100 V 260 A 26 26 0 0 0 1340 320 H60 Z";
  return (
    <svg width={width} height={(width * H) / W} viewBox={`0 0 ${W} ${H}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id={`${id}pcb`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1c22" />
          <stop offset="1" stopColor="#08090c" />
        </linearGradient>
        <linearGradient id={`${id}chip`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#30333b" />
          <stop offset="0.5" stopColor="#15171c" />
          <stop offset="1" stopColor="#0a0b0e" />
        </linearGradient>
        <linearGradient id={`${id}gold`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9a6e1e" />
          <stop offset="0.5" stopColor="#fff1bf" />
          <stop offset="1" stopColor="#c99a3a" />
        </linearGradient>
        <clipPath id={`${id}clip`}>
          <path d={board} />
        </clipPath>
      </defs>
      <path d={board} fill={`url(#${id}pcb)`} />
      <path d={board} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
      {/* contactos dorados con muesca M */}
      {new Array(29).fill(0).map((_, i) => {
        const y = 50 + i * 9.4;
        if (i >= 21 && i <= 22) return null;
        return <rect key={i} x={10} y={y} width={78} height={6} rx={1} fill={`url(#${id}gold)`} />;
      })}
      <rect x="0" y="246" width="70" height="22" fill="#05060b" />
      {/* semicírculo para tornillo */}
      <circle cx="1340" cy="180" r="34" fill="none" stroke="#d9ac4a" strokeWidth="10" />
      {/* controlador */}
      <rect x="170" y="95" width="170" height="170" rx="8" fill={`url(#${id}chip)`} />
      <rect x="182" y="107" width="146" height="146" rx="6" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
      <circle cx="198" cy="123" r="6" fill="rgba(255,255,255,0.14)" />
      {/* DRAM */}
      <rect x="390" y="120" width="120" height="120" rx="6" fill={`url(#${id}chip)`} />
      {/* NAND */}
      <rect x="570" y="80" width="300" height="200" rx="8" fill={`url(#${id}chip)`} />
      <rect x="920" y="80" width="300" height="200" rx="8" fill={`url(#${id}chip)`} />
      <text x="720" y="195" textAnchor="middle" fill="rgba(255,255,255,0.32)" fontFamily={FONT} fontWeight={700} fontSize="34" letterSpacing="6">
        NVMe
      </text>
      <text x="1070" y="195" textAnchor="middle" fill="rgba(255,255,255,0.32)" fontFamily={FONT} fontWeight={700} fontSize="34" letterSpacing="6">
        PCIe 4.0
      </text>
      {/* SMD */}
      {new Array(22).fill(0).map((_, i) => (
        <g key={i}>
          <rect x={120 + (i % 11) * 40} y={i < 11 ? 56 : 286} width={18} height={9} fill="#b88b4a" />
          <rect x={120 + (i % 11) * 40} y={i < 11 ? 56 : 286} width={4} height={9} fill="#dfe3ea" />
          <rect x={134 + (i % 11) * 40} y={i < 11 ? 56 : 286} width={4} height={9} fill="#dfe3ea" />
        </g>
      ))}
      <rect x="1250" y="120" width="40" height="120" rx="4" fill="#e3141b" opacity="0.9" />
      <Shine id={id} shine={shine} w={W} h={H} clip={`${id}clip`} />
    </svg>
  );
};
