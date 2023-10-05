type Position = {
	x: number;
	y: number;
};

export default class AnimationCanvas {
	#width: number;
	#height: number;
	#canvas: HTMLCanvasElement;
	#ctx: CanvasRenderingContext2D;
	#animationFrameId: number = 0;

	#resizeHandler = () => {
		this.#canvas.width = window.innerWidth;
		this.#canvas.height = window.innerHeight;
		this.#drawFrame();
	};

	constructor(width: number, height: number) {
		this.#width = width;
		this.#height = height;
		this.#canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
		this.#ctx = this.#canvas.getContext('2d')!;
		this.#canvas.width = this.#width;
		this.#canvas.height = this.#height;

		this.#drawFrame();
	}

	startAnimation() {
		window.addEventListener('resize', this.#resizeHandler);
		this.#animationFrameId = requestAnimationFrame(this.#animate.bind(this));
	}

	stopAnimation() {
		window.removeEventListener('resize', this.#resizeHandler);
		cancelAnimationFrame(this.#animationFrameId);
	}

	#animate() {
		this.#drawFrame();
		this.#animationFrameId = requestAnimationFrame(this.#animate.bind(this));
	}

	#drawLine(from: Position, to: Position) {
		this.#ctx.beginPath();
		this.#ctx.moveTo(from.x, from.y);
		this.#ctx.lineTo(to.x, to.y);
		this.#ctx.stroke();
	}

	#drawCircle(position: Position, radius: number) {
		this.#ctx.beginPath();
		this.#ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
		this.#ctx.stroke();
	}

	#drawFrame() {
		this.#ctx.clearRect(0, 0, this.#width, this.#height);

		this.#ctx.strokeStyle = '#aaa';
		this.#ctx.lineWidth = 1;
		this.#drawCircle({ x: 100, y: 100 }, 50);
		this.#drawLine({ x: 175, y: 175 }, { x: 225, y: 225 });

		this.#ctx.strokeStyle = '#333';
		this.#ctx.lineWidth = 2;
		this.#drawLine(
			{
				x: 100 + Math.sin(this.#animationFrameId * 0.05) * 50,
				y: 100 + Math.cos(this.#animationFrameId * 0.05) * 50,
			},
			{
				x: 200 + Math.sin(this.#animationFrameId * 0.05 + 0.5) * 25,
				y: 200 + Math.sin(this.#animationFrameId * 0.05 + 0.5) * 25,
			},
		);
	}
}
