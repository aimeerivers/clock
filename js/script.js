const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');

function updateDateTime() {

  let date = new Date();

  dateElement.innerText = date.toLocaleDateString();
  timeElement.innerText = date.toLocaleTimeString();

  let years = date.getFullYear();
  let months = date.getMonth() + 1;
  let days = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let yearsColour = getColour(years.toString().substring(2) / 100);
  let monthsColour = getColour(months / 12);
  let daysColour = getColour(days / daysInMonth(date));
  let hoursColour = getColour(hours / 24);
  let minutesColour = getColour(minutes / 60);
  let secondsColour = getColour(seconds / 60);

  yearsElement.style.backgroundImage = `linear-gradient(170deg, ${yearsColour} , ${monthsColour})`;
  monthsElement.style.backgroundImage = `linear-gradient(170deg, ${monthsColour} , ${daysColour})`;
  daysElement.style.backgroundImage = `linear-gradient(170deg, ${daysColour} , ${hoursColour})`;
  hoursElement.style.backgroundImage = `linear-gradient(170deg, ${hoursColour} , ${minutesColour})`;
  minutesElement.style.backgroundImage = `linear-gradient(170deg, ${minutesColour} , ${secondsColour})`;
  secondsElement.style.backgroundImage = `linear-gradient(170deg, ${secondsColour} , ${yearsColour})`;

}

function getColour(percentage) {
  let red = getRed(percentage);
  let green = getGreen(percentage);
  let blue = getBlue(percentage);

  return `rgb(${colour255(red)}, ${colour255(green)}, ${colour255(blue)})`;

}

function getRed(percentage) {
  if(percentage >= (1/3) && percentage <= (2/3)) { return 0; }
  if(percentage >= (1/6) && percentage <= (1/3)) { return 1 - ((percentage - (1/6)) * 6); }
  if(percentage >= (2/3) && percentage <= (5/6)) { return ((percentage - (2/3)) * 6); }
  return 1;
}

function getGreen(percentage) {
  if(percentage >= (2/3)) { return 0; }
  if(percentage >= 0 && percentage <= (1/6)) { return percentage * 6; }
  if(percentage >= (1/2) && percentage <= (2/3)) { return 1 - ((percentage - (1/2)) * 6); }
  return 1;
}

function getBlue(percentage) {
  if(percentage <= (1/3)) { return 0; }
  if(percentage >= (1/3) && percentage <= (1/2)) { return (percentage - (1/3)) * 6; }
  if(percentage >= (5/6) && percentage <= 1) { return 1 - ((percentage - (5/6)) * 6); }
  return 1;
}

function colour255(percentage) {
  return percentage * 255;
}

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

updateDateTime();

setInterval(() => {
  updateDateTime();
}, 1000);
