import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { FONT } from "./theme";

for (const weight of ["400", "500", "600", "700", "800", "900"]) {
  loadFont({
    family: FONT,
    url: staticFile(`fonts/montserrat-latin-${weight}-normal.woff2`),
    weight,
  });
}
