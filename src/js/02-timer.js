import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const TIMER_INTERVAL = 1000;
const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const failMessage = 'Please choose a date in the future';

let selectedDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) < Date.now()) {
      showNotify(failMessage);
      startButton.disabled = true;
    } else {
      selectedDate = selectedDates[0];
      startButton.disabled = false;
    }
  },
};

startButton.addEventListener('click', startTimer);

(function onLoad() {
  flatpickr(input, options);
})();

function startTimer() {
  if (selectedDate < Date.now()) {
    showNotify(failMessage);
    return;
  }
  renderTimerWithInterval(TIMER_INTERVAL);
  startButton.disabled = true;
  input.disabled = true;
}

function renderTimerWithInterval(interval) {
  const timer = setInterval(() => {
    const timeStamp = selectedDate - Date.now();
    const convertedDate = convertMs(timeStamp);
    if (timeStamp === 0) {
      clearInterval(timer);
      return;
    }
    renderTimer(convertedDate);
  }, interval);
}

function renderTimer(date) {
  Object.entries(date).forEach(([key, value]) => {
    const formattedTime = addLeadingZero(value);
    const span = document.querySelector(`span[data-${key}]`);
    span.innerHTML = formattedTime;
  });
}

function showNotify(message, timeout = 2000) {
  Notify.failure(message, { timeout });
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
