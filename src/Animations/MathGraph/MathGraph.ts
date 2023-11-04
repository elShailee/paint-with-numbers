import AnimationCanvas from '../../AnimationCanvas';
import { drawLine } from '../../Utils/draw';
import { drawGridLines } from './drawGridLines';
import { drawGridNumbers } from './drawGridNumbers';

const { sin, cos } = Math;

export const colors = {
	light: 'rgba(0, 0, 0, 0.2)',
	dark: '#000',
};

export function drawMathGraph(canvas: AnimationCanvas) {
	const { _ctx: ctx, _width: width, _height: height } = canvas;
	const centerX = width * 0.5;
	const centerY = height * 0.5;
	const cellSize = canvas._cellSize * 4;
	const animationTime = canvas._animationTime * 0.0016;

	ctx.font = `italic 18px Georgia`;
	ctx.textAlign = 'right';

	drawGridLines({
		cellSize,
		centerX,
		centerY,
		ctx,
		width,
		height,
	});

	drawGridNumbers({
		cellSize,
		centerX,
		centerY,
		ctx,
	});

	const func = (x: number) => sin(x) * sin(x * animationTime * 0.5);
	const func2 = (x: number) => cos(x) * cos(x * animationTime * 0.5);
	const finalFunc = (x: number) => {
		const a = 0.5 * (1 - sin(animationTime));
		return func(x) * (1 - a) + func2(x) * a;
	};

	let x = 0;
	let y = -func((0 - centerX) / cellSize) * cellSize + centerY;
	while (x < width) {
		const nextResY = -finalFunc((x + 1 - centerX) / cellSize) * cellSize + centerY;
		drawLine(ctx, { x: x, y: y }, { x: x + 1, y: nextResY });
		y = nextResY;
		x++;
	}
}
