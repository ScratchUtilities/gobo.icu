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
if (window.location.hash === "") {
  window.location.replace("/home/");
} else {
  window.location.replace(longUrl(window.location.hash));
}
