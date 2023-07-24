import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', onStartBtnClick);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future!');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

const fp = flatpickr(dateTimePicker, options);

function onStartBtnClick() {
  const selectDate = fp.parseDate(dateTimePicker.value);

  const counterIntervalId = setInterval(() => {
    startBtn.disabled = true;
    dateTimePicker.disabled = true;
    const timeCounter = convertMs(selectDate - Date.now());
    daysValue.textContent = addLeadingZero(timeCounter.days);
    hoursValue.textContent = addLeadingZero(timeCounter.hours);
    minutesValue.textContent = addLeadingZero(timeCounter.minutes);
    secondsValue.textContent = addLeadingZero(timeCounter.seconds);

    if (
      timeCounter.days === 0 &&
      timeCounter.hours === 0 &&
      timeCounter.minutes === 0 &&
      timeCounter.seconds === 0
    ) {
      clearInterval(counterIntervalId);
      Notiflix.Notify.success('Time is over!');
      dateTimePicker.disabled = false;
    }
  }, 1000);
}
