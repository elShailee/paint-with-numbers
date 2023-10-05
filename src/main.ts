import AnimationCanvas from './AnimationCanvas';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="controlsContainer" />
  <canvas id="canvas" />
`;

const animationCanvas = new AnimationCanvas(window.innerWidth, window.innerHeight);
animationCanvas.start();
