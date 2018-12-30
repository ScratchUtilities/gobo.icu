

function moveOut() {
  var elem = document.getElementById("landingPage");
  var pos = 50;
  var id = setInterval(frame, 2);
  function frame() {
    if (pos > window.innerHeight) {
      moveIn(pos);
      elem.style.display = "none";
      clearInterval(id);
    } else {
      pos = pos*1.02;
      elem.style.top = pos + 'px';
    }
  }
}

function moveIn(moveStart) {
  var elem = document.getElementById("fillinPage");
  var pos = moveStart;
  elem.style.top = pos + 'px';
  elem.style.display = "initial";
  var id = setInterval(frame, 2);
  function frame() {
    if (pos < 50) {
      clearInterval(id);
    } else {
      pos = pos/1.02;
      elem.style.top = pos + 'px';
    }
  }
}
