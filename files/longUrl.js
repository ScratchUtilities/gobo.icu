const base64 = {
  charset: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split(
    ""
  ),
  encode: integer => {
    if (integer === 0) {
      return "0";
    }
    let s = [];
    while (integer > 0) {
      s = [base64.charset[integer % 64], ...s];
      integer = Math.floor(integer / 64);
    }
    return s.join("");
  },
  decode: chars =>
    chars
      .split("")
      .reverse()
      .reduce(
        (prev, curr, i) => prev + base64.charset.indexOf(curr) * 64 ** i,
        0
      )
};

function longUrl(hash) {
  var urlStarts = {
    u: "https://scratch.mit.edu/users/",
    p: "https://scratch.mit.edu/projects/",
    e: "editor",
    s: "https://scratch.mit.edu/studios/",
    d: "https://scratch.mit.edu/discuss/topic/",
    o: "https://scratch.mit.edu/discuss/post/"
  };
  var type = urlStarts[hash[1]];
  if (type == "https://scratch.mit.edu/users/") {
    return type + hash.substring(2);
  } else {
    if (type == "editor") {
      return (
        "https://scratch.mit.edu/projects/" +
        base64.decode(hash.substring(2)) +
        "/editor"
      );
    } else {
      return type + base64.decode(hash.substring(2));
    }
  }
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
  return "false";
}

if (window.location.hash === "") {
  window.location.replace("./home/");
} else {
  var output = longUrl(window.location.hash);
  if (getCookie("preview") === "true") {
    window.location.replace("/preview#" + window.location.hash[1] + output);
  } else {
    window.location.replace(output);
  }
}
