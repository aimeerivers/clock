const yearsElement = document.getElementById('data-year');
const monthsElement = document.getElementById('data-month');
const daysElement = document.getElementById('data-day');
const hoursElement = document.getElementById('data-hour');
const minutesElement = document.getElementById('data-minute');
const secondsElement = document.getElementById('data-second');

function updateDateTime() {
  let date = new Date();
  let monthDays = daysInMonth(date);

  let seconds = date.getSeconds() + (date.getMilliseconds() / 1000);
  let minutes = date.getMinutes() + (seconds / 60);
  let hours = date.getHours() + (minutes / 60);
  let days = (date.getDate() - 1) + (hours / 24);
  let months = (date.getMonth() + 0)  + (days / monthDays);
  let years = date.getFullYear() + months / 12;

  let yearsColour = getColour(years.toString().substring(2) / 100);
  let monthsColour = getColour(months / 12);
  let daysColour = getColour(days / monthDays);
  let hoursColour = getColour(hours / 24);
  let minutesColour = getColour(minutes / 60);
  let secondsColour = getColour(seconds / 60);

  yearsElement.innerText = yearsColour;
  monthsElement.innerText = monthsColour;
  daysElement.innerText = daysColour;
  hoursElement.innerText = hoursColour;
  minutesElement.innerText = minutesColour;
  secondsElement.innerText = secondsColour;
}

updateDateTime();
