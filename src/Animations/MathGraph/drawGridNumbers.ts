import { colors } from './MathGraph';

const { round } = Math;

type Props = {
	cellSize: number;
	centerX: number;
	centerY: number;
	ctx: CanvasRenderingContext2D;
};

const xOffset = -10;
const yOffset = 19;

export const drawGridNumbers = ({ cellSize, centerX, centerY, ctx }: Props) => {
	ctx.fillStyle = colors.dark;

	for (let y = cellSize; y < centerY; y += cellSize) {
		const index = round(y / cellSize);
		ctx.fillText(index.toString(), centerX + xOffset, centerY + y + yOffset);
		ctx.fillText((-index).toString(), centerX + xOffset, centerY - y + yOffset);
	}
	for (let x = cellSize; x < centerX; x += cellSize) {
		const index = round(x / cellSize);
		ctx.fillText(index.toString(), centerX + x + xOffset, centerY + yOffset);
		ctx.fillText((-index).toString(), centerX - x + xOffset, centerY + yOffset);
	}
	ctx.fillText('0', centerX + xOffset, centerY + yOffset);
};
