import {useMemo} from 'react';
import {Dimensions} from '../interfaces';

export const useImageLoader = ({
  dimensions,
  text,
  font,
  letterSpacing,
  textColor,
  fontLoaded,
}: {
  dimensions: Dimensions;
  text: string;
  font: string;
  letterSpacing: number;
  textColor: string;
  fontLoaded: boolean;
}) => {
  const imageData = useMemo(() => {
    const {height, width} = dimensions;
    if (!height && !width && !fontLoaded) {
      return null;
    }

    const analysisCanvas = new OffscreenCanvas(width, height);

    const analysisContext = analysisCanvas.getContext('2d', {
      willReadFrequently: true,
    }) as OffscreenCanvasRenderingContext2D;

    if (!analysisContext) {
      return;
    }

    analysisContext.textAlign = 'center';
    analysisContext.textBaseline = 'middle';
    analysisContext.fillStyle = textColor;
    analysisContext.font = font;
    analysisContext.letterSpacing = `${letterSpacing}rem`;
    analysisContext.fillText(text, width / 2, height / 2);

    // Analyze image data without affecting main canvas
    return analysisCanvas.transferToImageBitmap();
  }, [dimensions, text, font, letterSpacing, textColor, fontLoaded]);

  return imageData;
};
