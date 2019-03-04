function shortenUrl(url) {
  if (url.includes("scratch.mit.edu/")) {
    var split = url
      .substr(url.indexOf("scratch.mit.edu/") + 16, url.length)
      .split("/");
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
