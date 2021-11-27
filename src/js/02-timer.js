import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const refs = {
  input: document.querySelector('input[type="text"]'),
  button: document.querySelector('button[data-start]'),
  daysSpan: document.querySelector('span[data-days]'),
  hoursSpan: document.querySelector('span[data-hours]'),
  minutesSpan: document.querySelector('span[data-minutes]'),
  secondsSpan: document.querySelector('span[data-seconds]'),
};
flatpickr(refs.input, options);

function buttonDis() {
  refs.button.setAttribute('disabled', 'disabled');
}
buttonDis();
function buttonEn() {
  if (options.onClose) {
    // console.log(options.onClose(selectedDates));
    refs.button.removeAttribute('disabled');
  }
}
buttonEn();

// console.log(options.defaultDate);
refs.button.addEventListener('click', startTimer);
function startTimer() {
  const timer = {
    start() {
      const startTime = 1638500000000;
      setInterval(() => {
        const currentTime = Date.now();
        // console.log(currentTime);
        const deltaTime = startTime - currentTime;
        if (startTime < currentTime) {
          alert('Please choose a date in the future');
        }
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        refs.daysSpan.textContent = days;
        refs.hoursSpan.textContent = hours;
        refs.minutesSpan.textContent = minutes;
        refs.secondsSpan.textContent = seconds;
        console.log(`${days}::${hours}::${minutes}::${seconds}`);
      }, 1000);
    },
  };
  timer.start();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
