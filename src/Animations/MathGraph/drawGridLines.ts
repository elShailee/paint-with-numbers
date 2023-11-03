import { drawLine } from '../../Utils/draw';
import { colors } from './MathGraph';

type Props = {
	cellSize: number;
	centerX: number;
	centerY: number;
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;
};
export const drawGridLines = ({ cellSize, centerX, centerY, ctx, width, height }: Props) => {
	ctx.strokeStyle = colors.light;
	for (let x = cellSize; x < centerX; x += cellSize) {
		drawLine(ctx, { x: centerX + x, y: 0 }, { x: centerX + x, y: height });
		drawLine(ctx, { x: centerX - x, y: 0 }, { x: centerX - x, y: height });
	}
	for (let y = cellSize; y < centerY; y += cellSize) {
		drawLine(ctx, { x: 0, y: centerY + y }, { x: width, y: centerY + y });
		drawLine(ctx, { x: 0, y: centerY - y }, { x: width, y: centerY - y });
	}
	ctx.strokeStyle = colors.dark;
	drawLine(ctx, { x: 0, y: centerY }, { x: width, y: centerY });
	drawLine(ctx, { x: centerX, y: 0 }, { x: centerX, y: height });
};
