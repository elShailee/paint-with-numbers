export type Position = {
	x: number;
	y: number;
};

export const drawLine = (ctx: CanvasRenderingContext2D, from: Position, to: Position) => {
	ctx.beginPath();
	ctx.moveTo(from.x, from.y);
	ctx.lineTo(to.x, to.y);
	ctx.stroke();
	ctx.closePath();
};

export const drawCircleStroke = (ctx: CanvasRenderingContext2D, position: Position, radius: number) => {
	ctx.beginPath();
	ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();
};

export const drawCircleFill = (ctx: CanvasRenderingContext2D, position: Position, radius: number) => {
	ctx.beginPath();
	ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
	ctx.fill();
	ctx.closePath();
};
