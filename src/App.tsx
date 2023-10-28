import React, { useEffect, useRef } from 'react';
import AnimationCanvas from './AnimationCanvas';
import './style.css';

export default function App() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const controlsContainerRef = useRef<HTMLDivElement>(null);
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

	useEffect(() => {
		if (!canvasRef.current) {
			console.error('canvasRef.current is falsy');
			return;
		}

		if (!controlsContainerRef.current) {
			console.error('controlsContainerRef.current is falsy');
			return;
		}

		const animationCanvas = new AnimationCanvas({
			isEnvDev: false,
			canvas: canvasRef.current!,
			controlsContainer: controlsContainerRef.current!,
		});
		animationCanvas.start();
	}, []);

	return (
		<div style={{ backgroundColor: 'white', width: '100vw', height: '100vh' }}>
			<div id='helpContainer' ref={controlsContainerRef}>
				{helpRowsData.map(row => (
					<div className='helpRowContainer'>
						<div className='helpKeyContainer'>{row[0]}</div>
						<div>{row[1]}</div>
					</div>
				))}
			</div>
			<canvas id='canvas' ref={canvasRef} />
		</div>
	);
}
