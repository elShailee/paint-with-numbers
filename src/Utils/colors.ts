import AnimationCanvas from '../AnimationCanvas';
import { getRelativeDistance } from './calcs';
import { Position } from './draw';

type Props = {
	position: Position;
	canvas: AnimationCanvas;
};

export const getRadialRainbowColor = ({ position, canvas }: Props) => {
	const cycleSpeed = 0.05;
	const hueOffset = 40;
	const gradient = getRelativeDistance({
		origin: { x: canvas._width * 0.5, y: canvas._height * 0.5 },
		pos: position,
		scale: canvas._height * 0.5,
	});

	const hue = 360 * gradient + hueOffset + canvas._animationTime * cycleSpeed;
	return `hsl(${hue}, 90%, 50%)`;
};

export const getLineaRainbowColor = ({ position, canvas }: Props) => {
	const cycleSpeed = 0.05;
	const completeRainbowInScreen = 2;
	const gradient = (360 * (-position.x - position.y)) / (canvas._width + canvas._height);

	const hue = gradient * completeRainbowInScreen + canvas._animationTime * cycleSpeed;
	return `hsl(${hue}, 90%, 50%)`;
};
