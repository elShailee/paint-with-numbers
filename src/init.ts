import AnimationCanvas from './AnimationCanvas';
import './style.css';

const helpRowsData = [
	['h', 'show/hide help'],
	['f', 'toggle fullscreen'],
	['space', 'pause/resume animation'],
	['↑/↓', 'toggle animations'],
	['←/→', 'rewind/fast forward animation'],
	['escape', 'reset animation'],
	['+', 'speed up animation'],
	['-', 'slow down animation'],
	['0', 'restart animation'],
	['z', 'decrease cell size (cause lag)'],
	['x', 'increase cell size'],
	['c', 'toggle colors'],
];

const appContent = `
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

export const init = () => {
	document.querySelector<HTMLDivElement>('#app')!.innerHTML = appContent;

	const animationCanvas = new AnimationCanvas(window.innerWidth, window.innerHeight);
	animationCanvas.start();
};
