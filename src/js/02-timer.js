import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let dateChange = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    options.defaultDate.setTime(selectedDates[0]);
    dateChange = Date.parse(options.defaultDate);
    // console.log(dateChange);
    // console.log(selectedDates[0]);
    inform();
    buttonEn();
  },
};

// Доступ до елементів
const refs = {
  input: document.querySelector('input[type="text"]'),
  button: document.querySelector('button[data-start]'),
  daysSpan: document.querySelector('span[data-days]'),
  hoursSpan: document.querySelector('span[data-hours]'),
  minutesSpan: document.querySelector('span[data-minutes]'),
  secondsSpan: document.querySelector('span[data-seconds]'),
};
// Виклик функції flatpickr на input зі значенням options
flatpickr(refs.input, options);

// Функція перевірки вибраної дати
function inform() {
  if (dateChange < Date.now()) {
    alert('Please choose a date in the future');
  }
}
// Функція додавання атрибуту 'disabled' до кнопки Start
function buttonDis() {
  refs.button.setAttribute('disabled', 'disabled');
}
buttonDis();
// Функція видалення атрибуту 'disabled' з кнопки Start
function buttonEn() {
  if (dateChange > Date.now()) {
    console.log(options.defaultDate);
    refs.button.removeAttribute('disabled');
  }
}
// Додавання слухача події на кнопку Start з callback startTimer
refs.button.addEventListener('click', startTimer);

// Функція startTimer
function startTimer() {
  const timer = {
    start() {
      setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = dateChange - currentTime;
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

// Функція додавання нуля перед значенням до двохзначного
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція запису ms в значення дати,часу
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
