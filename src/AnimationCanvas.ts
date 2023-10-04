export default class AnimationCanvas {
	#width: number;
	#height: number;
	#canvas: HTMLCanvasElement;
	#ctx: CanvasRenderingContext2D;

	#resizeHandler = () => {
		console.log('resize');
		this.#canvas.width = window.innerWidth;
		this.#canvas.height = window.innerHeight;
	};

	constructor(width: number, height: number) {
		this.#width = width;
		this.#height = height;
		this.#canvas = document.createElement('canvas');
		this.#ctx = this.#canvas.getContext('2d')!;
		this.#canvas.width = this.#width;
		this.#canvas.height = this.#height;
	}

	startAnimation() {
		window.addEventListener('resize', this.#resizeHandler);
	}

	stopAnimation() {
		window.removeEventListener('resize', this.#resizeHandler);
	}
}
