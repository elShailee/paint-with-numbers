import AnimationCanvas from '../AnimationCanvas';
import { getLineaRainbowColor, getRadialRainbowColor } from '../Utils/colors';
import { Position, drawCircle } from '../Utils/draw';

const { abs, sin, cos } = Math;

const coloringFuncs = [
	() => 'rgba(0, 0, 0, 0.5)',
	(props: { position: Position; canvas: AnimationCanvas }) => getRadialRainbowColor(props),
	(props: { position: Position; canvas: AnimationCanvas }) => getLineaRainbowColor(props),
];

export function drawNewAnimation(canvas: AnimationCanvas) {
	canvas._ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
	const time = canvas._animationTime * 0.000001;
	for (let i = 0; i < 1000; i++) {
		const speed = time * (i + 1);
		const pos: Position = {
			x: canvas._width * 0.5 + canvas._width * (sin(speed) * 100 + cos(speed * 0.5) * 25 - sin(speed * 0.3) * 20) * 0.003,
			y: canvas._height * 0.54 + canvas._width * (cos(speed) * 100 + sin(speed * 0.5) * 25 - cos(speed * 0.3) * 20) * 0.0015,
		};
		canvas._ctx.strokeStyle = coloringFuncs[canvas._colorsCounter % coloringFuncs.length]({ position: pos, canvas });
		drawCircle(canvas._ctx, pos, abs(sin(speed * 1.4) * 10 + cos(speed * 0.5) * 10 + sin(speed * 0.2) * 10));
	}
}
