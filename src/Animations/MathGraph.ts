import AnimationCanvas from '../AnimationCanvas';
import { drawLine } from '../Utils/draw';

const colors = {
	light: 'rgba(0, 0, 0, 0.2)',
	dark: '#000',
};

export function drawMathGraph(canvas: AnimationCanvas) {
	const centerX = canvas._width * 0.5;
	const centerY = canvas._height * 0.5;
	const cellSize = canvas._cellSize * 2.5;
	for (let x = cellSize; x < centerX; x += cellSize) {
		canvas._ctx.strokeStyle = colors.light;
		drawLine(canvas._ctx, { x: centerX + x, y: 0 }, { x: centerX + x, y: canvas._height });
		drawLine(canvas._ctx, { x: centerX - x, y: 0 }, { x: centerX - x, y: canvas._height });

		canvas._ctx.strokeStyle = colors.dark;
		drawLine(
			canvas._ctx,
			{ x: centerX + x, y: centerY - cellSize * 0.25 },
			{ x: centerX + x, y: centerY + cellSize * 0.25 },
		);
		drawLine(
			canvas._ctx,
			{ x: centerX - x, y: centerY - cellSize * 0.25 },
			{ x: centerX - x, y: centerY + cellSize * 0.25 },
		);
	}
	for (let y = cellSize; y < centerY; y += cellSize) {
		canvas._ctx.strokeStyle = colors.light;
		drawLine(canvas._ctx, { x: 0, y: centerY + y }, { x: canvas._width, y: centerY + y });
		drawLine(canvas._ctx, { x: 0, y: centerY - y }, { x: canvas._width, y: centerY - y });

		canvas._ctx.strokeStyle = colors.dark;
		drawLine(
			canvas._ctx,
			{ x: centerX - cellSize * 0.25, y: centerY + y },
			{ x: centerX + cellSize * 0.25, y: centerY + y },
		);
		drawLine(
			canvas._ctx,
			{ x: centerX - cellSize * 0.25, y: centerY - y },
			{ x: centerX + cellSize * 0.25, y: centerY - y },
		);
	}
	canvas._ctx.strokeStyle = colors.dark;
	drawLine(canvas._ctx, { x: 0, y: canvas._height / 2 }, { x: canvas._width, y: canvas._height / 2 });
	drawLine(canvas._ctx, { x: canvas._width / 2, y: 0 }, { x: canvas._width / 2, y: canvas._height });
}
