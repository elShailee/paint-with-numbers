import { Position } from './draw';

const { pow, sqrt } = Math;

export const getSquaredDistance = (from: Position, to: Position) => {
	return pow(from.x - to.x, 2) + pow(from.y - to.y, 2);
};

type GetRelativeDistanceProps = {
	origin: Position;
	pos: Position;
	scale: number;
};
export const getRelativeDistance = ({ origin, pos, scale }: GetRelativeDistanceProps) => {
	return sqrt(getSquaredDistance(pos, origin)) / scale;
};
