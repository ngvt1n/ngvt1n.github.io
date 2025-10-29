const animateds = [
  prepare_animated_elts(document.getElementById('intro-banner'), banner_generator), 
  prepare_animated_elts(plot, plotframes_generator),
  prepare_animated_elts(document.getElementById('eye'), ()=> ['⊙', '◡']), 
  prepare_animated_elts(document.getElementById('toggle-spinner'), ()=> ['/', '-', '\\', '|']), 
  prepare_animated_elts(document.getElementById('bike'), ()=> [
`
                                                                          __o
                                                                        _ \\<,_
                                                                       (/)/ (/)
`,
`
                                                                          __o
                                                                        _ \\<,_
                                                                       (-)/ (-)
`,
`
                                                                          __o
                                                                        _ \\<,_
                                                                       (\\)/ (\\)
`,
`
                                                                          __o
                                                                        _ \\<,_
                                                                       (|)/ (|)
`,
]), 
]

function prepare_animated_elts(elt, frames_generator) {
  return {
    elt: elt, 
    count: 0, 
    frames: frames_generator(elt)
  }
}

function banner_generator(elt) {
  let output = []
  let text = elt.textContent
  for(let f = 0; f < 80; f++) {
    let tail = 80 - f - text.length;
    tail = tail > 0 ? tail : 0;
    let frame = ('/'.repeat(f) + text + '/'.repeat(tail)).slice(0, 79);
    output.push(frame);
  }
  return output;
}

function animate(elt) {
  elt.count = (elt.count + 1) % (elt.frames.length);
  elt.elt.textContent = elt.frames[elt.count];
}

function animateAll() {
  for(elt of animateds) {
    animate(elt);
  }
}

(function() {
  animateAll();
  setTimeout(arguments.callee, 50);
})();
