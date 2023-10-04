export default class AnimationCanvas {
	#width: number;
	#height: number;
	#canvas: HTMLCanvasElement;
	#ctx: CanvasRenderingContext2D;

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
	}

	stopAnimation() {
		window.removeEventListener('resize', this.#resizeHandler);
	}

	#drawFrame() {
		this.#ctx.beginPath();
		this.#ctx.moveTo(100, 100);
		this.#ctx.lineTo(200, 200);
		this.#ctx.stroke();
	}
}
