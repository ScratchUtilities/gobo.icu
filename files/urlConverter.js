function shortenUrl(url) {
  var split = url.split("/");
  // do you know what dictionarries are for?
  var types = { users: "u", projects: "p", studios: "s", discuss: "d" };
  var id;
  if (types[split[3]] !== undefined) {
    if (split[3] == "discuss") {
      id = split[5];
    } else {
      id = split[4];
    }
    var type = types[split[3]]; //split[3][0]//["u", "p", "s", "d"][types.indexOf(split[3])];
    if (type != "u") {
      id = base64.encode(id);
    }
    if (type == "p" && split[5] == "editor") {
      return "https://gobo.cf#e" + id;
    } else {
      return "https://gobo.cf#" + type + id;
    }
  } else {
    return "Invalid URL"; //it's invalid, not unvalid.
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
