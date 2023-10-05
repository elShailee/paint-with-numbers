import Controls from './Controls';

type Position = {
	x: number;
	y: number;
};

const { sin, cos } = Math;

export default class AnimationCanvas {
	#width: number;
	#height: number;
	#canvas: HTMLCanvasElement;
	#ctx: CanvasRenderingContext2D;
	#animationFrameId: number = 0;
	#lastFrameTime: number = 0;
	#animationTime: number = 0;
	#cellSize: number = 20;
	#isAnimating: boolean = false;
	#controls: Controls;

	constructor(width: number, height: number) {
		this.#width = width;
		this.#height = height;
		this.#canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
		this.#ctx = this.#canvas.getContext('2d')!;
		this.#canvas.width = this.#width;
		this.#canvas.height = this.#height;
		this.#drawFrame(0);
		this.#controls = new Controls(this);
		this.#controls.listenToControlEvents();
	}

	start() {
		window.addEventListener('resize', this.#resizeHandler.bind(this));
		this.#animationFrameId = requestAnimationFrame(this.#animate.bind(this));
	}

	destroy() {
		window.removeEventListener('resize', this.#resizeHandler.bind(this));
		cancelAnimationFrame(this.#animationFrameId);
		this.#clear();
	}

	#resizeHandler() {
		this.#width = window.innerWidth;
		this.#height = window.innerHeight;
		this.#canvas.width = window.innerWidth;
		this.#canvas.height = window.innerHeight;
		this.#drawFrame(0);
	}

	startAnimation() {
		this.#isAnimating = true;
	}

	pauseAnimation() {
		this.#isAnimating = false;
	}

	pauseOrResumeAnimation() {
		if (this.#isAnimating) {
			this.pauseAnimation();
		} else {
			this.startAnimation();
		}
	}

	#animate(time: number) {
		const delta = time - this.#lastFrameTime;
		this.#lastFrameTime += delta;
		if (this.#isAnimating) {
			this.#animationTime += delta;
			this.#drawFrame(delta);
		}
		this.#animationFrameId = requestAnimationFrame(this.#animate.bind(this));
	}

	#clear() {
		this.#ctx.clearRect(0, 0, this.#width, this.#height);
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

	#drawFrame(delta: number) {
		this.#clear();

		this.#ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
		for (let x = 0; x < this.#width; x += this.#cellSize) {
			for (let y = 0; y < this.#height; y += this.#cellSize) {
				this.#drawLine(
					{ x, y },
					{
						x: x + sin(x * this.#animationTime * 0.000002) * this.#cellSize,
						y: y + cos(y * this.#animationTime * 0.000002) * this.#cellSize,
					},
				);
			}
		}
	}
}
