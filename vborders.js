function drawVborders() {
    const body_height = document.getElementById("body").getBoundingClientRect().height;
  const character_height = document.getElementById("force-monospace-reference").getBoundingClientRect().height;

  const leftie = document.getElementById("left-border");
  const rightie = document.getElementById("right-border");

  for (let i = 0; i < body_height / character_height; i++) {
    leftie.innerHTML += "|\n";
    rightie.innerHTML += "|\n";
  }
}
document.addEventListener('parse-complete', drawVborders); 
window.addEventListener('resize', drawVborders);
