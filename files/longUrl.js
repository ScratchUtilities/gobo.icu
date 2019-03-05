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

if (window.location.hash === "") {
  window.location.replace("/home/");
} else {
  window.location.replace(longUrl(window.location.hash));
}
