import AnimationCanvas from './AnimationCanvas';

export default class Controls {
	#animationCanvas: AnimationCanvas;
	#helpContainer: HTMLDivElement;
	#isHelpTextVisible: boolean = true;

	constructor(animationCanvas: AnimationCanvas) {
		this.#animationCanvas = animationCanvas;
		this.#helpContainer = document.querySelector<HTMLDivElement>('#helpContainer')!;
	}

	#showHelpText() {
		this.#helpContainer.style.opacity = '1';
		this.#isHelpTextVisible = true;
	}

	#hideHelpText() {
		this.#helpContainer.style.opacity = '0';
		this.#isHelpTextVisible = false;
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

		if (e.code === 'Numpad0' || e.code === 'Digit0') {
			this.#animationCanvas.resetAnimationTime();
		}

		if (e.code === 'KeyH') {
			if (this.#isHelpTextVisible) {
				this.#hideHelpText();
			} else {
				this.#showHelpText();
			}
		}
	}
}
