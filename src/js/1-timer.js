// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const timerDays = document.querySelector(`[data-days]`);
const timerHours = document.querySelector(`[data-hours]`);
const timerMinutes = document.querySelector(`[data-minutes]`);
const timerSeconds = document.querySelector(`[data-seconds]`);
const btn = document.querySelector(`[data-start]`);
const input = document.querySelector("#datetime-picker");

let intervalId;

btn.addEventListener('click', timerRunner);
function timerRunner(){
    updateRemainingTime();
    intervalId = setInterval(updateRemainingTime, 1000);
    btn.disabled = true;
    input.disabled = true;
};

function updateRemainingTime() {
    remainingTime = convertMs(userSelectedDate - new Date());
    const { days, hours, minutes, seconds } = remainingTime;
    if(days === 0 && hours === 0 && minutes === 0 && seconds === 0){
        clearInterval(intervalId);
        input.disabled = false;
    }
    timerDays.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);
};


let userSelectedDate;
let remainingTime;
const options = {
            enableTime: true,
            time_24hr: true,
            defaultDate: new Date(),
            minuteIncrement: 1,
            onClose(selectedDates) {
                userSelectedDate = selectedDates[0];
                console.log(userSelectedDate);
                selectedDate();
            }
        };


flatpickr("#datetime-picker", options);

function selectedDate (){
    if (userSelectedDate <= new Date()) {
        iziToast.error({
            message: 'Please choose a date in the future',
            position: `topRight`,
        });
        }
    else {
        btn.disabled = false;
    }
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
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

  function addLeadingZero(value) {
    return String(value).padStart(2, 0);
  };
  

  