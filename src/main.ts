import AnimationCanvas from './AnimationCanvas';
import './style.css';

const helpRowsData = [
	['h', 'show/hide help'],
	['f', 'toggle fullscreen'],
	['space', 'pause/resume animation'],
	['left arrow', 'rewind animation'],
	['right arrow', 'fast forward animation'],
	['escape', 'reset animation'],
	['+', 'speed up animation'],
	['-', 'slow down animation'],
	['0', 'restart animation'],
	['z', 'decrease cell size (cause lag)'],
	['x', 'increase cell size'],
	['c', 'toggle colors'],
];

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="helpContainer">
		${helpRowsData
			.map(
				row => `
			<div class="helpRowContainer">
				<div class="helpKeyContainer">
					${row[0]}
				</div>
				<div>
					${row[1]}
				</div>
			</div>
		`,
			)
			.join('')}
	</div>
  <canvas id="canvas" />
`;

const animationCanvas = new AnimationCanvas(window.innerWidth, window.innerHeight);
animationCanvas.start();
