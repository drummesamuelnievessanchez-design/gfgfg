import React, { createContext, useContext, useId } from "react";
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame } from "remotion";
import { AdProps, defaultAdProps, ProductKey } from "../assets";
import { C, FONT, ip } from "../theme";

export const AdContext = createContext<AdProps>(defaultAdProps);
export const useAd = () => useContext(AdContext);

/** id único y válido para referencias url(#id) en SVG */
export const useUid = (prefix: string) => `${prefix}${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

/* ----------------------------------------------------------- fondo continuo */
export const Background: React.FC<{ tint?: number }> = ({ tint = 0 }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const bx = 540 + Math.sin(t * 0.6) * 260;
  const by = 700 + Math.cos(t * 0.45) * 220;
  const px = 540 + Math.cos(t * 0.5 + 1) * 300;
  const py = 1300 + Math.sin(t * 0.4) * 240;
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 900px at ${bx}px ${by}px, rgba(31,123,255,0.30), transparent 70%),
            radial-gradient(1000px 1000px at ${px}px ${py}px, rgba(123,44,255,0.28), transparent 70%),
            radial-gradient(1200px 700px at 540px 1950px, rgba(227,20,27,${0.18 + tint * 0.25}), transparent 75%)`,
        }}
      />
      <PerspectiveGrid />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(130% 85% at 50% 45%, transparent 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const PerspectiveGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 2.2) % 120;
  return (
    <AbsoluteFill style={{ perspective: 900, perspectiveOrigin: "50% 40%" }}>
      <div
        style={{
          position: "absolute",
          left: -1200,
          right: -1200,
          top: 1200,
          height: 2400,
          transformOrigin: "50% 0%",
          transform: "rotateX(78deg)",
          backgroundImage: `linear-gradient(rgba(62,198,255,0.16) 2px, transparent 2px),
            linear-gradient(90deg, rgba(166,107,255,0.14) 2px, transparent 2px)`,
          backgroundSize: "120px 120px",
          backgroundPosition: `0px ${shift}px`,
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent 70%)",
        }}
      />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------ partículas sutiles */
export const Particles: React.FC<{ count?: number; seed?: string; opacity?: number; speed?: number }> = ({
  count = 46,
  seed = "p",
  opacity = 1,
  speed = 1,
}) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      {new Array(count).fill(0).map((_, i) => {
        const x0 = random(`${seed}x${i}`) * 1080;
        const y0 = random(`${seed}y${i}`) * 1920;
        const s = 1.5 + random(`${seed}s${i}`) * 4;
        const v = (0.4 + random(`${seed}v${i}`) * 1.2) * speed;
        const y = (((y0 - frame * v * 2) % 1920) + 1920) % 1920;
        const x = x0 + Math.sin(frame / 40 + i) * 14;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(frame / (18 + (i % 7) * 4) + i));
        const col = i % 5 === 0 ? C.redBright : i % 2 ? C.blueBright : C.purpleBright;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: s,
              height: s,
              borderRadius: "50%",
              background: col,
              opacity: tw * 0.7,
              boxShadow: `0 0 ${s * 4}px ${s}px ${col}`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

/* ----------------------------------------------------- barrido de luz */
export const LightSweep: React.FC<{ progress: number; angle?: number; width?: number; intensity?: number }> = ({
  progress,
  angle = 18,
  width = 520,
  intensity = 1,
}) => {
  if (progress <= 0 || progress >= 1) return null;
  const x = -900 + progress * 2900;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: -600,
          left: x - width / 2,
          width,
          height: 3200,
          rotate: `${angle}deg`,
          opacity: intensity,
          background: `linear-gradient(90deg, transparent 0%, rgba(123,44,255,0.35) 22%, rgba(31,123,255,0.65) 40%, rgba(255,255,255,0.95) 50%, rgba(62,198,255,0.6) 60%, rgba(123,44,255,0.3) 78%, transparent 100%)`,
          filter: "blur(18px)",
        }}
      />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------- destellos horizontales */
export const Streak: React.FC<{ y: number; progress: number; color?: string; thickness?: number; reverse?: boolean }> = ({
  y,
  progress,
  color = C.blueBright,
  thickness = 4,
  reverse = false,
}) => {
  if (progress <= 0 || progress >= 1) return null;
  const p = reverse ? 1 - progress : progress;
  const x = -700 + p * 2500;
  const o = Math.sin(progress * Math.PI);
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x - 450,
        width: 900,
        height: thickness,
        borderRadius: thickness,
        opacity: o,
        background: `linear-gradient(90deg, transparent, ${color} 45%, #fff 50%, ${color} 55%, transparent)`,
        boxShadow: `0 0 30px 6px ${color}`,
        mixBlendMode: "screen",
      }}
    />
  );
};

