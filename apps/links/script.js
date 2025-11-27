function loadLinks() {
    document.getElementById('links').innerHTML = '';
    document.getElementById('blocks').innerHTML = '';

    if (localStorage.getItem('links') == null || localStorage.getItem('links') == '') {
        document.getElementById('links').innerHTML = 'No links saved.';
    } else {
        let links = localStorage.getItem('links').split(',');

        for (let a = 0; a < links.length; a++) {
            let linkElement = document.createElement('a'),
                removeLinkElement = document.createElement('button'),
                spacerElement = document.createElement('hr'),
                blockCheckerElement = document.createElement('object');

            linkElement.id = links[a].replace('https://', '');
            linkElement.innerText = links[a].replace('https://', '');

            linkElement.addEventListener('click', () => {
                window.top.createGCSWindow(links[a], linkElement.id, 500, 500, 50, 50);
            });

            removeLinkElement.addEventListener('click', () => {
                removeLink(links[a].replace('https://', ''), links[a]);
            });

            removeLinkElement.id = `${links[a].replace('https://', '')}-remove`;
            removeLinkElement.innerText = '-';

            document.getElementById('links').appendChild(spacerElement);
            document.getElementById('links').appendChild(linkElement);
            document.getElementById('links').appendChild(removeLinkElement);

            blockCheckerElement.addEventListener('error', () => {
                document.getElementById(links[a].replace('https://', '')).removeAttribute('href');
                document.getElementById(links[a].replace('https://', '')).innerHTML = `${links[a].replace('https://', '')} ! This site is blocked !`;
                document.getElementById(links[a].replace('https://', '')).style.color = 'red';
            });

            blockCheckerElement.data = links[a];

            document.getElementById('blocks').appendChild(blockCheckerElement);
        }
    }
}

loadLinks();

setInterval(loadLinks, 8000);

document.getElementById('save').addEventListener('click', () => {
    let link = document.getElementById('link').value;

    if (!link.startsWith('http://') && !link.startsWith('https://')) {
        link = `https://${link}`;
    }

    if (localStorage.getItem('links') == null || localStorage.getItem('links') == '') {
        localStorage.setItem('links', link);
    } else {
        localStorage.setItem('links', `${localStorage.getItem('links')},${link}`);
    }

    loadLinks();
});

function removeLink(id, url) {
    document.getElementById(id).remove();
    document.getElementById(`${id}-remove`).remove();

    let links = localStorage.getItem('links').split(',');
    for (let b = 0; b < links.length; b++) {
        if (links[b] == url) {
            links.splice(b, 1);
            localStorage.setItem('links', links.join(','));
        }
    }

    loadLinks();
}