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
