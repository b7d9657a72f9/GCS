// WS runtime

let mousedown = false, 
windowCount = 0;

window.top.document.body.addEventListener('mousedown', () => {
	mousedown = true;
});

window.top.document.body.addEventListener('mouseup', () => {
	mousedown = false;
})

function createWSWindow(source, title, width, height, x, y) {
	windowCount++;
	let WSwindowElement = window.top.document.createElement('div'),
	WSwindowTitleElement = window.top.document.createElement('p'),
	WSwindowSourceElement = window.top.document.createElement('iframe'), 
	WSwindowCloseElement = window.top.document.createElement('button'),
	WSwindowMinimizeElement = window.top.document.createElement('button'),
	WSwindowDownloadElement = window.top.document.createElement('button');

	let oldX, oldY, newX, newY;

	WSwindowElement.id = `window${windowCount}`;
	WSwindowElement.className = 'window';
	WSwindowElement.style.width = `${width}px`;
	WSwindowElement.style.height = `${height}px`;
	WSwindowElement.style.top = `${y}px`;
	WSwindowElement.style.left = `${x}px;`;
	WSwindowElement.draggable = 'true';

	WSwindowTitleElement.id = `window${windowCount}-title`;
	WSwindowTitleElement.className = 'window-title';
	WSwindowTitleElement.innerText = title;

	WSwindowTitleElement.addEventListener('dragstart', (MouseEvent) => {
		MouseEvent.preventDefault();
		console.log('Drag start.');
		oldX = MouseEvent.x;
		oldY = MouseEvent.y;
	});

	WSwindowTitleElement.addEventListener('dragend', (MouseEvent) => {
		console.log('Drag end.');
		newX = oldX - MouseEvent.x;
		newY = oldY - MouseEvent.y;

		WSwindowElement.offsetLeft = newX;
		WSwindowElement.offsetTop = newY;
	});

	WSwindowSourceElement.id = `window${windowCount}-source`;
	WSwindowSourceElement.className = 'window-source';
	WSwindowSourceElement.src = source;
	WSwindowSourceElement.allow = 'allow-scripts allow-same-origin';

	WSwindowCloseElement.className = 'window-button';
	WSwindowCloseElement.innerText = 'X';

	WSwindowCloseElement.addEventListener('click', () => {
		if (localStorage.getItem('WS-password') !== '') {
			let input = prompt('Password:');

			if (input === localStorage.getItem('WS-password')) {
				window.top.document.getElementById(WSwindowElement.id).remove();
			}
		}
	});

	WSwindowMinimizeElement.className = 'window-button';
	WSwindowMinimizeElement.innerText = '-';

	WSwindowMinimizeElement.addEventListener('click', () => {
		if (WSwindowElement.style.height !== 'auto') {
			WSwindowMinimizeElement.innerText = '+';
			WSwindowElement.style.height = 'auto';
			WSwindowSourceElement.style.display = 'none';
			WSwindowElement.style.resize = 'none';
			WSwindowElement.style.zIndex = 0;
		} else {
			WSwindowMinimizeElement.innerText = '-';
			WSwindowElement.style.height = WSwindowElement.style.width;
			WSwindowSourceElement.style.display = 'block';
			WSwindowElement.style.resize = 'both';
			WSwindowElement.style.zIndex = 10;
		}
	});

	WSwindowDownloadElement.className = 'window-button';
	WSwindowDownloadElement.innerText = '#';

	WSwindowDownloadElement.addEventListener('click', () => {
		open(`https://github.com/${source.replace('https://', '').replace('.github.io', '')}/${source.replace('https://', '')}/archive/refs/heads/master.zip`, '_blank');
	});

	window.top.document.body.appendChild(WSwindowElement);
	window.top.document.getElementById(`window${windowCount}`).appendChild(WSwindowTitleElement);
	window.top.document.getElementById(`window${windowCount}-title`).appendChild(WSwindowCloseElement);
	window.top.document.getElementById(`window${windowCount}-title`).appendChild(WSwindowMinimizeElement);

	if (source.includes('.github.io')) {
		window.top.document.getElementById(`window${windowCount}-title`).appendChild(WSwindowDownloadElement);
	}

	window.top.document.getElementById(`window${windowCount}`).appendChild(WSwindowSourceElement);

	console.log(`${WSwindowElement.id} initiated.`);
}