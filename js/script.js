const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

function updateDateTime() {

  let date = new Date();

  let years = date.getFullYear();
  let months = date.getMonth() + 1;
  let days = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  yearsElement.innerText = years;
  monthsElement.innerText = months;
  daysElement.innerText = days;
  hoursElement.innerText = hours;
  minutesElement.innerText = minutes;
  secondsElement.innerText = seconds;

  let yearsColour = getColour(years.toString().substring(2) / 100);
  let monthsColour = getColour(months / 12);
  let daysColour = getColour(days / 31);
  let hoursColour = getColour(hours / 24);
  let minutesColour = getColour(minutes / 60);
  let secondsColour = getColour(seconds / 60);

  yearsElement.style.backgroundImage = `linear-gradient(to bottom, ${yearsColour} , ${monthsColour})`;
  monthsElement.style.backgroundImage = `linear-gradient(to bottom, ${monthsColour} , ${daysColour})`;
  daysElement.style.backgroundImage = `linear-gradient(to bottom, ${daysColour} , ${hoursColour})`;
  hoursElement.style.backgroundImage = `linear-gradient(to bottom, ${hoursColour} , ${minutesColour})`;
  minutesElement.style.backgroundImage = `linear-gradient(to bottom, ${minutesColour} , ${secondsColour})`;
  secondsElement.style.backgroundImage = `linear-gradient(to bottom, ${secondsColour} , ${yearsColour})`;

}

function getColour(percentage) {
  let red = getRed(percentage);
  let green = getGreen(percentage);
  let blue = getBlue(percentage);

  return `rgb(${hex(red)}, ${hex(green)}, ${hex(blue)})`;

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

function hex(percentage) {
  return percentage * 255;
}

updateDateTime();

setInterval(() => {
  updateDateTime();
}, 1000);
