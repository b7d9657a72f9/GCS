// TS runtime

window.row = 1;

function AddFrame(Row, FrameId, Source) {
    let FrameParent = document.createElement('td'),
    Frame = document.createElement('iframe'),
    Bar = document.createElement('div'),
    CloseControl = document.createElement('button'),
    SetControl = document.createElement('button'),
    AddControl = document.createElement('button');

    Frame.id = `frame${FrameId}`;

    if (!Source.startsWith('https://') && !Source.startsWith('http://') && !Source.startsWith('app://')) {
        Frame.src = `https://${Source}`;
    } else if (Source.startsWith('app://')) {
        let RawUrl = Source;
        Frame.src = `../app/${RawUrl.replace('app://', '')}`;
    } else {
        Frame.src = Source;
    }

    Bar.className = 'bar';

    CloseControl.className = 'control close';
    CloseControl.setAttribute('data-frame', FrameId);
    CloseControl.innerText = 'X';

    CloseControl.addEventListener('click', () => {
        if (document.getElementsByTagName('td').length > 2) {
            FrameParent.remove();
        }
    });

    SetControl.className = 'control set';
    SetControl.setAttribute('data-frame', FrameId);
    SetControl.innerText = '#';

    SetControl.addEventListener('click', () => {
        let Url = prompt('Url:');

        if (Url.startsWith('app://')) {
            let AppName = Url.replace('app://', '');
            Url = `../app/${AppName}`;
        } else if (!Url.startsWith('https://') && !Url.startsWith('http://')) {
            Url = `https://${Url}`;
        }

        Frame.setAttribute("src", Url);
    });

    AddControl.className = 'control add';
    AddControl.setAttribute('data-frame', FrameId);
    AddControl.innerText = '+';

    AddControl.addEventListener('click', () => {
        if (document.getElementsByTagName('td').length <= 28) {
            AddFrame(window.row, document.getElementsByTagName('td').length, 'https://example.com');
        }

        if (window.row === 1) {
            window.row = 2;
        } else if (window.row === 2) {
            window.row = 1;
        }
    });

    Bar.appendChild(CloseControl);
    Bar.appendChild(SetControl);
    Bar.appendChild(AddControl);

    FrameParent.appendChild(Bar);
    FrameParent.appendChild(Frame);

    document.getElementById(`row${Row}`).appendChild(FrameParent);
}

AddFrame(1, 1, 'app://settings');

AddFrame(2, 2, 'app://links');