/* ------------------------------------------------- textos con máscara */
export const RevealLine: React.FC<{
  start: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  duration?: number;
}> = ({ start, children, style, duration = 16 }) => {
  const frame = useCurrentFrame();
  const p = ip(frame, [start, start + duration], [0, 1]);
  return (
    <div style={{ overflow: "hidden", paddingBottom: 6, paddingTop: 4 }}>
      <div
        style={{
          translate: `0px ${(1 - p) * 110}%`,
          opacity: ip(frame, [start, start + duration * 0.6], [0, 1]),
          filter: `blur(${(1 - p) * 8}px)`,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const headlineStyle: React.CSSProperties = {
  fontFamily: FONT,
  fontWeight: 900,
  color: C.white,
  fontSize: 100,
  lineHeight: 1.02,
  letterSpacing: "0.01em",
  textAlign: "center",
  textShadow: "0 6px 40px rgba(0,0,0,0.6)",
};

/** Texto con brillo metálico que lo recorre */
export const ShineText: React.FC<{
  children: React.ReactNode;
  shine: number;
  base?: string;
  style?: React.CSSProperties;
}> = ({ children, shine, base = "#ffffff", style }) => {
  const pos = 140 - shine * 180;
  return (
    <span
      style={{
        backgroundImage: `linear-gradient(100deg, ${base} 0%, ${base} 40%, #ffffff 47%, #cfe9ff 50%, #ffffff 53%, ${base} 60%, ${base} 100%)`,
        backgroundSize: "300% 100%",
        backgroundPosition: `${pos}% 0%`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        ...style,
      }}
    >
      {children}
    </span>
  );
};

/** Línea de acento roja que se expande */
export const AccentBar: React.FC<{ start: number; width?: number; color?: string }> = ({
  start,
  width = 180,
  color = C.red,
}) => {
  const frame = useCurrentFrame();
  const p = ip(frame, [start, start + 18], [0, 1]);
  return (
    <div
      style={{
        width: width * p,
        height: 8,
        borderRadius: 8,
        margin: "0 auto",
        background: `linear-gradient(90deg, ${C.purple}, ${color} 35%, ${C.redBright} 65%, ${C.blue})`,
        boxShadow: `0 0 24px rgba(227,20,27,0.8)`,
      }}
    />
  );
};

/** Etiqueta pequeña tipo "kicker" */
export const Kicker: React.FC<{ start: number; children: React.ReactNode; color?: string }> = ({
  start,
  children,
  color = C.blueBright,
}) => {
  const frame = useCurrentFrame();
  const p = ip(frame, [start, start + 18], [0, 1]);
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 30,
        letterSpacing: `${0.55 - p * 0.2}em`,
        color,
        opacity: p,
        textAlign: "center",
        textTransform: "uppercase",
        marginBottom: 18,
        paddingLeft: "0.35em",
      }}
    >
      {children}
    </div>
  );
};

/* ------------------------------------------------- logo / marca */
export const BrandName: React.FC<{ size?: number; shine?: number; style?: React.CSSProperties }> = ({
  size = 132,
  shine = 0,
  style,
}) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: size,
      letterSpacing: "0.06em",
      paddingLeft: "0.06em",
      lineHeight: 1,
      textAlign: "center",
      filter: "drop-shadow(0 8px 30px rgba(227,20,27,0.35))",
      ...style,
    }}
  >
    <ShineText shine={shine}>EDITRONIC</ShineText>
  </div>
);

/** Logo ORIGINAL (si existe en public/brand) sin deformarlo: solo escala uniforme. */
export const LogoImage: React.FC<{ maxWidth: number; maxHeight: number; style?: React.CSSProperties }> = ({
  maxWidth,
  maxHeight,
  style,
}) => {
  const { logo } = useAd();
  if (!logo) return null;
  return (
    <Img
      src={staticFile(logo)}
      style={{ maxWidth, maxHeight, width: "auto", height: "auto", objectFit: "contain", display: "block", margin: "0 auto", ...style }}
    />
  );
};

/** Marca pequeña fija en la parte superior (escenas de producto) */
export const BrandBug: React.FC<{ opacity: number }> = ({ opacity }) => {
  const { logo } = useAd();
  return (
    <div
      style={{
        position: "absolute",
        top: 92,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        opacity,
      }}
    >
      {logo ? (
        <LogoImage maxWidth={260} maxHeight={70} />
      ) : (
        <>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: C.red, boxShadow: `0 0 16px ${C.red}` }} />
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 34, letterSpacing: "0.32em", color: C.white }}>
            EDITRONIC
          </div>
        </>
      )}
    </div>
  );
};

/* ------------------------------------------------- producto con reflejo */
export const ProductStage: React.FC<{
  children: React.ReactNode;
  reflect?: boolean;
  shadowWidth?: number;
  style?: React.CSSProperties;
}> = ({ children, reflect = true, shadowWidth = 600, style }) => (
  <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", ...style }}>
    <div
      style={{
        WebkitBoxReflect: reflect
          ? "below 6px linear-gradient(transparent 62%, rgba(255,255,255,0.22))"
          : undefined,
      } as React.CSSProperties}
    >
      {children}
    </div>
    <div
      style={{
        position: "absolute",
        bottom: -30,
        width: shadowWidth,
        height: 60,
        borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(0,0,0,0.75), transparent)",
        zIndex: -1,
      }}
    />
  </div>
);

/** Usa la foto real del producto si existe; si no, la ilustración vectorial. */
export const ProductArt: React.FC<{
  k: ProductKey;
  width: number;
  height: number;
  children: React.ReactNode;
}> = ({ k, width, height, children }) => {
  const { photos } = useAd();
  const src = photos[k];
  if (src) {
    return (
      <Img
        src={staticFile(src)}
        style={{ width, height, objectFit: "contain", display: "block", filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.55))" }}
      />
    );
  }
  return <div style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>;
};

/* ------------------------------------------------- iconos (sin emojis) */
export const PhoneIcon: React.FC<{ size: number; color?: string }> = ({ size, color = C.white }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="6" y="1.5" width="12" height="21" rx="3" stroke={color} strokeWidth="1.8" />
    <line x1="10" y1="4.6" x2="14" y2="4.6" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="12" cy="19" r="1.3" fill={color} />
  </svg>
);

export const PinIcon: React.FC<{ size: number; color?: string }> = ({ size, color = C.white }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 22s7-6.6 7-12.2A7 7 0 0 0 5 9.8C5 15.4 12 22 12 22Z"
      stroke={color}
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="9.8" r="2.6" stroke={color} strokeWidth="1.8" />
  </svg>
);
