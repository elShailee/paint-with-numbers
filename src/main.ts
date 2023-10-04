import AnimationCanvas from './AnimationCanvas';
import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas" />
`;

const animationCanvas = new AnimationCanvas(window.innerWidth, window.innerHeight);
animationCanvas.startAnimation();
