const clock = document.getElementById('clock');

(function() {
  clock.innerHTML = new Date().toLocaleTimeString();
  setTimeout(arguments.callee, 1000);
})();

const moon = document.getElementById('moon-graph')
const moon_phase = document.getElementById('moon-phase')

const line = [
  " __     ",
  "/..\\....",
  "    \\__/",
];

(function() {
  const date = new Date();
  const phase = (function(year, month, day) { //phase
    var c = e = jd = b = 0;
    if (month < 3) {
      year--;
      month += 12;
    }
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; // jd is total days elapsed
    jd /= 29.5305882; // divide by the moon cycle
    b = parseInt(jd); // int(jd) -> b, take integer part of jd
    jd -= b; // subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); // scale fraction from 0-8 and round
    if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0 
    return b
  })(date.getFullYear(), date.getMonth() + 1, date.getDate());

  let output = [" ", " ", " "];
  let phases = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous", "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
  h = [1, 0, 0, 1, 2, 2, 2, 2]
  for (let i = phase; i < phase + 32; i++) {
    output[0] += line[0][i % 8];
    output[1] += line[1][i % 8];
    output[2] += line[2][i % 8];
  }
  for (let i = 0; i < 3; i++) {
    if (i != h[phase]) output[i] += ' ';
    else output[i] += '*';
  }

  moon.innerHTML = output.join("\n");
  moon_phase.innerHTML = phases[phase];

  setTimeout(arguments.callee, 43200000);
})();
