import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BrandName, LogoImage, PhoneIcon, PinIcon, RevealLine, useAd } from "../components/common";
import { C, FONT, HALF, easeInOut, ip } from "../theme";

const Sparkle: React.FC<{ x: number; y: number; size: number; p: number }> = ({ x, y, size, p }) => {
  const o = Math.sin(Math.min(1, Math.max(0, p)) * Math.PI);
  if (o <= 0) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      style={{ position: "absolute", left: x - size / 2, top: y - size / 2, opacity: o, scale: `${0.4 + o * 0.6}`, rotate: `${p * 90}deg`, mixBlendMode: "screen" }}
    >
      <path d="M0 -50 C 4 -10, 10 -4, 50 0 C 10 4, 4 10, 0 50 C -4 10, -10 4, -50 0 C -10 -4, -4 -10, 0 -50 Z" fill="#fff" />
      <circle r="10" fill="#bfe8ff" />
    </svg>
  );
};

/** ESCENA 6 – Cierre comercial (18–25 s) */
export const S6Outro: React.FC = () => {
  const f = useCurrentFrame() - HALF;
  const { logo, showNameWithLogo } = useAd();

  const bgIn = ip(f, [-HALF, 10], [0, 1]);
  const logoIn = ip(f, [0, 22], [0, 1]);
  const breathe = 1 + Math.sin(f / 24) * 0.006;

  // golpe final de la música en 22 s (= frame 120 de esta escena)
  const ring = ip(f, [116, 150], [0, 1], easeInOut);
  const ringFade = ip(f, [150, 200], [1, 0.35]);
  const bloom = ip(f, [118, 126], [0, 1]) * ip(f, [126, 170], [1, 0.25]);
  const shine = ip(f, [120, 150], [0, 1], easeInOut);

  const contactIn = ip(f, [64, 84], [0, 1]);
  const addrIn = ip(f, [76, 96], [0, 1]);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* fondo limpio con colores corporativos */}
      <AbsoluteFill
        style={{
          opacity: bgIn,
          background: `radial-gradient(900px 760px at 540px 640px, rgba(227,20,27,0.42), rgba(142,7,16,0.22) 45%, transparent 75%),
            radial-gradient(900px 700px at 0px 1700px, rgba(31,123,255,0.30), transparent 70%),
            radial-gradient(900px 700px at 1080px 1500px, rgba(123,44,255,0.30), transparent 70%),
            linear-gradient(180deg, #0a0408 0%, #07060c 55%, #05060b 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: bgIn * 0.5,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(600px 500px at 540px 640px, black, transparent)",
          WebkitMaskImage: "radial-gradient(600px 500px at 540px 640px, black, transparent)",
        }}
      />

      {/* bloque de marca */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 700, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {/* anillo de brillo alrededor del logo */}
        <div
          style={{
            position: "absolute",
            left: 540 - 360,
            top: 350 - 360,
            width: 720,
            height: 720,
            borderRadius: "50%",
            opacity: ring * ringFade,
            rotate: `${ring * 220 + f * 0.4}deg`,
            background: `conic-gradient(from 0deg, transparent 0deg, ${C.blueBright} 40deg, #fff 60deg, ${C.purpleBright} 90deg, transparent 140deg, transparent 180deg, ${C.redBright} 230deg, #fff 250deg, ${C.blue} 280deg, transparent 320deg)`,
            maskImage: "radial-gradient(closest-side, transparent 88%, black 89%, black 92%, transparent 93%)",
            WebkitMaskImage: "radial-gradient(closest-side, transparent 88%, black 89%, black 92%, transparent 93%)",
            filter: "blur(1px) drop-shadow(0 0 18px rgba(62,198,255,0.8))",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 540 - 500,
            top: 350 - 500,
            width: 1000,
            height: 1000,
            borderRadius: "50%",
            opacity: bloom * 0.9,
            background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(62,198,255,0.28) 25%, rgba(227,20,27,0.18) 45%, transparent 65%)",
            mixBlendMode: "screen",
          }}
        />

        <div style={{ scale: `${(0.88 + logoIn * 0.12) * breathe}`, opacity: logoIn, filter: `blur(${(1 - logoIn) * 16}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
          {logo ? <LogoImage maxWidth={800} maxHeight={showNameWithLogo ? 380 : 520} style={{ filter: `drop-shadow(0 0 ${30 + bloom * 50}px rgba(255,255,255,${0.15 + bloom * 0.35}))` }} /> : null}
          {!logo || showNameWithLogo ? <BrandName size={logo ? 112 : 128} shine={shine} /> : null}
        </div>

        <Sparkle x={850} y={190} size={110} p={ip(f, [122, 150], [0, 1], (t) => t)} />
        <Sparkle x={220} y={500} size={80} p={ip(f, [130, 156], [0, 1], (t) => t)} />
        <Sparkle x={760} y={560} size={60} p={ip(f, [138, 162], [0, 1], (t) => t)} />
      </div>

      {/* eslogan */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 1010, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: 260 * ip(f, [30, 50], [0, 1]), height: 6, borderRadius: 6, background: `linear-gradient(90deg, ${C.blue}, ${C.red}, ${C.purple})`, marginBottom: 30, boxShadow: "0 0 20px rgba(227,20,27,0.7)" }} />
        <RevealLine start={HALF + 38}>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 66, color: C.white, letterSpacing: "0.03em", textAlign: "center", lineHeight: 1.1 }}>
            TU TECNOLOGÍA
          </div>
        </RevealLine>
        <RevealLine start={HALF + 44}>
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 66, color: C.redBright, letterSpacing: "0.03em", textAlign: "center", lineHeight: 1.1, textShadow: "0 0 30px rgba(227,20,27,0.5)" }}>
            EN MANOS EXPERTAS
          </div>
        </RevealLine>
      </div>

      {/* contacto */}
      <div style={{ position: "absolute", left: 80, right: 80, top: 1310, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            padding: "26px 46px",
            borderRadius: 100,
            background: `linear-gradient(90deg, ${C.red}, #b40d14)`,
            boxShadow: "0 20px 50px rgba(227,20,27,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",
            opacity: contactIn,
            translate: `0px ${(1 - contactIn) * 50}px`,
            scale: `${0.94 + contactIn * 0.06}`,
          }}
        >
          <PhoneIcon size={64} />
          <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 70, color: C.white, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>098 027 8273</div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 22,
            padding: "28px 40px",
            borderRadius: 30,
            background: "rgba(255,255,255,0.05)",
            border: "1.5px solid rgba(255,255,255,0.14)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            opacity: addrIn,
            translate: `0px ${(1 - addrIn) * 50}px`,
          }}
        >
          <div style={{ marginTop: 4, filter: `drop-shadow(0 0 12px ${C.blueBright})` }}>
            <PinIcon size={60} color={C.blueBright} />
          </div>
          <div style={{ fontFamily: FONT, color: C.white }}>
            <div style={{ fontWeight: 800, fontSize: 44, letterSpacing: "0.02em" }}>Centro de Quevedo</div>
            <div style={{ fontWeight: 500, fontSize: 36, color: C.text2, marginTop: 8 }}>Calle Décima y 7 de Octubre</div>
            <div style={{ fontWeight: 500, fontSize: 36, color: C.text2, marginTop: 4 }}>Diagonal a Peralta</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
