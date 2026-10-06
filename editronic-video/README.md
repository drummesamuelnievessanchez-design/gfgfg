# EDITRONIC – Anuncio publicitario 9:16

Video vertical **1080×1920, 30 fps, 25 s** para **EDITRONIC – Servicio Técnico Electrónico**, construido con [Remotion](https://www.remotion.dev).

## Estructura

| Tiempo | Escena | Transición de salida |
|---|---|---|
| 0–3 s | Impacto inicial: placa electrónica → logo, *EDITRONIC / SERVICIO TÉCNICO ELECTRÓNICO* | Whip pan + light sweep |
| 3–7 s | Laptop 3D con escaneo de rayos X (placa, refrigeración, RAM), *LAPTOP Y REPARACIÓN* | Línea de luz azul/morada |
| 7–10 s | Consola y control, *PLAYSTATION Y CONTROLES* | Zoom macro |
| 10–14 s | RAM → SSD SATA → M.2 NVMe, *RAM • SSD • M.2 / MÁS VELOCIDAD PARA TU EQUIPO* | Desplazamiento lateral |
| 14–18 s | Catálogo: tintas, toner, teclado, mouse, audífonos, cargadores y cables | Destello + partículas |
| 18–25 s | Cierre: marca, *TU TECNOLOGÍA EN MANOS EXPERTAS*, teléfono, dirección y brillo final | — |

Música original (electrónica corporativa, 120 BPM) generada por `scripts/generate_music.py`; sus golpes y whooshes caen exactamente en cada corte (3, 7, 10, 14, 18 y 22 s).

## Recursos de marca (IMPORTANTE)

El video **no dibuja ni inventa un logo**. Coloca los archivos originales y se usan automáticamente:

| Archivo | Uso |
|---|---|
| `public/brand/logo.png` (o `.webp` / `.svg`) | **Logo original** de EDITRONIC. Solo se escala de forma uniforme, nunca se deforma. Sin logo, se muestra el nombre en tipografía. |
| `public/products/<clave>.png` | Foto real de producto (PNG con fondo transparente) que reemplaza la ilustración: `laptop`, `console`, `controller`, `ram`, `ssd`, `m2`, `ink`, `toner`, `keyboard`, `mouse`, `headphones`, `charger`. |
| `public/audio/voiceover.mp3` | Locución completa (empieza en 0 s). |
| `public/audio/vo/vo-1.mp3 … vo-6.mp3` | Locución por frases (se ubican solas en su tiempo). |

Si el logo ya incluye la palabra EDITRONIC y no quieres verla repetida, cambia `showNameWithLogo` a `false` en `src/assets.ts`.

## Locución (español latino)

Guía de tiempos para grabar con locutor o con IA (la música baja automáticamente durante la voz):

| Inicio | Frase |
|---|---|
| 0:00.35 | ¿Tu tecnología necesita atención? |
| 0:02.25 | En EDITRONIC tenemos la solución. |
| 0:04.60 | Reparamos laptops, PlayStation y controles. |
| 0:09.60 | También encontrarás RAM, SSD, M.2, tintas, toner y accesorios tecnológicos. |
| 0:18.45 | EDITRONIC. |
| 0:19.75 | Tu tecnología en manos expertas. |

Con ElevenLabs (voz latinoamericana natural):

```bash
ELEVENLABS_API_KEY=... ELEVENLABS_VOICE_ID=... npm run voiceover
npm run render
```

## Comandos

```bash
npm i
npm run dev        # Remotion Studio (vista previa)
npm run render     # → out/EDITRONIC_anuncio_1080x1920.mp4
npm run music      # regenera public/audio/music.wav (requiere python3 + numpy + scipy)
```
