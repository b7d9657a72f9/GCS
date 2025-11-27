// GCS runtime

let mousedown = false, 
windowCount = 0;

window.top.document.body.addEventListener('mousedown', () => {
	mousedown = true;
});

window.top.document.body.addEventListener('mouseup', () => {
	mousedown = false;
})

function createGCSWindow(source, title, width, height, x, y) {
	windowCount++;
	let GCSwindowElement = window.top.document.createElement('div'),
	GCSwindowTitleElement = window.top.document.createElement('p'), 
	GCSwindowSourceElement = window.top.document.createElement('iframe'), 
	GCSwindowCloseElement = window.top.document.createElement('button'),
	GCSwindowMinimizeElement = window.top.document.createElement('button'), 
	GCSwindowDownloadElement = window.top.document.createElement('button');

	GCSwindowElement.id = `window${windowCount}`;
	GCSwindowElement.className = 'window';
	GCSwindowElement.style.width = `${width}px`;
	GCSwindowElement.style.height = `${height}px`;
	GCSwindowElement.style.top = `${y}px`;
	GCSwindowElement.style.left = `${x}px;`;

	GCSwindowTitleElement.id = `window${windowCount}-title`;
	GCSwindowTitleElement.className = 'window-title';
	GCSwindowTitleElement.innerText = title;

	GCSwindowTitleElement.addEventListener('mousemove', (MouseEvent) => {
		if (mousedown) {
			GCSwindowElement.style.zIndex = 10;
			GCSwindowElement.style.top = `${MouseEvent.pageY - (GCSwindowTitleElement.clientHeight / 2)}px`;
			GCSwindowElement.style.left = `${MouseEvent.pageX - (GCSwindowTitleElement.clientWidth / 2)}px`;
		}
	});

	GCSwindowSourceElement.id = `window${windowCount}-source`;
	GCSwindowSourceElement.className = 'window-source';
	GCSwindowSourceElement.src = source;
	GCSwindowSourceElement.allow = 'allow-scripts allow-same-origin';

	GCSwindowCloseElement.className = 'window-button';
	GCSwindowCloseElement.innerText = 'X';

	GCSwindowCloseElement.addEventListener('click', () => {
		let input = prompt('Password:');

		if (input === localStorage.getItem('GCS-password')) {
			window.top.document.getElementById(GCSwindowElement.id).remove();
		}
	});

	GCSwindowMinimizeElement.className = 'window-button';
	GCSwindowMinimizeElement.innerText = '-';

	GCSwindowMinimizeElement.addEventListener('click', () => {
		if (GCSwindowElement.style.height !== 'auto') {
			GCSwindowMinimizeElement.innerText = '+';
			GCSwindowElement.style.height = 'auto';
			GCSwindowSourceElement.style.display = 'none';
			GCSwindowElement.style.resize = 'none';
			GCSwindowElement.style.zIndex = 0;
		} else {
			GCSwindowMinimizeElement.innerText = '-';
			GCSwindowElement.style.height = GCSwindowElement.style.width;
			GCSwindowSourceElement.style.display = 'block';
			GCSwindowElement.style.resize = 'both';
			GCSwindowElement.style.zIndex = 10;
		}
	});

	GCSwindowDownloadElement.className = 'window-button';
	GCSwindowDownloadElement.innerText = '#';

	GCSwindowDownloadElement.addEventListener('click', () => {
		open(`https://github.com/${source.replace('https://', '').replace('.github.io', '')}/${source.replace('https://', '')}/archive/refs/heads/master.zip`, '_blank');
	});

	window.top.document.body.appendChild(GCSwindowElement);
	window.top.document.getElementById(`window${windowCount}`).appendChild(GCSwindowTitleElement);
	window.top.document.getElementById(`window${windowCount}-title`).appendChild(GCSwindowCloseElement);
	window.top.document.getElementById(`window${windowCount}-title`).appendChild(GCSwindowMinimizeElement);

	if (source.includes('.github.io')) {
		window.top.document.getElementById(`window${windowCount}-title`).appendChild(GCSwindowDownloadElement);
	}

	window.top.document.getElementById(`window${windowCount}`).appendChild(GCSwindowSourceElement);

	console.log(`${GCSwindowElement.id} initiated.`);
}