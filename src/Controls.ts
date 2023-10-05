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
	}
}
