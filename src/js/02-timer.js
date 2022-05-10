import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  datetimePickerEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
};

refs.startBtnEl.setAttribute('disabled', '');
refs.startBtnEl.addEventListener('click', onClickBtn);

const date = new Date();

let timerId;
let selectdDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  allowInput: true,
  onClose(selectedDates) {
    selectdDate = selectedDates[0].getTime();
    if (selectdDate <= date.getTime()) {
      refs.startBtnEl.setAttribute('disabled', '');
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    if (selectdDate > date.getTime()) {
      refs.startBtnEl.removeAttribute('disabled');
    }
  },
};

flatpickr(refs.datetimePickerEl, options);

function onClickBtn() {
  refs.startBtnEl.setAttribute('disabled', '');
  refs.datetimePickerEl.setAttribute('disabled', '');
  timerId = setInterval(startTheCounter, 1000);
}

function startTheCounter() {
  let nowDate = new Date().getTime();
  let restTime = selectdDate - nowDate;
  let dataDate = convertMs(restTime);
  if (restTime < 999) {
    clearInterval(timerId);
  }
  refs.daysEl.textContent = dataDate.days;
  refs.hoursEl.textContent = dataDate.hours;
  refs.minutesEl.textContent = dataDate.minutes;
  refs.secondsEl.textContent = dataDate.seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
