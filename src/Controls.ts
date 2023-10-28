import AnimationCanvas from './AnimationCanvas';

export default class Controls {
	_animationCanvas: AnimationCanvas;
	_helpContainer: HTMLDivElement;
	_isHelpTextVisible: boolean = true;

	constructor(animationCanvas: AnimationCanvas, isEnvDev: boolean, controlsContainer?: HTMLDivElement) {
		this._animationCanvas = animationCanvas;
		this._helpContainer = isEnvDev ? document.querySelector<HTMLDivElement>('#helpContainer')! : controlsContainer!;
	}

	_showHelpText() {
		this._helpContainer.style.opacity = '1';
		this._isHelpTextVisible = true;
	}

	_hideHelpText() {
		this._helpContainer.style.opacity = '0';
		this._isHelpTextVisible = false;
	}

	listenToControlEvents() {
		document.addEventListener('keydown', e => {
			this._handleKeyboardControlEvents(e);
		});
	}

	_handleKeyboardControlEvents(e: KeyboardEvent) {
		if (e.code === 'Space') {
			this._animationCanvas.pauseOrResumeAnimation();
		}

		if (e.code === 'ArrowLeft') {
			this._animationCanvas.rewindAnimation(500);
		}

		if (e.code === 'ArrowRight') {
			this._animationCanvas.fastForwardAnimation(500);
		}

		if (e.code === 'ArrowUp') {
			this._animationCanvas.nextAnimation();
		}

		if (e.code === 'ArrowDown') {
			this._animationCanvas.previousAnimation();
		}

		if (e.code === 'Escape') {
			this._animationCanvas.resetAnimation();
		}

		if (e.code === 'NumpadAdd') {
			this._animationCanvas.speedUpAnimation();
		}

		if (e.code === 'NumpadSubtract') {
			this._animationCanvas.slowDownAnimation();
		}

		if (e.code === 'Numpad0' || e.code === 'Digit0') {
			this._animationCanvas.resetAnimationTime();
		}

		if (e.code === 'KeyH') {
			if (this._isHelpTextVisible) {
				this._hideHelpText();
			} else {
				this._showHelpText();
			}
		}

		if (e.code === 'KeyZ') {
			this._animationCanvas.decreaseCellSize();
		}

		if (e.code === 'KeyX') {
			this._animationCanvas.increaseCellSize();
		}

		if (e.code === 'KeyF') {
			if (document.fullscreenElement) {
				document.exitFullscreen();
			} else {
				document.documentElement.requestFullscreen();
			}
		}

		if (e.code === 'KeyC') {
			this._animationCanvas.toggleColors();
		}
	}
}
