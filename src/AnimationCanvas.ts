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

		this.#ctx.strokeStyle = '#333';
		this.#ctx.lineWidth = 2;

		this.#ctx.beginPath();
		this.#ctx.moveTo(100 + Math.sin(this.#animationFrameId / 20) * 50, 100 + Math.cos(this.#animationFrameId / 20) * 50);
		this.#ctx.lineTo(
			200 + Math.sin(this.#animationFrameId / 20 + 0.5) * 25,
			200 + Math.sin(this.#animationFrameId / 20 + 0.5) * 25,
		);
		this.#ctx.stroke();

		this.#ctx.strokeStyle = '#aaa';
		this.#ctx.lineWidth = 1;

		this.#ctx.beginPath();
		this.#ctx.arc(100, 100, 50, 0, 2 * Math.PI);
		this.#ctx.stroke();

		this.#ctx.beginPath();
		this.#ctx.moveTo(175, 175);
		this.#ctx.lineTo(225, 225);
		this.#ctx.stroke();
	}
}
