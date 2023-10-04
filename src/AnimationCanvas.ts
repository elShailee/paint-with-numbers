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

	#drawFrame() {
		this.#ctx.clearRect(0, 0, this.#width, this.#height);
		this.#ctx.beginPath();
		this.#ctx.moveTo(100 + this.#animationFrameId, 100);
		this.#ctx.lineTo(200 + this.#animationFrameId / 2, 200);
		this.#ctx.stroke();
	}
}
