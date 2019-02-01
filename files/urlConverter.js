function shortenUrl(url) {
  var split = url.split("/");
  var types = ["users", "projects", "studios", "discuss"];
  if (types.indexOf(split[3]) >= 0) {
    if (split[3] == "discuss") {
      var id = split[5];
    } else {
      var id = split[4];
    }
    var type = ["u", "p", "s", "d"][types.indexOf(split[3])];
    if (type != "u") {
      id = base62.encode(id);
    }
    if (type == "p" && split[5] == "editor") {
      return "https://gobo.cf/e#" + id;
    } else {
      return "https://gobo.cf/" + type + "#" + id;
    }
  } else {
    return "Unvalid URL";
  }
}

function longUrl(url) {
  var urlStarts = [
    "https://scratch.mit.edu/users/",
    "https://scratch.mit.edu/projects/",
    "editor",
    "https://scratch.mit.edu/studios/",
    "https://scratch.mit.edu/discuss/topic/"
  ];
  var data = url.split("/");
  var type = urlStarts[["u", "p", "e", "s", "d"].indexOf(data[3])];
  if (type == "https://scratch.mit.edu/users/") {
    return type + data[4].replace("#", "");
  } else {
    if (type == "editor") {
      return (
        "https://scratch.mit.edu/projects/" +
        base62.decode(data[4].replace("#", "")) +
        "/editor"
      );
    } else {
      return type + base62.decode(data[4].replace("#", ""));
    }
  }
}

const base62 = {
  charset: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split(
    ""
  ),
  encode: integer => {
    if (integer === 0) {
      return "0";
    }
    let s = [];
    while (integer > 0) {
      s = [base62.charset[integer % 62], ...s];
      integer = Math.floor(integer / 62);
    }
    return s.join("");
  },
  decode: chars =>
    chars
      .split("")
      .reverse()
      .reduce(
        (prev, curr, i) => prev + base62.charset.indexOf(curr) * 62 ** i,
        0
      )
};
