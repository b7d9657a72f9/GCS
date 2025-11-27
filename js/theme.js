if (localStorage.getItem('bg-color') === null &&
localStorage.getItem('main-color') === null &&
localStorage.getItem('secondary-color') === null &&
localStorage.getItem('hover-color') === null) {
    localStorage.setItem('fade-color', '#ff000066');
    localStorage.setItem('bg-color', '#852b2bff');
    localStorage.setItem('main-color', '#ff0000ff');
    localStorage.setItem('secondary-color', '#ff3333ff');
    localStorage.setItem('hover-color', '#cc0303ff');
    localStorage.setItem('text-color', '#fff');
}

let setTheme = document.createElement('style');
setTheme.innerHTML = `:root {
  --fade-color: ${localStorage.getItem('fade-color')};
  --bg-color: ${localStorage.getItem('bg-color')};
  --main-color: ${localStorage.getItem('main-color')};
  --secondary-color: ${localStorage.getItem('secondary-color')};
  --hover-color: ${localStorage.getItem('hover-color')};
  --text-color: ${localStorage.getItem('text-color')};
}`;
document.head.appendChild(setTheme);