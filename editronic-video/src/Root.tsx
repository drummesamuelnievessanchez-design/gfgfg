import { Composition, Folder } from "remotion";
import { defaultAdProps, detectAssets } from "./assets";
import { EditronicAd } from "./EditronicAd";
import { ProductSheet } from "./ProductSheet";
import { DURATION, FPS, HEIGHT, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="EditronicAd"
        component={EditronicAd}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={defaultAdProps}
        calculateMetadata={detectAssets}
      />
      <Folder name="Control-de-calidad">
        <Composition
          id="ProductSheet"
          component={ProductSheet}
          durationInFrames={60}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{ xray: 0.5 }}
        />
      </Folder>
    </>
  );
};
