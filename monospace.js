emulateMonospace();

function emulateMonospace() {
  let reference = document.getElementById("force-monospace-reference").getBoundingClientRect();
  const rwidth = reference.width;

  let newStyle = document.createElement("style");
  document.head.appendChild(newStyle);
  newStyle.sheet.insertRule(`.force-monospace { width: ${rwidth}px; display: inline-block;  }`, 0);

  let monoWraps = document.querySelectorAll(".to-monospace");
  monoWraps.forEach(function(monoWrap, _) {
    let text = monoWrap.textContent;
    let letters = Array.from(text); // Can't use split("") for Unicode characters

    monoWrap.innerHTML = "";

    letters.forEach(function(letter) {
      if (isNotASCII((letter))) {
        let span = document.createElement("span");
        span.classList.add("force-monospace");
        span.textContent = letter;
        monoWrap.innerHTML += span.outerHTML;
      }
      else {
        monoWrap.innerHTML += letter;
      }
    });

  });
}

function isNotASCII(char) {
  const charCode = char.charCodeAt(0);
  return charCode > 127;
}
