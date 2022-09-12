const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timer = null;

startButton.addEventListener('click', intervalColorSWitchStart);
stopButton.addEventListener('click', intervalColorSwitchStop);

function intervalColorSwitchStop() {
  clearInterval(timer);
  startButton.disabled = false;
  stopButton.disabled = true;
}

function intervalColorSWitchStart() {
  colorSwitch();
  timer = setInterval(() => {
    colorSwitch();
  }, 1000);

  startButton.disabled = true;
  stopButton.disabled = false;
}

function colorSwitch() {
  const color = getRandomHexColor();
  body.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
