import { colors } from './MathGraph';

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

	let scaleFactor = 1;
	let scaledCellSize = cellSize;
	while (scaledCellSize >= 140) {
		scaledCellSize *= 0.5;
		scaleFactor *= 0.5;
	}
	while (scaledCellSize < 60) {
		scaledCellSize *= 2;
		scaleFactor *= 2;
	}
	for (let x = 1; x * scaledCellSize < centerX; x++) {
		const index = x * scaleFactor;
		ctx.fillText(index.toString(), centerX + x * scaledCellSize + xOffset, centerY + yOffset);
		ctx.fillText((-index).toString(), centerX - x * scaledCellSize + xOffset, centerY + yOffset);
	}
	for (let y = 1; y * scaledCellSize < centerY; y++) {
		const index = y * scaleFactor;
		ctx.fillText(index.toString(), centerX + xOffset, centerY + y * scaledCellSize + yOffset);
		ctx.fillText((-index).toString(), centerX + xOffset, centerY - y * scaledCellSize + yOffset);
	}
	ctx.fillText('0', centerX + xOffset, centerY + yOffset);
};
