/**
 * Genera la locución en ESPAÑOL LATINO con ElevenLabs (voz natural, no robótica)
 * y la guarda por frases en public/audio/vo/vo-1.mp3 … vo-6.mp3.
 * El video detecta esos archivos automáticamente y los ubica en su tiempo.
 *
 * Uso:
 *   ELEVENLABS_API_KEY=xxxx ELEVENLABS_VOICE_ID=yyyy node scripts/generate-voiceover.mjs
 *
 * Elige en la Voice Library de ElevenLabs una voz latinoamericana (masculina o femenina)
 * con tono comercial y copia su Voice ID.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Debe coincidir con VO_LINES en src/theme.ts
const LINES = [
  { id: "vo-1", text: "¿Tu tecnología necesita atención?" },
  { id: "vo-2", text: "En EDITRONIC tenemos la solución." },
  { id: "vo-3", text: "Reparamos laptops, PlayStation y controles." },
  { id: "vo-4", text: "También encontrarás RAM, SSD, M punto dos, tintas, tóner y accesorios tecnológicos." },
  { id: "vo-5", text: "EDITRONIC." },
  { id: "vo-6", text: "Tu tecnología en manos expertas." },
];

const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID;
if (!apiKey || !voiceId) {
  console.error("Faltan ELEVENLABS_API_KEY y/o ELEVENLABS_VOICE_ID");
  process.exit(1);
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "audio", "vo");
mkdirSync(outDir, { recursive: true });

for (const line of LINES) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: { "xi-api-key": apiKey, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({
      text: line.text,
      model_id: "eleven_multilingual_v2",
      language_code: "es",
      voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true },
    }),
  });
  if (!res.ok) {
    console.error(`Error en ${line.id}: ${res.status} ${await res.text()}`);
    process.exit(1);
  }
  writeFileSync(join(outDir, `${line.id}.mp3`), Buffer.from(await res.arrayBuffer()));
  console.log(`✔ ${line.id}: ${line.text}`);
}
