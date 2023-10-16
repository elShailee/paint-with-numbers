import AnimationCanvas from '../AnimationCanvas';
import { getLineaRainbowColor, getRadialRainbowColor } from '../Utils/colors';
import { drawCircle } from '../Utils/draw';

const { sin, cos, abs } = Math;

export function drawCircledPixels(canvas: AnimationCanvas) {
	for (let x = 0; x < canvas._width; x += canvas._cellSize) {
		for (let y = 0; y < canvas._height; y += canvas._cellSize) {
			switch (canvas._colorsCounter % 3) {
				case 0:
					canvas._ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
					break;
				case 1:
					canvas._ctx.strokeStyle = getRadialRainbowColor({ position: { x, y }, canvas });
					break;
				case 2:
					canvas._ctx.strokeStyle = getLineaRainbowColor({ position: { x: canvas._width - x, y }, canvas });
					break;
			}

			drawCircle(
				canvas._ctx,
				{ x, y },

				abs(
					sin(x * canvas._animationTime * 0.000002) * canvas._cellSize +
						cos(y * canvas._animationTime * 0.000002) * canvas._cellSize,
				) * 3,
			);
		}
	}
}
