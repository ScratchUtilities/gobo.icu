function moveOut() {
  document.getElementById("landingPage").classList.add("move-out");
  document.getElementById("fillinPage").classList.add("move-in");
}

function updatePreview() {
  setCookie(
    "preview",
    document.getElementById("preview-checkbox").checked,
    3652.5
  );
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function setup() {
  document.getElementById("preview-checkbox").checked =
    getCookie("preview") == "true";
}
