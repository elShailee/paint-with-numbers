import AnimationCanvas from '../../AnimationCanvas';
import { drawCircleFill } from '../../Utils/draw';
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
}
