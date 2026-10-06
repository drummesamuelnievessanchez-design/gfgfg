import { CalculateMetadataFunction, staticFile } from "remotion";
import { VO_LINES } from "./theme";

/**
 * Recursos opcionales que se detectan automáticamente en /public.
 *
 *  - public/brand/logo.(png|webp|svg)        → LOGO ORIGINAL de EDITRONIC (se usa sin alterarlo)
 *  - public/products/<clave>.(png|webp)      → foto real del producto (PNG con fondo transparente)
 *  - public/audio/voiceover.(mp3|wav|m4a)    → locución completa (empieza en 0 s)
 *  - public/audio/vo/vo-1.mp3 … vo-6.mp3      → locución por frases (se ubica en su tiempo)
 *
 * Si un recurso no existe, el video usa su versión vectorial / tipográfica.
 */
export const PRODUCT_KEYS = [
  "laptop",
  "console",
  "controller",
  "ram",
  "ssd",
  "m2",
  "ink",
  "toner",
  "keyboard",
  "mouse",
  "headphones",
  "charger",
] as const;
export type ProductKey = (typeof PRODUCT_KEYS)[number];

export type AdProps = {
  logo: string | null;
  /** Mostrar también el nombre en texto junto al logo (desactívalo si el logo ya incluye "EDITRONIC") */
  showNameWithLogo: boolean;
  photos: Partial<Record<ProductKey, string>>;
  voiceover: string | null;
  voLines: Record<string, string>;
  musicVolume: number;
};

export const defaultAdProps: AdProps = {
  logo: null,
  showNameWithLogo: true,
  photos: {},
  voiceover: null,
  voLines: {},
  musicVolume: 0.9,
};

const exists = async (path: string): Promise<boolean> => {
  try {
    const res = await fetch(staticFile(path), { method: "HEAD" });
    if (res.status === 405) {
      const get = await fetch(staticFile(path));
      return get.ok;
    }
    return res.ok;
  } catch {
    return false;
  }
};

const firstExisting = async (paths: string[]): Promise<string | null> => {
  for (const p of paths) {
    if (await exists(p)) return p;
  }
  return null;
};

export const detectAssets: CalculateMetadataFunction<AdProps> = async ({ props }) => {
  const logo = props.logo ?? (await firstExisting(["brand/logo.png", "brand/logo.webp", "brand/logo.svg"]));

  const photos: AdProps["photos"] = { ...props.photos };
  await Promise.all(
    PRODUCT_KEYS.map(async (k) => {
      if (photos[k]) return;
      const found = await firstExisting([`products/${k}.png`, `products/${k}.webp`]);
      if (found) photos[k] = found;
    }),
  );

  const voiceover =
    props.voiceover ??
    (await firstExisting(["audio/voiceover.mp3", "audio/voiceover.wav", "audio/voiceover.m4a"]));

  const voLines: Record<string, string> = { ...props.voLines };
  if (!voiceover) {
    await Promise.all(
      VO_LINES.map(async (l) => {
        if (voLines[l.id]) return;
        const found = await firstExisting([`audio/vo/${l.id}.mp3`, `audio/vo/${l.id}.wav`]);
        if (found) voLines[l.id] = found;
      }),
    );
  }

  return { props: { ...props, logo, photos, voiceover, voLines } };
};
