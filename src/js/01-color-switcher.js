const refs = {
  bodyStyle: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};
let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.buttonStart.addEventListener('click', () => {
  interval = setInterval(() => {
    const a = getRandomHexColor();
    console.log(a);
    refs.bodyStyle.style.backgroundColor = a;
  }, 1000);
  refs.buttonStart.setAttribute('disabled', 'disabled');
  refs.buttonStop.removeAttribute('disabled');
});

refs.buttonStop.addEventListener('click', () => {
  clearInterval(interval);
  refs.buttonStop.setAttribute('disabled', 'disabled');
  refs.buttonStart.removeAttribute('disabled');
});
