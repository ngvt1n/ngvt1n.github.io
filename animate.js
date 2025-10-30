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
                                                                       (\\) \`(\\)
`,
`
                                                                          __o
                                                                        _ \\<,_
                                                                       (|) \`(|)
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
  let model = text + '/'.repeat(80 - text.length) + text + '/'.repeat(80 - text.length);
  for(let f = 80; f > 0; f--) {
    let frame = model.slice(f, 80 + f);
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
