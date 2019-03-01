function shortenUrl(url) {
  if (url.includes("scratch.mit.edu/")){
    var split = url.substr((url.indexOf("scratch.mit.edu/") + 16), url.length).split("/");
    var types = { users: "u", projects: "p", studios: "s", discuss: "d" };
    var id;
    if (split[0] == "discuss") {
      id = split[2];
    } else {
      id = split[1];
    }
    var type = types[split[0]];
    if (type != "u") {
      id = base64.encode(id);
    }
    if (type == "p" && split[2] == "editor") {
      return "http://gobo.cf#e" + id;
    } else {
      return "http://gobo.cf#" + type + id;
    }
  } else {
    return "Invalid URL";
  }
}

function longUrl(hash) {
  var urlStarts = {
    u: "https://scratch.mit.edu/users/",
    p: "https://scratch.mit.edu/projects/",
    e: "editor",
    s: "https://scratch.mit.edu/studios/",
    d: "https://scratch.mit.edu/discuss/topic/"
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
if (window.location.hash != "") {
  window.location.replace(longUrl(window.location.hash));
}
