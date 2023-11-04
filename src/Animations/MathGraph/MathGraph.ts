import AnimationCanvas from '../../AnimationCanvas';
import { drawCircleFill, drawLine } from '../../Utils/draw';
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
	const animationTime = canvas._animationTime * 0.001;

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

	// rotating circle around the center
	const distanceFromOrigin = cellSize * 3;
	const angle = animationTime;
	const x = centerX + distanceFromOrigin * cos(angle);
	const y = centerY + distanceFromOrigin * sin(angle);
	const radius = cellSize * 0.1;
	drawCircleFill(ctx, { x, y }, radius);

	const func = (x: number) => Math.log2(x);

	for (let x = 0; x <= centerX * Math.min(1, animationTime / 100000); x += 0.001) {
		drawLine(
			ctx,
			{
				x: centerX + x * cellSize * cellSize,
				y: centerY - func(x * cellSize) * cellSize,
			},
			{
				x: centerX + (x + 0.001) * cellSize * cellSize,
				y: centerY - func((x + 0.001) * cellSize) * cellSize,
			},
		);
		drawLine(
			ctx,
			{
				x: centerX - x * cellSize * cellSize,
				y: centerY - func(-x * cellSize) * cellSize,
			},
			{
				x: centerX - (x + 0.001) * cellSize * cellSize,
				y: centerY - func(-(x + 0.001) * cellSize) * cellSize,
			},
		);
	}

	// // drawCircleFill(ctx, { x: centerX, y: 100 + centerY }, radius);
	// // drawCircleFill(ctx, { x: 180 + centerX, y: 100 + centerY }, radius);
	// // drawCircleFill(ctx, { x: 180 + centerX, y: centerY }, radius);
	// // drawCircleFill(ctx, { x: 180 + centerX, y: -100 + centerY }, radius);
	// // drawCircleFill(ctx, { x: 380 + centerX, y: -100 + centerY }, radius);
	// // drawCircleFill(ctx, { x: 380 + centerX, y: centerY }, radius);
	// ctx.beginPath();
	// ctx.moveTo(0 + centerX, centerY);
	// ctx.bezierCurveTo(0 + centerX, 100 + centerY, 180 + centerX, 100 + centerY, 180 + centerX, 0 + centerY);
	// ctx.bezierCurveTo(180 + centerX, -100 + centerY, 380 + centerX, -100 + centerY, 380 + centerX, 0 + centerY);
	// ctx.stroke();
}
