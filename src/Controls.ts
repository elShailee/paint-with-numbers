import AnimationCanvas from './AnimationCanvas';

export default class Controls {
	#animationCanvas: AnimationCanvas;

	constructor(animationCanvas: AnimationCanvas) {
		this.#animationCanvas = animationCanvas;
	}

	listenToControlEvents() {
		document.addEventListener('keydown', e => {
			this.#handleKeyboardControlEvents(e);
		});
	}

	#handleKeyboardControlEvents(e: KeyboardEvent) {
		if (e.code === 'Space') {
			this.#animationCanvas.pauseOrResumeAnimation();
		}

		if (e.code === 'ArrowLeft') {
			this.#animationCanvas.rewindAnimation(500);
		}

		if (e.code === 'ArrowRight') {
			this.#animationCanvas.fastForwardAnimation(500);
		}

		if (e.code === 'Escape') {
			this.#animationCanvas.resetAnimation();
		}

		if (e.code === 'NumpadAdd') {
			this.#animationCanvas.speedUpAnimation();
		}

		if (e.code === 'NumpadSubtract') {
			this.#animationCanvas.slowDownAnimation();
		}

		if (e.code === 'Numpad0') {
			this.#animationCanvas.resetAnimationTime();
		}
	}
}
