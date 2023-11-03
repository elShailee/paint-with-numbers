import AnimationCanvas from '../AnimationCanvas';
import { drawLine, drawCircleFill } from '../Utils/draw';

const { sin, cos, round } = Math;

const colors = {
	light: 'rgba(0, 0, 0, 0.2)',
	dark: '#000',
};

export function drawMathGraph(canvas: AnimationCanvas) {
	const { _ctx: ctx, _width: width, _height: height } = canvas;
	const centerX = width * 0.5;
	const centerY = height * 0.5;
	const cellSize = canvas._cellSize * 4;
	const animationTime = canvas._animationTime * 0.001;

	ctx.font = `italic ${cellSize * 0.3}px Georgia`;
	ctx.textAlign = 'center';

	for (let x = cellSize; x < centerX; x += cellSize) {
		// draw vertical lines
		ctx.strokeStyle = colors.light;
		drawLine(ctx, { x: centerX + x, y: 0 }, { x: centerX + x, y: height });
		drawLine(ctx, { x: centerX - x, y: 0 }, { x: centerX - x, y: height });

		// draw x axis numbers
		ctx.fillStyle = colors.dark;
		const index = round(x / cellSize);
		ctx.fillText(index.toString(), centerX + x - cellSize * 0.2, centerY + cellSize * 0.3);
		ctx.fillText((-index).toString(), centerX - x + cellSize * 0.2, centerY + cellSize * 0.3);
	}
	for (let y = cellSize; y < centerY; y += cellSize) {
		// draw horizontal lines
		ctx.strokeStyle = colors.light;
		drawLine(ctx, { x: 0, y: centerY + y }, { x: width, y: centerY + y });
		drawLine(ctx, { x: 0, y: centerY - y }, { x: width, y: centerY - y });

		// draw y axis numbers
		ctx.fillStyle = colors.dark;
		const index = round(y / cellSize);
		ctx.fillText(index.toString(), centerX - cellSize * 0.25, centerY + y + cellSize * 0.25);
		ctx.fillText((-index).toString(), centerX - cellSize * 0.25, centerY - y + cellSize * 0.25);
	}
	// draw x and y axis
	ctx.strokeStyle = colors.dark;
	drawLine(ctx, { x: 0, y: centerY }, { x: width, y: centerY });
	drawLine(ctx, { x: centerX, y: 0 }, { x: centerX, y: height });

	// rotating circle around the center
	const distanceFromOrigin = cellSize * 3;
	const angle = animationTime;
	const x = centerX + distanceFromOrigin * cos(angle);
	const y = centerY + distanceFromOrigin * sin(angle);
	const radius = cellSize * 0.1;
	drawCircleFill(ctx, { x, y }, radius);
}
