const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');
const favicon = document.getElementById('favicon');

// Override date/time
const params = new URLSearchParams(window.location.search);
const dateOverride = params.get("d");
const timeOverride = params.get("t");
const calloutUrl = params.get("callout");

// don't update favicon on every tick, because it sometimes flashes when it's changed
// every 50 ticks = every 5 seconds
const faviconTicks = 50;
const calloutTicks = 20;

// start counting from 2 away, because Firefox won't update the icon from the
// one that loads with the page on the very first tick
var i = faviconTicks - 2;

function updateDateTime() {
  let date;
  if(dateOverride && timeOverride) { date = new Date(dateOverride + ' ' + timeOverride); }
  else if(dateOverride) { date = new Date(dateOverride); }
  else { date = new Date(); }
  let monthDays = daysInMonth(date);

  dateElement.innerText = date.toLocaleDateString();
  timeElement.innerText = date.toLocaleTimeString();

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

  yearsElement.style.backgroundImage = `linear-gradient(170deg, ${yearsColour} , ${monthsColour})`;
  monthsElement.style.backgroundImage = `linear-gradient(170deg, ${monthsColour} , ${daysColour})`;
  daysElement.style.backgroundImage = `linear-gradient(170deg, ${daysColour} , ${hoursColour})`;
  hoursElement.style.backgroundImage = `linear-gradient(170deg, ${hoursColour} , ${minutesColour})`;
  minutesElement.style.backgroundImage = `linear-gradient(170deg, ${minutesColour} , ${secondsColour})`;
  secondsElement.style.backgroundImage = `linear-gradient(170deg, ${secondsColour} , ${yearsColour})`;

  i++;
  if((i % faviconTicks) == 0) { updateFavicon(yearsColour, monthsColour, daysColour, hoursColour, minutesColour, secondsColour); }
  if(calloutUrl && (i % calloutTicks) == 0) { callout(yearsColour, monthsColour, daysColour, hoursColour, minutesColour, secondsColour); }
}

function callout(yearsColour, monthsColour, daysColour, hoursColour, minutesColour, secondsColour) {
  var calloutRequest = new XMLHttpRequest();
  calloutRequest.open("PUT", calloutUrl, true);
  calloutRequest.setRequestHeader("Content-Type", "application/json");
  calloutRequest.send(JSON.stringify({
    "years": yearsColour,
    "months": monthsColour,
    "days": daysColour,
    "hours": hoursColour,
    "minutes": minutesColour,
    "seconds": secondsColour
  }));
}

function updateFavicon(yearsColour, monthsColour, daysColour, hoursColour, minutesColour, secondsColour) {
  let canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  
  let ctx = canvas.getContext('2d');
  
  let yearsGrd = ctx.createLinearGradient(0, 0, 0, 32);
  yearsGrd.addColorStop(0, yearsColour);
  yearsGrd.addColorStop(1, monthsColour);
  ctx.fillStyle = yearsGrd;
  ctx.fillRect(0, 0, 5, 32);
  
  let monthsGrd = ctx.createLinearGradient(0, 0, 0, 32);
  monthsGrd.addColorStop(0, monthsColour);
  monthsGrd.addColorStop(1, daysColour);
  ctx.fillStyle = monthsGrd;
  ctx.fillRect(5, 0, 5, 32);
  
  let daysGrd = ctx.createLinearGradient(0, 0, 0, 32);
  daysGrd.addColorStop(0, daysColour);
  daysGrd.addColorStop(1, hoursColour);
  ctx.fillStyle = daysGrd;
  ctx.fillRect(10, 0, 6, 32);
  
  let hoursGrd = ctx.createLinearGradient(0, 0, 0, 32);
  hoursGrd.addColorStop(0, hoursColour);
  hoursGrd.addColorStop(1, minutesColour);
  ctx.fillStyle = hoursGrd;
  ctx.fillRect(16, 0, 6, 32);
  
  let minutesGrd = ctx.createLinearGradient(0, 0, 0, 32);
  minutesGrd.addColorStop(0, minutesColour);
  minutesGrd.addColorStop(1, secondsColour);
  ctx.fillStyle = minutesGrd;
  ctx.fillRect(22, 0, 5, 32);
  
  let secondsGrd = ctx.createLinearGradient(0, 0, 0, 32);
  secondsGrd.addColorStop(0, secondsColour);
  secondsGrd.addColorStop(1, yearsColour);
  ctx.fillStyle = secondsGrd;
  ctx.fillRect(27, 0, 5, 32);
  
  favicon.href = canvas.toDataURL('image/png');
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
  return Math.round(percentage * 255);
}

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

updateDateTime();
if(!dateOverride) { setInterval(updateDateTime, 100); }
