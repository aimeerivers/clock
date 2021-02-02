const yearsElement = document.getElementById('years');
const monthsElement = document.getElementById('months');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const dateElement = document.getElementById('date');
const timeElement = document.getElementById('time');
const favicon = document.getElementById('favicon');

var dialLines = document.getElementsByClassName('diallines');
var clockEl = document.getElementById('analogue');

const params = new URLSearchParams(window.location.search);

// Clock style
const clockStyle = params.get("style");
if(clockStyle == "analogue") {
  document.getElementById('analogue').style.display = 'block';
} else {
  document.getElementById('digital').style.display = 'block';
}


// Override date/time
const dateOverride = params.get("d");
const timeOverride = params.get("t");

// Callout URL
const calloutUrl = params.get("callout");

// don't update favicon on every tick, because it sometimes flashes when it's changed
// every 50 ticks = every 5 seconds
const faviconTicks = 50;
const calloutTicks = 20;

let ticker = 0;

function updateDateTime() {
  let date;
  if(dateOverride && timeOverride) { date = new Date(dateOverride + ' ' + timeOverride); }
  else if(dateOverride) { date = new Date(dateOverride); }
  else { date = new Date(); }
  let monthDays = daysInMonth(date);

  let seconds = date.getSeconds() + (date.getMilliseconds() / 1000);
  let minutes = date.getMinutes() + (seconds / 60);
  let hours = date.getHours() + (minutes / 60);
  let days = (date.getDate() - 1) + (hours / 24);
  let months = (date.getMonth() + 0)  + (days / monthDays);
  let years = date.getFullYear() + months / 12;

  let times = [years, months, days, hours, minutes, seconds];
  let percentages = [
    years.toString().substring(2) / 100,
    months / 12,
    days / monthDays,
    (hours > 12 ? ((hours - 12) / 12) : (hours / 12)),
    minutes / 60,
    seconds / 60
  ];
  let colours = [
    getColour(percentages[0]),
    getColour(percentages[1]),
    getColour(percentages[2]),
    getColour(percentages[3]),
    getColour(percentages[4]),
    getColour(percentages[5]),
  ];

  yearsElement.style.backgroundImage = `linear-gradient(170deg, ${colours[0]} , ${colours[1]})`;
  monthsElement.style.backgroundImage = `linear-gradient(170deg, ${colours[1]} , ${colours[2]})`;
  daysElement.style.backgroundImage = `linear-gradient(170deg, ${colours[2]} , ${colours[3]})`;
  hoursElement.style.backgroundImage = `linear-gradient(170deg, ${colours[3]} , ${colours[4]})`;
  minutesElement.style.backgroundImage = `linear-gradient(170deg, ${colours[4]} , ${colours[5]})`;
  secondsElement.style.backgroundImage = `linear-gradient(170deg, ${colours[5]} , ${colours[0]})`;

  if(clockStyle == "analogue") {
    updateAnalogueClock(date, colours);
  } else {
    updateDigitalClock(date);
  }

  if((ticker % faviconTicks) == 0) updateFavicon(colours);
  if(calloutUrl && (ticker % calloutTicks) == 0) callout(times, percentages, colours);
  ticker++;
  if(ticker == faviconTicks * calloutTicks) ticker = 0;
}

function callout(times, percentages, colours) {
  var calloutRequest = new XMLHttpRequest();
  calloutRequest.open("PUT", calloutUrl, true);
  calloutRequest.setRequestHeader("Content-Type", "application/json");
  calloutRequest.send(JSON.stringify({
    "years": {value: times[0], percentage: percentages[0], rgb: colours[0]},
    "months": {value: times[1], percentage: percentages[1], rgb: colours[1]},
    "days": {value: times[2], percentage: percentages[2], rgb: colours[2]},
    "hours": {value: times[3], percentage: percentages[3], rgb: colours[3]},
    "minutes": {value: times[4], percentage: percentages[4], rgb: colours[4]},
    "seconds": {value: times[5], percentage: percentages[5], rgb: colours[5]},
  }));
}

