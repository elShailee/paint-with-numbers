import { drawLineVectorField } from './Animations/LineVectorField';
import Controls from './Controls';

const defaultCellSize = 20;
export default class AnimationCanvas {
	_width: number;
	_height: number;
	_canvas: HTMLCanvasElement;
	_ctx: CanvasRenderingContext2D;
	_animationFrameId: number = 0;
	_lastFrameTime: number = 0;
	_animationTime: number = 0;
	_animationSpeed: number = 1;
	_cellSize: number = defaultCellSize;
	_isAnimating: boolean = true;
	_colorsCounter: number = 0;
	_controls: Controls;

	constructor(width: number, height: number) {
		this._width = width;
		this._height = height;
		this._canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
		this._ctx = this._canvas.getContext('2d')!;
		this._canvas.width = this._width;
		this._canvas.height = this._height;
		this._drawFrame(0);
		this._controls = new Controls(this);
		this._controls.listenToControlEvents();
	}

	start() {
		window.addEventListener('resize', this._resizeHandler.bind(this));
		this._animationFrameId = requestAnimationFrame(this._animate.bind(this));
	}

	destroy() {
		window.removeEventListener('resize', this._resizeHandler.bind(this));
		cancelAnimationFrame(this._animationFrameId);
		this._clear();
	}

	_resizeHandler() {
		this._width = window.innerWidth;
		this._height = window.innerHeight;
		this._canvas.width = window.innerWidth;
		this._canvas.height = window.innerHeight;
		this._drawFrame(0);
	}

	startAnimation() {
		this._isAnimating = true;
	}

	pauseAnimation() {
		this._isAnimating = false;
	}

	pauseOrResumeAnimation() {
		if (this._isAnimating) {
			this.pauseAnimation();
		} else {
			this.startAnimation();
		}
	}

	rewindAnimation(time: number) {
		this._animationTime -= time * this._animationSpeed;
		this._drawFrame(0);
	}

	fastForwardAnimation(time: number) {
		this._animationTime += time * this._animationSpeed;
		this._drawFrame(0);
	}

	resetAnimation() {
		this._animationTime = 0;
		this._drawFrame(0);
		this._animationSpeed = 1;
		this._cellSize = defaultCellSize;
		this._colorsCounter = 0;
	}

	resetAnimationTime() {
		this._animationTime = 0;
		this._drawFrame(0);
	}

	speedUpAnimation() {
		this._animationSpeed *= 2;
	}

	slowDownAnimation() {
		this._animationSpeed *= 0.5;
	}

	decreaseCellSize() {
		if (this._cellSize > 1) this._cellSize -= 1;
		this._drawFrame(0);
	}

	increaseCellSize() {
		this._cellSize += 1;
		this._drawFrame(0);
	}

	toggleColors() {
		this._colorsCounter++;
		this._drawFrame(0);
	}

	_animate(time: number) {
		const delta = time - this._lastFrameTime;
		this._lastFrameTime += delta;
		if (this._isAnimating) {
			this._animationTime += delta * this._animationSpeed;
			this._drawFrame(delta * this._animationSpeed);
		}
		this._animationFrameId = requestAnimationFrame(this._animate.bind(this));
	}

	_clear() {
		this._ctx.clearRect(0, 0, this._width, this._height);
	}

	_drawFrame(delta: number) {
		this._clear();

		drawLineVectorField(this);
	}
}
