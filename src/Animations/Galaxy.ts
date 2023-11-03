import AnimationCanvas from '../AnimationCanvas';
import { getGradientRainbowColor, getLineaRainbowColor, getRadialRainbowColor } from '../Utils/colors';
import { Position, drawCircleStroke } from '../Utils/draw';

const { abs, sin, cos } = Math;

const numOfCirclesMultiplier = 15000;

const coloringFuncs = [
	() => 'rgba(0, 0, 0, 0.5)',
	(props: { position: Position; canvas: AnimationCanvas }) => getRadialRainbowColor(props),
	(props: { position: Position; canvas: AnimationCanvas }) => getLineaRainbowColor(props),
	(props: { val: number; scale: number; canvas: AnimationCanvas }) => getGradientRainbowColor(props),
];

export function drawGalaxy(canvas: AnimationCanvas) {
	const numOfCircles = numOfCirclesMultiplier / canvas._cellSize;
	const time = canvas._animationTime * 0.000001;

	for (let i = 0; i < numOfCircles; i++) {
		const cellTime = time * (i + 1);
		const pos: Position = {
			x:
				canvas._width * 0.5 +
				canvas._width * (sin(cellTime) * 100 + cos(cellTime * 0.5) * 25 - sin(cellTime * 0.3) * 20) * 0.003,
			y:
				canvas._height * 0.54 +
				canvas._width * (cos(cellTime) * 100 + sin(cellTime * 0.5) * 25 - cos(cellTime * 0.3) * 20) * 0.0015,
		};
		canvas._ctx.strokeStyle = coloringFuncs[canvas._colorsCounter % coloringFuncs.length]({
			val: i,
			scale: numOfCircles,
			position: pos,
			canvas,
		});
		drawCircleStroke(canvas._ctx, pos, abs(sin(cellTime * 1.4) * 10 + cos(cellTime * 0.5) * 10 + sin(cellTime * 0.2) * 10));
	}
}
