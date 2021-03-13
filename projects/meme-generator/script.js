const idContainerMeme = 'meme-image-container';
const idMemeImage = 'meme-image';
const idControlPanel = 'control-panel';

function addText() {
  const inputText = document.getElementById('text-input');
  inputText.addEventListener('keyup', (e) => {
    const memeText = document.getElementById('meme-text');
    memeText.innerText = e.target.value;
  });
}

function checkValueInput() {
  const inputText = document.getElementById('text-input');
  if (inputText.value === '') {
    const memeText = document.getElementById('meme-text');
    memeText.innerHTML = 'Gere aqui seu meme';
  }
}

function loadImage() {
  const inputImage = document.getElementById('meme-insert');
  inputImage.addEventListener('change', (e) => {
    checkValueInput();
    const text = document.getElementById('meme-text');
    text.innerText = '';
    const newImg = document.getElementById(idMemeImage);
    newImg.style.width = '100%';
    newImg.style.height = '100%';
    newImg.src = URL.createObjectURL(e.target.files[0]);
    newImg.onload = () => {
      URL.revokeObjectURL(newImg.src);
    };
  });
}

function checkValueImg() {
  if (!document.getElementById(idMemeImage)) {
    const containerImg = document.getElementById(idContainerMeme);
    containerImg.style.height = '500px';
  }
}

function setColor(e) {
  const cor = e.target.style.backgroundColor;
  const image = document.getElementById(idContainerMeme);
  if (cor === 'red') {
    image.style.border = `3px dashed ${cor}`;
  } if (cor === 'blue') {
    image.style.border = `5px double ${cor}`;
  } if (cor === 'green') {
    image.style.border = `6px groove ${cor}`;
  }
}

function createButtonFire() {
  const parent = document.getElementById(idControlPanel);
  const newButton = document.createElement('button');
  newButton.id = 'fire';
  newButton.innerText = 'Fire';
  newButton.style.backgroundColor = 'red';
  newButton.addEventListener('click', setColor);
  parent.appendChild(newButton);
}

function createButtonWater() {
  const parent = document.getElementById(idControlPanel);
  const newButton = document.createElement('button');
  newButton.id = 'water';
  newButton.innerText = 'water';
  newButton.style.backgroundColor = 'blue';
  newButton.addEventListener('click', setColor);
  parent.appendChild(newButton);
}

function createButtonEarth() {
  const parent = document.getElementById(idControlPanel);
  const newButton = document.createElement('button');
  newButton.id = 'earth';
  newButton.innerText = 'earth';
  newButton.style.backgroundColor = 'green';
  newButton.addEventListener('click', setColor);
  parent.appendChild(newButton);
}

function setMeme(e) {
  const meme = document.getElementById('meme-image');
  meme.setAttribute('src', e.target.src);
  const text = document.getElementById('meme-text');
  text.innerText = '';
}

function activeReadyMemes() {
  const parent = document.querySelector('#readyMemes').children;
  for (let index = 0; index < parent.length; index += 1) {
    parent[index].addEventListener('click', setMeme);
  }
}

window.onload = () => {
  addText();
  loadImage();
  checkValueImg();
  checkValueInput();
  createButtonFire();
  createButtonWater();
  createButtonEarth();
  activeReadyMemes();
};