function updateFavicon(colours) {
  let canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  
  let ctx = canvas.getContext('2d');
  
  let yearsGrd = ctx.createLinearGradient(0, 0, 0, 32);
  yearsGrd.addColorStop(0, colours[0]);
  yearsGrd.addColorStop(1, colours[1]);
  ctx.fillStyle = yearsGrd;
  ctx.fillRect(0, 0, 5, 32);
  
  let monthsGrd = ctx.createLinearGradient(0, 0, 0, 32);
  monthsGrd.addColorStop(0, colours[1]);
  monthsGrd.addColorStop(1, colours[2]);
  ctx.fillStyle = monthsGrd;
  ctx.fillRect(5, 0, 5, 32);
  
  let daysGrd = ctx.createLinearGradient(0, 0, 0, 32);
  daysGrd.addColorStop(0, colours[2]);
  daysGrd.addColorStop(1, colours[3]);
  ctx.fillStyle = daysGrd;
  ctx.fillRect(10, 0, 6, 32);
  
  let hoursGrd = ctx.createLinearGradient(0, 0, 0, 32);
  hoursGrd.addColorStop(0, colours[3]);
  hoursGrd.addColorStop(1, colours[4]);
  ctx.fillStyle = hoursGrd;
  ctx.fillRect(16, 0, 6, 32);
  
  let minutesGrd = ctx.createLinearGradient(0, 0, 0, 32);
  minutesGrd.addColorStop(0, colours[4]);
  minutesGrd.addColorStop(1, colours[5]);
  ctx.fillStyle = minutesGrd;
  ctx.fillRect(22, 0, 5, 32);
  
  let secondsGrd = ctx.createLinearGradient(0, 0, 0, 32);
  secondsGrd.addColorStop(0, colours[5]);
  secondsGrd.addColorStop(1, colours[0]);
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

function updateDigitalClock(date) {
  dateElement.innerText = date.toLocaleDateString();
  timeElement.innerText = date.toLocaleTimeString();
}

for (var i = 1; i < 60; i++) {
  clockEl.innerHTML += "<div class='diallines'></div>";
  dialLines[i].style.transform = "rotate(" + 6 * i + "deg)";
  dialLines[i].style.backgroundColor = getColour(i / 60);
}

function updateAnalogueClock(d, colours) {
  var weekday = new Array(7),
    months = new Array(12),
    h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds(),
    date = d.getDate(),
    month = d.getMonth(),
    year = d.getFullYear(),
          
    hDeg = h * 30 + m * (360/720),
    mDeg = m * 6 + s * (360/3600),
    sDeg = s * 6,
    
    hEl = document.querySelector('.hour-hand'),
    mEl = document.querySelector('.minute-hand'),
    sEl = document.querySelector('.second-hand'),
    infoDateEl = document.querySelector('#info-date'),
    infoMonthEl = document.querySelector('#info-month'),
    infoYearEl = document.querySelector('#info-year'),
    dayEl = document.querySelector('.day');

  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  months[0] = "Jan";
  months[1] = "Feb";
  months[2] = "Mar";
  months[3] = "Apr";
  months[4] = "May";
  months[5] = "Jun";
  months[6] = "Jul";
  months[7] = "Aug";
  months[8] = "Sep";
  months[9] = "Oct";
  months[10] = "Nov";
  months[11] = "Dec";

  var day = weekday[d.getDay()];
  var monthname = months[month];
  
  if(month < 9) {
    month = "0" + month;
  }
  
  hEl.style.transform = "rotate("+hDeg+"deg)";
  mEl.style.transform = "rotate("+mDeg+"deg)";
  sEl.style.transform = "rotate("+sDeg+"deg)";
  infoDateEl.innerText = date;
  infoDateEl.style.color = colours[2];
  infoMonthEl.innerText = monthname;
  infoMonthEl.style.color = colours[1];
  infoYearEl.innerText = year;
  infoYearEl.style.color = colours[0];
  dayEl.innerHTML = day;

  hEl.style.backgroundColor = colours[3];
  mEl.style.backgroundColor = colours[4];
  sEl.style.backgroundColor = colours[5];
}

updateDateTime();
if(!dateOverride) { setInterval(updateDateTime, 100); }
